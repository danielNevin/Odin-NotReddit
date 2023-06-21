import React from "react";
import Score from "./Score";

export default function CommentCard(props) {

  const processTime = (date) => {
    let timeSincePost = Date.now() - date;
    if (timeSincePost >= 86400000) {
      return (timeSincePost / 86400000).toFixed(0) + " days";
    } else if (timeSincePost >= 3600000) {
      return (timeSincePost / 3600000).toFixed(0) + " hours";
    } else if (timeSincePost >= 60000) {
      return (timeSincePost / 60000).toFixed(0) + " minutes";
    } else {
      return (timeSincePost / 1000).toFixed(0) + " seconds";
    }
  }

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] rounded-md border border-gray-300 hover:border-gray-400 bg-white cursor-pointer shadow-md transition-all">
      <div id="score">
        <Score score={props.score}/>
      </div>
      <div id="contentContainer" className="flex flex-col gap-1">
        <div id="user" className="flex gap-2 text-gray-500 text-xs">
          <span>posted by {props.user}</span>
          <span>{processTime(props.creationDate)} ago</span>
        </div>
        <div id="content" className="text-lg h-8">
          {props.content}
        </div>
      </div>
    </div>
  )
}