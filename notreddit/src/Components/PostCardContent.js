import React from "react";

export default function PostCardContent(props) {

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

  return (
    <div id="info" className="flex flex-col gap-1">
      <div id="user" className="flex gap-2 text-gray-500 text-xs">
        <span>posted by { props.user }</span>
        <span>{ processTime(props.creationDate) } ago</span>
      </div>
      <div id="title" className="text-lg h-8">
        { props.title }
      </div>
      { props.imageLink &&
        <div className="pr-10" id="image">
          <img src={ props.imageLink } alt="User submission"/>
        </div>
      }
      { props.postLink &&
        <div className="pr-10" id="postLink">
          <a href={ props.postLink } className="text-blue-600 hover:underline">{ props.postLink }</a>
        </div>
      }
      { props.text &&
        <div className="" id="text">
          <span className="pr-10">{ props.text }</span>
        </div>
      }   
      <div id="comments" className="flex gap-1">
        <div className="flex gap-1 bg-white hover:bg-gray-200 rounded-md justify-center items-center text-gray-500 px-2 py-0 cursor-pointer">
          <svg className="fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 -960 960 960" width="12">
            <path d="M55-55v-756q0-39.463 27.475-67.231Q109.95-906 149-906h662q39.463 0 67.231 27.769Q906-850.463 906-811v502q0 39.05-27.769 66.525Q850.463-215 811-215H215L55-55Zm134-254h622v-502H149v548l40-46Zm-40 0v-502 502Z"/>
          </svg>
          { (props.commentsCount ? ((props.commentsCount === 1) ? <span>{ props.commentsCount } Comment</span> : <span>{ props.commentsCount } Comments</span>) : <span>0 Comments</span>) }
        </div>
      </div>
    </div>
  )
}