import React from "react";
import CommentScoreAuth from "./CommentScoreAuth";
import CommentScoreNoAuth from "./CommentScoreNoAuth";
import { auth } from "../config/firestore";
import { clean } from "profanity-cleaner";

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
    <div id="container" className="flex pl-4 pr-8 gap-4 w-[40rem] rounded-md border border-gray-300 hover:border-gray-400 bg-white cursor-pointer shadow-md hover:translate-y-[-3px] transition-all">
      <div id="score" className="flex justify-center items-start py-2">
        { auth.currentUser ? <CommentScoreAuth score={ props.score } votes={ props.votes } id={ props.id } commentId={ props.commentId }/> : <CommentScoreNoAuth score={ props.score }/> }
      </div>
      <div id="contentContainer" className="flex flex-col gap-1 py-2">
        <div className="flex flex-col py-2 gap-2">
          <div id="user" className="flex gap-1 text-gray-500 text-xs col-span-1">
            <span>posted by { props.user }</span>
            <span>•</span>
            <span>{ processTime(props.creationDate) } ago</span>
          </div>
          <div id="content" className="min-h-8 col-span-1">
            { clean(props.content, { keepFirstAndLastChar: true }) }
          </div>
          <div className="flex items-end justify-start">
          </div>
        </div>
      </div>
    </div>
  )
}