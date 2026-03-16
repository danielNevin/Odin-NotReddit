// Importing Dependencies
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { castPostVote, getUserPostVote } from "../../services/posts";

export default function PostScoreAuth(props) {

  const { user } = useAuth();

  const [upvoteClick, setUpvoteClick] = useState(false);
  const [downvoteClick, setDownvoteClick] = useState(false);
  const [score, setScore] = useState()

  // Function for handling the database interactions for each   condition an Upvote can happen in
  const handleUpvoteClick = async () => {

    // If the Post is already Upvoted (score = 1) => set upvoteClick and downvoteClick to false and remove vote
    if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(castPostVote(user.id, props.id));

    // If the Post is Downvoted or not voted on set upvoteClick to true, downvoteClick to false, and overwrite vote in table with value "1"
    } else {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(castPostVote(user.id, props.id, 1));
    }
  }

  // Function for handling the database interactions for each condition a Downvote can happen in
  const handleDownvoteClick = async () => {

    // If the Post is already Downvoted (score = -1) => set upvoteClick and downvoteClick to false and add 1 from the score (score = 0)
    if (downvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(castPostVote(user.id, props.id));

    // If the Post is Upvoted or not voted on set upvoteClick to false, downvoteClick to true, and overwrite vote in table with value "-1"
    } else {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(castPostVote(user.id, props.id, -1));
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
      const vote = await getUserPostVote(user.id, props.id);
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