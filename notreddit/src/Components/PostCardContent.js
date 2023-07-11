// Importing Dependencies
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clean } from "profanity-cleaner";
import { auth } from "../config/firestore";
import { collection, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firestore";

export default function PostCardContent(props) {

  // State variables
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [text, setText] = useState();

  // Event handlers
  const handleEditClick = () => {
    setIsEditClicked(true);
  }

  const handleCancelClick = () => {
    setIsEditClicked(false);
  }

  // Function for handling the submission of new text content
  const handleSubmitClick = async () => {
    const dbPostRef = collection(db, "Posts");

    const data = {
      title: props.title,
      text: text,
      user: auth.currentUser.displayName,
      creationDate: props.creationDate
    };

    await setDoc(doc(dbPostRef, props.id), data);

    setIsEditClicked(false);
  }

  // Function for handling the clicking of the Delete button
  const handleDeleteClick = async () => {

    // Require the user to interact with a confirm window to reduce the possibility of false deletes
    if (window.confirm("Are you sure you want to delete this Post?\nThere is no going back after you press OK") === true) {
      await deleteDoc(doc(db, "Posts", props.id));
      await deleteDoc(doc(db, "Votes", props.id));
      alert('Its all gone now!');
    } else {
      alert('You have canceled the delete operation');
    }
  }

  // Converts the ms from epoch to more "human" units
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

  // Hook to apply the Profanity Filter to the text within the post
  useEffect(() => {
    if (props.text) {
      setText(clean(props.text, { keepFirstAndLastChar: true }));
    }
  }, [props.text])

  return (
    <div id="info" className="flex flex-col gap-1">
      <div id="user" className="flex gap-2 text-gray-500 text-xs">
        <span>posted by { props.user }</span>
        <span>{ processTime(props.creationDate) } ago</span>
      </div>
      <div id="title" className="text-lg h-8">
        { clean(props.title, { keepFirstAndLastChar: true }) }
      </div>
      { props.imageLink &&
        <div className="pr-10" id="image">
          <img src={ props.imageLink } alt="User submission"/>
        </div>
      }
      { props.postLink &&
        <div className="pr-10" id="postLink">
          <Link to={ props.postLink } className="text-blue-600 hover:underline">{ props.postLink }</Link>
        </div>
      }
      { props.text && 
        <div className="" id="text">
          { isEditClicked ? <input className="p-2 w-full transition-all" value={ text } onChange={ (e) => setText(e.target.value) } type="text"/> : <span className="pr-10 transition-all">{ text }</span> } 
        </div>
      }   
      <div className="flex flex-row gap-1">
        <div id="comments" className="flex gap-1">
          <div className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-gray-500 px-2 py-0 cursor-pointer">
            <svg className="fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12">
              <path d="M55-55v-756q0-39.463 27.475-67.231Q109.95-906 149-906h662q39.463 0 67.231 27.769Q906-850.463 906-811v502q0 39.05-27.769 66.525Q850.463-215 811-215H215L55-55Zm134-254h622v-502H149v548l40-46Zm-40 0v-502 502Z"/>
            </svg>
            { (props.commentsCount ? ((props.commentsCount === 1) ? <span>{ props.commentsCount } Comment</span> : <span>{ props.commentsCount } Comments</span>) : <span>0 Comments</span>) }
          </div>
        </div>
        { (auth.currentUser.displayName === props.user) &&
        <>
          { isEditClicked 
          ? 
          <>
            <button className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-lime-500 hover:text-lime-600 px-2 py-0 cursor-pointer" onClick={handleSubmitClick}>
              Submit
            </button>
            <button className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-gray-500 px-2 py-0 cursor-pointer" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
          : 
          <button className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-gray-500 px-2 py-0 cursor-pointer" onClick={handleEditClick}>
            Edit
          </button> }
          <button className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-red-400 hover:text-red-500 px-2 py-0 cursor-pointer" onClick={handleDeleteClick}>
            Delete
          </button>
        </>
        }
      </div>
    </div>
  )
}