// Importing Dependencies and necessary Components 
import React from "react";
import ScoreAuth from "./PostScoreAuth";
import ScoreNoAuth from "./PostScoreNoAuth";
import PostCardContentFrontPage from "./PostCardContentFrontPage";
import { auth } from "../config/firestore";

export default function PostCardFrontPage(props) {

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] rounded-md border bg-white cursor-pointer shadow-md hover:shadow-lg hover:translate-y-[-3px] transition-all">
      <div id="score">
        {(auth) ? <ScoreNoAuth id={ props.id }/> : <ScoreAuth id={ props.id }/>}
      </div>
      <PostCardContentFrontPage id={ props.id } title={ props.title } creationDate={ props.creationDate } text={ props.text } imageLink={ props.imageLink } postLink={ props.postLink } score={ props.score } user={ props.user } commentsCount={ props.commentsCount }/>
    </div>
  )
}