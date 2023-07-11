// Importing Dependencies
import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firestore";
import { doc, updateDoc } from "firebase/firestore";

export default function PostScoreAuth(props) {

  const [upvoteClick, setUpvoteClick] = useState(false);
  const [downvoteClick, setDownvoteClick] = useState(false);
  const [score, setScore] = useState()

  // Function for handling the Firestore interactions for each condition an Upvote can happen in
  const handleUpvoteClick = async () => {

    // If the Post is already Upvoted (score = 1) => set upvoteClick and downvoteClick to false and subtract 1 from the score (score = 0)
    if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(score - 1);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 0
      });

    // If the Post is already Downvoted (score = -1) => set downvoteClick to false, upvoteClick to true, and add 2 to the score (score = 1)
    } else if (downvoteClick) {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(score + 2);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 1
      });

    // If the Post is neither Upvoted nor Downvoted (score = 0) => set upvoteClick to true, downvoteClick to false, and add 1 to the score (score = 1)
    } else {
      setUpvoteClick(true);
      setDownvoteClick(false);
      setScore(score + 1);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 1
      });
    }
  }

  // Function for handling the Firestore interactions for each condition a Downvote can happen in
  const handleDownvoteClick = async () => {

    // If the Post is already Downvoted (score = -1) => set upvoteClick and downvoteClick to false and add 1 from the score (score = 0)
    if (downvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(false);
      setScore(score + 1);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: 0
      });

    // If the Post is already Upvoted (score = 1) => set upvoteClick to false, downvoteClick to true, and subtract 2 from the score (score = -1)
    } else if (upvoteClick) {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(score - 2);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: -1
      });

    // If the Post is neither Upvoted nor Downvoted (score = 0) => set downvoteClick to true, upvoteClick to false, and subtract 1 from the score (score = -1)
    } else {
      setUpvoteClick(false);
      setDownvoteClick(true);
      setScore(score - 1);
      const docRef = await doc(db, "Votes", props.id);
      await updateDoc(docRef, {
        [auth.currentUser.uid]: -1
      });
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

  // If the user has already voted on this Post, set the conditions of the vote
  useEffect(() => {
    setScore(props.score)
    if (props.votes) {
      if (props.votes[auth.currentUser.uid] === 1) {
        setUpvoteClick(true);
      }
      if (props.votes[auth.currentUser.uid] === -1) {
        setDownvoteClick(true);
      }
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