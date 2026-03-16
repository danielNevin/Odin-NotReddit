CREATE OR REPLACE FUNCTION cast_comment_vote(
  p_user_id uuid,
  p_comment_id uuid,
  p_value int  -- pass NULL to remove the vote
)
RETURNS int AS $$
DECLARE
  new_score int;
BEGIN
  IF p_value IS NULL THEN
    DELETE FROM votes WHERE user_id = p_user_id AND comment_id = p_comment_id;
  ELSE
    INSERT INTO votes (user_id, comment_id, value)
    VALUES (p_user_id, p_comment_id, p_value)
    ON CONFLICT (user_id, comment_id) DO UPDATE SET value = EXCLUDED.value;
  END IF;

  SELECT score INTO new_score FROM comment_scores WHERE comment_id = p_comment_id;
  RETURN new_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
