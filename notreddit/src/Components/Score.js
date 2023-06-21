import React, { useState } from "react";

export default function Score(props) {

  const [upvoteHover, setUpvoteHover] = useState(false);
  const [downvoteHover, setDownvoteHover] = useState(false);

  const handleUpvoteHover = () => {
    setUpvoteHover(true);
  };

  const handleDownvoteHover = () => {
    setDownvoteHover(true);
  };

  const handleMouseLeave = () => {
    setUpvoteHover(false);
    setDownvoteHover(false);
  };

  return(
    <div id="container" className="flex flex-col justify-center items-center w-6 gap-1 p-1">
      <div id="upvote" className="bg-white rounded-sm hover:bg-gray-300 cursor-pointer transition-all p-[0.1rem]" onMouseEnter={handleUpvoteHover} onMouseLeave={handleMouseLeave}> 
        <svg className={`${upvoteHover ? "fill-orange-600" : "fill-gray-400"}`} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
          <path d="M433-149v-482L216-413l-67-67 331-331 331 331-66 67-218-218v482h-94Z"/>
        </svg>
      </div>
      <div id="score" className="text-sm">
        {props.score}
      </div>
      <div id="downvote" className="bg-white rounded-sm hover:bg-gray-300 cursor-pointer transition-all p-[0.1rem]" onMouseEnter={handleDownvoteHover} onMouseLeave={handleMouseLeave}>
        <svg className={`${downvoteHover ? "fill-blue-600" : "fill-gray-400"}`} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="16">
          <path d="M480-149 149-480l67-67 217 217v-481h94v481l218-217 66 67-331 331Z"/>
        </svg>
      </div>
    </div>
  )
}