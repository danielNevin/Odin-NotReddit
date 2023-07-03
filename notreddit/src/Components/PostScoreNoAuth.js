import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PostScoreNoAuth(props) {

  const [upvoteHover, setUpvoteHover] = useState(false);
  const [downvoteHover, setDownvoteHover] = useState(false);

  const handleUpvoteHover = () => {
    setUpvoteHover(true);
  }

  const handleDownvoteHover = () => {
    setDownvoteHover(true);
  }

  const handleMouseLeave = () => {
    setUpvoteHover(false);
    setDownvoteHover(false);
  }

  const upvoteSVGClasses = () => {
    let classes;
    if (upvoteHover) {
      classes = 'fill-lime-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  }

  const downvoteSVGClasses = () => {
    let classes;
    if (downvoteHover) {
      classes = 'fill-lime-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  }

  return (
    <div id="container" className="flex flex-col justify-center items-center w-6 gap-1 p-1">
      <Link to="/login">
        <button id="upvote" className="bg-white rounded-sm hover:bg-gray-100 cursor-pointer transition-all p-[0.1rem]" onMouseEnter={ handleUpvoteHover } onMouseLeave={ handleMouseLeave }> 
          <svg className={ upvoteSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
            <path d="M433-149v-482L216-413l-67-67 331-331 331 331-66 67-218-218v482h-94Z"/>
          </svg>
        </button>
      </Link>
      <span id="score" className="text-gray-500">
        { props.score }
      </span>
      <Link to="/login">
        <button id="downvote" className="bg-white rounded-sm hover:bg-gray-100 cursor-pointer transition-all p-[0.1rem]" onMouseEnter={ handleDownvoteHover } onMouseLeave={ handleMouseLeave }>
          <svg className={ downvoteSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
            <path d="M480-149 149-480l67-67 217 217v-481h94v481l218-217 66 67-331 331Z"/>
          </svg>
        </button>
      </Link>
    </div>
  )
}