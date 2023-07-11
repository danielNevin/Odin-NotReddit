// Importing Dependencies
import React from "react";

export default function SearchCard(props) {

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

  return (
    <div id="container" className="flex flex-col px-4 py-4 gap-4 w-[45rem] rounded-md border bg-white cursor-pointer shadow-md hover:shadow-lg hover:bg-stone-100 transition-all">
      <div className="flex gap-4">
        <div className="flex items-center justify-start">
          <span className="px-2 py-0 text-lg font-bold text-lime-500">{ props.item.score }</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>{ props.item.title }</span>
          <span className="text-gray-500 text-sm">Posted by { props.item.user } { processTime(props.item.creationDate) } ago</span>
        </div>
      </div>
    </div>
  )
}