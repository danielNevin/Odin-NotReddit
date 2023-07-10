import React, { useState } from "react";
import { db } from "../../config/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "../../config/firestore";

export default function CreatePostTextInput(props) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    let docId;
    const dbRefPost = collection(db, "Posts");
    const dbRefScore = collection(db, "Votes");
    const data = {
      title: title,
      text: content,
      user: auth.currentUser.displayName,
      creationDate: Date.now()
    };
    addDoc(dbRefPost, data)
      .then(docRef => {
        docId = docRef.id;
        setDoc(doc(db, "Votes", docId), {
          [auth.currentUser.uid]: 1
        });
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    props.handleCancelClick();
  }  

  return (
    <form id="postInput" className="flex flex-col p-4 gap-4">
      <input type="text" name="title" placeholder="Title" className="px-4 h-10 shadow-inner rounded-full bg-stone-50 hover:bg-stone-100 focus:outline-none focus:outline-lime-500 transition-all" value={ title } onChange={ (e) => setTitle(e.target.value) }/>
      <textarea type="text" name="content" placeholder="Your Text (optional)" className="p-4 h-[10rem] shadow-inner rounded-2xl bg-stone-50 hover:bg-stone-100 focus:outline-none focus:outline-lime-500 transition-all" value={ content } onChange={ (e) => setContent(e.target.value) }/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        <button className="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button" onClick={ handlePost }>
          Post
        </button>
        <button className="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ props.handleCancelClick }>
          Cancel
        </button>
      </div>
    </form>
  )
}