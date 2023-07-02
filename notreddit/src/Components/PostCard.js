import React from "react";
import PostScoreAuth from "./PostScoreAuth";
import PostCardContent from "./PostCardContent";
import PostScoreNoAuth from "./PostScoreNoAuth";
import { auth } from "../config/firestore";

export default function PostCard(props) {

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] bg-white transition-all">
      <div id="score">
        { auth.currentUser ? <PostScoreAuth score={ props.score } votes={ props.votes } id={ props.id }/> : <PostScoreNoAuth score={ props.score }/> }
      </div>
      <PostCardContent id={ props.id } title={ props.title } creationDate={ props.creationDate } text={ props.text } imageLink={ props.imageLink } postLink={ props.postLink } score={ props.score } user={ props.user } commentsCount={ props.commentsCount }/>
    </div>
  )
}