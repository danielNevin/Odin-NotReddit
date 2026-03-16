CREATE OR REPLACE FUNCTION cast_post_vote(
  p_user_id uuid,
  p_post_id uuid,
  p_value int  -- pass NULL to remove the vote
)
RETURNS int AS $$
DECLARE
  new_score int;
BEGIN
  IF p_value IS NULL THEN
    DELETE FROM votes WHERE user_id = p_user_id AND post_id = p_post_id;
  ELSE
    INSERT INTO votes (user_id, post_id, value)
    VALUES (p_user_id, p_post_id, p_value)
    ON CONFLICT (user_id, post_id) DO UPDATE SET value = EXCLUDED.value;
  END IF;

  SELECT score INTO new_score FROM post_scores WHERE post_id = p_post_id;
  RETURN new_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;