import React, { useState } from "react";
import { db } from "../config/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../config/firestore";
import { Link } from "react-router-dom";

export default function AddComment(props) {

  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const handleButtonPress = () => {
    setIsButtonPressed(true);
  }

  const handleCancelPress = () => {
    setIsButtonPressed(false);
    setCommentContent(null);
  }

  const handleCommentSubmission = () => {
    const commRef = collection(db, "Posts", props.postid, "comments");
    const data = {
      content: commentContent,
      user: auth.currentUser.displayName,
      creationDate: Date.now(),
    };
    addDoc(commRef, data)
      .then(commRef => {
        let commId = commRef.id;
        setDoc(doc(db, "Posts", props.postid, "commentVotes", commId), {
          [auth.currentUser.uid]: 1
        });
        console.log("Comment has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    const updatedComments = [data, ...props.comments];
    props.setComments(updatedComments);
    handleCancelPress();
  }  

  return (
    <>
      { isButtonPressed ? 
      <div id="container" className="flex gap-4 p-2 w-[40rem] rounded-md border cursor-pointer shadow-inner transition-all bg-stone-50">
        <form className="flex flex-col gap-3 bg-stone-50">
          <textarea className="w-[38.9rem] h-[10rem] bg-stone-50 rounded-md px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md focus:border resize-none transition-all" placeholder="What are your thoughts?" value={ commentContent } onChange={ (e) => setCommentContent(e.target.value) }></textarea>
          <div className="flex gap-4 justify-end">
            <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleCommentSubmission }>
              Post
            </button>
            <button className="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleCancelPress }>
              Cancel
            </button>
          </div>
        </form>
      </div> :
      <div id="container" className="flex gap-4 w-[40rem] items-center justify-center">
        {auth.currentUser ?
          <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[13rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleButtonPress }>
            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M433-183v-250H183v-94h250v-250h94v250h250v94H527v250h-94Z"/>
            </svg>
            <span className="text-white">Add a Comment</span>
          </button> :
          <Link to="/login">
            <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[18rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleButtonPress }>
              <span className="text-white">Login to add a Comment</span>
            </button>
          </Link>
          }
      </div>
      }
    </>
  )
}