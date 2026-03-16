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
