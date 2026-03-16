-- Users (auto-managed by Supabase Auth, but extend it)
-- auth.users table is provided by Supabase

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('text', 'image', 'link')) NOT NULL,
  post_text TEXT,
  post_image_link TEXT,
  post_link TEXT,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unified normalised vote table for both posts and comments
CREATE TABLE public.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  value SMALLINT NOT NULL CHECK (value IN (-1, 1)),
  UNIQUE (user_id, post_id),    -- one vote per user per post
  UNIQUE (user_id, comment_id), -- one vote per user per comment
  CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  ) -- must be a post vote OR comment vote, not both
);

-- Computed score views (avoid counting in JS)
CREATE VIEW public.post_scores AS
  SELECT post_id, COALESCE(SUM(value), 0) AS score
  FROM public.votes
  WHERE post_id IS NOT NULL
  GROUP BY post_id;

CREATE VIEW public.comment_scores AS
  SELECT comment_id, COALESCE(SUM(value), 0) AS score
  FROM public.votes
  WHERE comment_id IS NOT NULL
  GROUP BY comment_id;

CREATE view post_comment_counts AS
  SELECT post_id, COALESCE(count(c.id), 0) as comment_count
  FROM posts p
  LEFT JOIN comments c on c.post_id = p.id
  GROUP BY post_id;

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, users can only insert/update their own
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: anyone can read, authenticated users can insert, owners can update/delete
CREATE POLICY "posts_select" ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_insert" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_delete" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- Comments: anyone can read, authenticated users can insert, owners can delete
CREATE POLICY "comments_select" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_delete" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Votes: anyone can read, authenticated users can manage their own votes
CREATE POLICY "votes_select" ON public.votes FOR SELECT USING (true);
CREATE POLICY "votes_insert" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "votes_update" ON public.votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "votes_delete" ON public.votes FOR DELETE USING (auth.uid() = user_id);

-- RPC: cast a post vote (upsert or remove) and return new score
CREATE OR REPLACE FUNCTION cast_post_vote(p_user_id UUID, p_post_id UUID, p_value SMALLINT DEFAULT NULL)
RETURNS INTEGER AS $$
BEGIN
  IF p_value IS NULL THEN
    DELETE FROM public.votes WHERE user_id = p_user_id AND post_id = p_post_id;
  ELSE
    INSERT INTO public.votes (user_id, post_id, value)
    VALUES (p_user_id, p_post_id, p_value)
    ON CONFLICT (user_id, post_id) DO UPDATE SET value = EXCLUDED.value;
  END IF;

  RETURN (SELECT COALESCE(SUM(value), 0) FROM public.votes WHERE post_id = p_post_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: cast a comment vote (upsert or remove) and return new score
CREATE OR REPLACE FUNCTION cast_comment_vote(p_user_id UUID, p_comment_id UUID, p_value SMALLINT DEFAULT NULL)
RETURNS INTEGER AS $$
BEGIN
  IF p_value IS NULL THEN
    DELETE FROM public.votes WHERE user_id = p_user_id AND comment_id = p_comment_id;
  ELSE
    INSERT INTO public.votes (user_id, comment_id, value)
    VALUES (p_user_id, p_comment_id, p_value)
    ON CONFLICT (user_id, comment_id) DO UPDATE SET value = EXCLUDED.value;
  END IF;

  RETURN (SELECT COALESCE(SUM(value), 0) FROM public.votes WHERE comment_id = p_comment_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
