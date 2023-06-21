import React from "react";
import Score from "./Score";
import PostCardContent from "./PostCardContent";


export default function PostCard(props) {

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] rounded-md border border-gray-300 hover:border-gray-400 bg-white cursor-pointer shadow-md transition-all">
      <div id="score">
        <Score score={props.score}/>
      </div>
      <PostCardContent id={props.id} title={props.title} creationDate={props.creationDate} text={props.text} imageLink={props.imageLink} postLink={props.postLink} score={props.score} user={props.user} commentsCount={props.commentsCount}/>
    </div>
  )
}