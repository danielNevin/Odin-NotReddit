import { supabase } from "../lib/supabaseClient";

// Fetch all posts with score and comment count, newest first
export async function getAllPosts() {
  const { data, error } = await supabase.from('posts').select('*, profiles(display_name), post_scores(score), post_comment_counts(comment_count)').order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map(post => ({
    ...post,
    author_name: post.profiles.display_name,
    score: post.post_scores?.[0]?.score ?? 0,
    comment_count: post.post_comment_counts?.[0]?.comment_count ?? 0,
  }));
}

// Fetch a single post by ID with score and comment count
export async function getPostById(postId) {
  const { data, error } = await supabase.from('posts').select('*, profiles(display_name), post_scores(score), post_comment_counts(comment_count)').eq('id', postId).single();
  
  if (error) throw error;
  
  return {
    ...data,
    author_name: data.profiles.display_name,
    score: data.post_scores?.[0]?.score ?? 0,
    comment_count: data.post_comment_counts?.[0]?.comment_count ?? 0,
  };
}

// Create a post and automatically cast an upvote for the creator
export async function createPost(userId, postType, title, { text, imageLink, link } = {}) {
  const { data: post, error: postError } = await supabase.from('posts').insert({
      user_id: userId,
      post_type: postType,
      title,
      post_text: text ?? null,
      post_image_link: imageLink ?? null,
      post_link: link ?? null,
    }).select().single();

  if (postError) throw postError;

  const { error: voteError } = await supabase.from('votes').insert({
    user_id: userId,
    post_id: post.id,
    value: 1 
    });

  if (voteError) throw voteError;

  return post;
}

// cast a post vote (either upvote or downvote), or remove post vote, and return new score
export async function castPostVote(userId, postId, value) {
  const { data, error } = await supabase.rpc('cast_post_vote', {
    p_user_id: userId,
    p_post_id: postId,
    p_value: value ?? null   // null = remove vote
  });
  if (error) throw error;
  return data; // the new score
}

// Get the current user's vote value for a post (returns 1, -1, or null)
export async function getUserPostVote(userId, postId) {
  const { data, error } = await supabase.from('votes').select('value').match({ user_id: userId, post_id: postId }).maybeSingle();

  if (error) throw error;

  return data?.value ?? null;
}

// Update the posts text content stored in the database
export async function updatePost(postId, text) {
  const { error } = await supabase.from('posts').update({ post_text: text }).eq('id', postId);
  
  if (error) throw error;
}

// Delete the post by postId
export async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId);
  
  if (error) throw error;
}