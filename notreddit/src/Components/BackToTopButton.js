import React from "react";

export default function BackToTopButton() {

  const handleBackToTopClick = () => {
    document.body.scrollTo({top: 0, behavior: 'smooth'}) // For Safari
    document.documentElement.scrollTo({top: 0, behavior: 'smooth'}) // For Chrome, Firefox, IE and Opera
  } 

  return (
    <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[13rem] h-[2.5rem] gap-2 px-4 transition-all" type="button" onClick={ handleBackToTopClick }>
      <div className="flex items-center justify-center gap-1">
        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M433-149v-482L216-413l-67-67 331-331 331 331-66 67-218-218v482h-94Z"/>
        </svg>
        <span className="text-white">Back to the Top</span>
      </div>
    </button>
  )
}