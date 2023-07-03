import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function CommentScoreAuth(props) {

  const [upvoteClick, setUpvoteClick] = useState(false);
  const [downvoteClick, setDownvoteClick] = useState(false);
  const [score, setScore] = useState()

  const handleUpvoteClick = async () => {
    if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(score - 1);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 0
      });
    } else if (downvoteClick) {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(score + 2);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 1
      });
    } else {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(score + 1);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 1
      });
    }
  }

  const handleDownvoteClick = async () => {
    if (downvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(score + 1);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 0
      });
    } else if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(score - 2);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: -1
      });
    } else {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(score - 1);
      const docRef = await doc(db, "Posts", props.id, "commentVotes", props.commentId);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: -1
      });
    }
  }

  const upvoteSVGClasses = () => {
    let classes;
    if (upvoteClick) {
      classes = 'fill-lime-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  }

  const downvoteSVGClasses = () => {
    let classes;
    if (downvoteClick) {
      classes = 'fill-blue-500';
    } else {
      classes = 'fill-gray-400';
    }
    return classes;
  } 

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

  useEffect(() => {
    setScore(props.score)
    console.log(props.votes);
    if (props.votes[auth.currentUser.uid] === 1) {
      setUpvoteClick(true);
    }
    if (props.votes[auth.currentUser.uid] === -1) {
      setDownvoteClick(true);
    }
  }, [])

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