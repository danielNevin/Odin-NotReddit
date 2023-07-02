import React, { useState } from "react";
import { db } from "../../config/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../../config/firestore";

export default function CreatePostLinkInput(props) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handlePost = () => {
    let docId;
    const dbRefPost = collection(db, "Posts");
    const dbRefScore = collection(db, "Votes");
    const data = {
      title: title,
      postLink: link,
      user: auth.currentUser.displayName,
      creationDate: Date.now(),
    };
    addDoc(dbRefPost, data)
      .then(docRef => {
        docId = docRef.id;
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    setDoc(doc(db, "Votes", docId), {
      [auth.currentUser.uid]: 1
    })
    .then(dbRefScore => {
      console.log("Post vote directory has been initialized successfully");
    })
    .catch(error => {
      console.log(error);
    })
    props.handleCancelClick();
  }  

  return (
    <form id="linkInput" className="flex flex-col p-4 gap-4">
      <input type="text" name="title" placeholder="Title" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={ title } onChange={ (e) => setTitle(e.target.value) }/>
      <input type="text" name="content" placeholder="Your URL (include https://)" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={link} onChange={ (e) => setLink(e.target.value) }/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        <button class="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button" onClick={ handlePost }>
          Post
        </button>
        <button class="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ props.handleCancelClick }>
          Cancel
        </button>
      </div>
    </form>
  )
}