import { supabase } from '../lib/supabaseClient';

// Fetch all comments for a post with their scores, newest first
export async function getCommentsByPostId(postId) {
  const { data, error } = await supabase.from('comments').select('*, profiles(display_name), comment_scores(score)').eq('post_id', postId).order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(comment => ({
    ...comment,
    author_name: comment.profiles.display_name,
    score: comment.comment_scores?.[0]?.score ?? 0,
  }))
}

// Create a comment and automatically cast an upvote for the author
export async function createComment(userId, postId, content) {
  const { data: comment, error: commentError } = await supabase.from('comments').insert({ user_id: userId, post_id: postId, content }).select().single();

  if (commentError) throw commentError;

  const { error: voteError } = await supabase.from('votes').insert({ user_id: userId, comment_id: comment.id, value: 1 });

  if (voteError) throw voteError;

  return comment;
}

// Upsert a comment vote (1 or -1)
export async function castCommentVote(userId, commentId, value) {
  const { data, error } = await supabase.rpc('cast_comment_vote', {
    p_user_id: userId,
    p_comment_id: commentId,
    p_value: value ?? null   // null = remove vote
  });
  if (error) throw error;
  return data; // the new scores
}

// Batch-fetch the current user's votes for a list of comment IDs.
// Returns a Map<commentId, value> — avoids N+1 queries on PostPage.
export async function getUserCommentVotes(userId, commentIds) {
  if (!commentIds.length) return new Map();

  const { data, error } = await supabase.from('votes').select('comment_id, value').eq('user_id', userId).in('comment_id', commentIds);

  if (error) throw error;

  return new Map(data.map(v => [v.comment_id, v.value]));
}
