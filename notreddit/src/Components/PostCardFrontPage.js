import React from "react";
import Score from "./Score";
import PostCardContent from "./PostCardContent";

export default function PostCardFrontPage(props) {

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] rounded-md border bg-white cursor-pointer shadow-md hover:translate-y-[-3px] hover:border-lime-400 transition-all">
      <div id="score">
        <Score score={props.score}/>
      </div>
      <PostCardContent id={props.id} title={props.title} creationDate={props.creationDate} text={props.text} imageLink={props.imageLink} postLink={props.postLink} score={props.score} user={props.user} commentsCount={props.commentsCount}/>
    </div>
  )
}