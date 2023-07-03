import React, { useState } from "react";

export default function About() {

  const [isTopDivHovered, setIsTopDivHovered] = useState(false);
  const [isMidDivHovered, setIsMidDivHovered] = useState(false);
  
  const handleTopDivHover = () => {
    setIsTopDivHovered(true);
  }

  const handleMidDivHover = () => {
    setIsMidDivHovered(true);
  }

  const handleMouseLeave = () => {
    setIsTopDivHovered(false);
    setIsMidDivHovered(false);
  }

  const topSVGClasses = () => {
    let classes = 'fill-lime-500 transition-all';

    if (isTopDivHovered) {
      classes = 'fill-lime-600 transition-all scale-110'
    }

    return classes;
  }

  const topTextClasses = () => {
    let classes = 'text-lime-500 transition-all';

    if (isTopDivHovered) {
      classes = 'text-lime-600 transition-all'
    }

    return classes;
  }

  const reactClasses = () => {
    let classes = 'text-gray-500 font-semibold transition-all';

    if (isMidDivHovered) {
      classes = 'text-sky-500 font-semibold transition-all'
    }

    return classes;
  }

  const tailwindClasses = () => {
    let classes = 'text-gray-500 font-semibold transition-all';

    if (isMidDivHovered) {
      classes = 'text-blue-600 font-semibold transition-all'
    }

    return classes;
  }

  const firebaseClasses = () => {
    let classes = 'text-gray-500 font-semibold transition-all';

    if (isMidDivHovered) {
      classes = 'text-amber-400 font-semibold transition-all'
    }

    return classes;
  }

  return (
    <div className="flex flex-col gap-4 w-[22rem]">
      <div className="flex flex-col px-8 pt-4 pb-6 gap-2 rounded-md border bg-white shadow-md hover:shadow-lg hover:translate-y-[-3px] transition-all" onMouseEnter={ handleTopDivHover } onMouseLeave={ handleMouseLeave }>
        <div id="logo-container" className="flex items-center justify-center gap-2 py-2 px-6 w-full">
          <svg className={ topSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d="M480-294q78 0 132-54t54-132q0-78-54-132t-132-54q-78 0-132 54t-54 132q0 78 54 132t132 54Zm.078 228.131q-85.469 0-161.006-32.395-75.536-32.395-131.975-88.833-56.438-56.439-88.833-131.897-32.395-75.459-32.395-160.928 0-86.469 32.395-162.006 32.395-75.536 88.745-131.504 56.349-55.968 131.849-88.616 75.5-32.648 161.017-32.648 86.516 0 162.12 32.604 75.603 32.604 131.529 88.497t88.549 131.452Q894.696-566.584 894.696-480q0 85.547-32.648 161.075-32.648 75.527-88.616 131.896-55.968 56.37-131.426 88.765-75.459 32.395-161.928 32.395ZM480-145.087q139.739 0 237.326-97.732Q814.913-340.551 814.913-480q0-139.739-97.587-237.326-97.587-97.587-237.609-97.587-139.021 0-236.826 97.587-97.804 97.587-97.804 237.609 0 139.021 97.732 236.826Q340.551-145.087 480-145.087ZM480-480Z"/>
          </svg>
        </div>
        <p className="text-justify text-gray-500"><span className={ topTextClasses() }>Welcome to NotReddit!</span> A vastly simplified version of a popular social media platform. This web app was built by myself, <span className={ topTextClasses() }>Daniel Nevin</span>, to finish off the JavaScript course of The Odin Project</p>
        <p className="text-justify text-gray-500">This web app was built purely for educational purposes and does not aim to compete with any existing web apps with similar functionality</p>
      </div>
      <div className="flex flex-col px-8 py-4 gap-2 rounded-md border bg-white shadow-md hover:shadow-lg hover:translate-y-[-3px] transition-all items-center" onMouseEnter={ handleMidDivHover } onMouseLeave={ handleMouseLeave }>
        <p className="text-justify text-gray-500">This project was built using the following tech stack:</p>
        <ul className="list-disc px-8">
          <li className={ reactClasses() }>React</li>
          <li className={ tailwindClasses() }>Tailwind CSS</li>
          <li className={ firebaseClasses() }>Firebase Firestore</li>
        </ul>
      </div>
      <div className="flex flex-col px-8 py-4 gap-4 rounded-md border bg-white shadow-md hover:shadow-lg hover:translate-y-[-3px] transition-all">
        <p className="text-justify text-gray-500">If you have any questions regarding the project, feel free to contact me via my GitHub which you can find below:</p>
        <div className="flex items-center justify-center w-full">
          <a href="https://github.com/dnevin234">
            <svg width="98" height="96" xmlns="http://www.w3.org/2000/svg" className="scale-75 fill-lime-500 hover:-translate-y-1 transition-all">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}