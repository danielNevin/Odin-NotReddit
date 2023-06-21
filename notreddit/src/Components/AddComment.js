import React from "react";

export default function AddComment(props) {



  return (
    <div id="container" className="flex gap-4 w-[40rem] items-center justify-start">
      <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[13rem] h-[2.5rem] gap-2 px-2 transition-all" type="button">
        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M433-183v-250H183v-94h250v-250h94v250h250v94H527v250h-94Z"/>
        </svg>
        <span className="text-white">Add a Comment</span>
      </button>
    </div>
  )
}