// Importing Dependencies and necessary Components
import React, { useState } from "react";
import { db } from "../../config/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../../config/firestore";

export default function CreatePostImageInput(props) {

  // State variables to store the title and image link entered by the user
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handlePost = () => {

    // Assign References within the Cloud Firestore
    let docId;
    const dbRefPost = collection(db, "Posts");
    const dbRefVotes = collection(db, "Votes");

    // Fill the data object with the entered information
    const data = {
      title: title,
      imageLink: link,
      user: auth.currentUser.displayName,
      creationDate: Date.now(),
    };

    // Add the data object to the Cloud Firestore under a randomly generated document ID within the Posts collection
    addDoc(dbRefPost, data)
      .then(docRef => {
        // Use the previously generated document ID to generate a mirror document within the Votes collection and upvote the post using the current userID
        docId = docRef.id;
        setDoc(doc(dbRefVotes, docId), {
          [auth.currentUser.uid]: 1
        });
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })

    // Call the handleCancelClick function passed as a prop to reset the form and cancel the post creation
    props.handleCancelClick();
  }  

  return (
    <form id="imageInput" className="flex flex-col p-4 gap-4">
      {/* Input field for the post title */}
      <input type="text" name="title" placeholder="Title" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={ title } onChange={ (e) => setTitle(e.target.value) }/>
      {/* Input field for the image link */}
      <input type="text" name="content" placeholder="Your Image URL" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={ link } onChange={ (e) => setLink(e.target.value) }/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        {/* "Post" button */}
        <button class="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button" onClick={ handlePost }>
          Post
        </button>
        {/* "Cancel" button */}
        <button class="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ props.handleCancelClick }>
          Cancel
        </button>
      </div>
    </form>
  )
}
