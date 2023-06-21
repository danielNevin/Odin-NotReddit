import React from "react";

export default function CreatePostImageInput(props) {
  return (
    <form id="imageInput" className="flex flex-col p-4 gap-4">
      <input type="text" name="title" placeholder="Title" className="p-2 border-2 rounded-lg"/>
      <input type="text" name="content" placeholder="Your Image URL" className="p-2 border-2 rounded-lg"/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        <button class="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button">
          Post
        </button>
        <button class="bg-white border-2 border-lime-500 hover:text-xl hover:rounded w-[6rem] h-[2.5rem] text-lime-500 hover:bg-gray-100 rounded-xl transition-all" type="button" onClick={props.handleCancelClick}>
          Cancel
        </button>
      </div>
    </form>
  )
}