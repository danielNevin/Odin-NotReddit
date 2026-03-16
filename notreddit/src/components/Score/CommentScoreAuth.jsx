// Importing Dependencies and necessary Components 
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { castCommentVote, getUserCommentVotes } from "../../services/comments";

export default function CommentScoreAuth(props) {

  const { user } = useAuth();

  // Declaring state variables
  const [upvoteClick, setUpvoteClick] = useState(false);
  const [downvoteClick, setDownvoteClick] = useState(false);
  const [score, setScore] = useState()

  // Function for handling the database interactions for each condition an Upvote can happen in
  const handleUpvoteClick = async () => {

    // If the comment is already Upvoted set upvoteClick and downvoteClick to false and remove the vote from the table (no score being set = removed vote)
    if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(castCommentVote(user.id, props.id));
    // If the comment is either Downvoted or not voted on set upvoteClick to true, downvoteClick to false and add a vote with the value "1" to the table
    } else {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(castCommentVote(user.id, props.id, 1));
    }
  }

  // Function for handling the database interactions for each condition a Downvote can happen in
  const handleDownvoteClick = async () => {

    // If the comment is already Downvoted set upvoteClick and downvoteClick to false and remove the vote from the table (no score being set = removed vote)
    if (downvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(castCommentVote(user.id, props.id));

    // If the comment is either Upvoted or not voted on set upvoteClick to false, downvoteClick to true and add a vote with the value "-1" to the table
    } else {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(castCommentVote(user.id, props.id, -1));
    }
  }

  // Function for handling the dynamic styling of the upvote arrow
  const upvoteSVGClasses = () => {
    let classes;
    if (upvoteClick) {
      classes = 'fill-lime-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  }

  // Function for handling the dynamic styling of the downvote arrow
  const downvoteSVGClasses = () => {
    let classes;
    if (downvoteClick) {
      classes = 'fill-blue-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  } 

  // Function for handling the dynamic styling of the score number
  const scoreClasses = () => {
    let classes = 'text-gray-500';

    if (upvoteClick) {
      classes = 'text-lime-500';
    } else if (downvoteClick) {
      classes = 'text-blue-500';
    } else {
      classes= 'text-gray-400';
    }

    return classes;
  }

  // Fetch the users existing vote
  useEffect(() => {
    setScore(props.score);
    async function loadVote() {
      const votesMap = await getUserCommentVotes(user.id, [props.commentId]);
      const vote = votesMap.get(props.commentId)
      if (vote === 1) setUpvoteClick(true);
      if (vote === -1) setDownvoteClick(true);
    }
    if (user) loadVote();
  }, [props.id, user]);

  return (
    <div id="container" className="flex flex-col justify-center items-center w-6 gap-1 p-1">
      <button id="upvote" className="bg-white rounded-sm hover:bg-gray-100 cursor-pointer transition-all p-[0.1rem]" onClick={ handleUpvoteClick }> 
        <svg className={ upvoteSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
          <path d="M433-149v-482L216-413l-67-67 331-331 331 331-66 67-218-218v482h-94Z"/>
        </svg>
      </button>
      <span id="score" className={ scoreClasses() }>
        { score }
      </span>
      <button id="downvote" className="bg-white rounded-sm hover:bg-gray-100 cursor-pointer transition-all p-[0.1rem]" onClick={ handleDownvoteClick }>
        <svg className={ downvoteSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
          <path d="M480-149 149-480l67-67 217 217v-481h94v481l218-217 66 67-331 331Z"/>
        </svg>
      </button>
    </div>
  )
}