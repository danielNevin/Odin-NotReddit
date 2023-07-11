// Importing Dependencies and necessary Components 
import React, { useState } from "react";
import CreatePostCard from "./CreatePostCard/CreatePostCard";

export default function CreatePost(props) {

  // Declaring state variables
  const [isPostInputClicked, setIsPostInputClicked] = useState(false);
  const [isImageButtonClicked, setIsImageButtonClicked] = useState(false);
  const [isLinkButtonClicked, setIsLinkButtonClicked] = useState(false);

  const [isImageButtonHovered, setIsImageButtonHovered] = useState(false);
  const [isLinkButtonHovered, setIsLinkButtonHovered] = useState(false);

  const [postHover, setPostHover] = useState(false);
  const [postClick, setPostClick] = useState(false);

  const [imageHover, setImageHover] = useState(false);
  const [imageClick, setImageClick] = useState(false);

  const [linkHover, setLinkHover] = useState(false);
  const [linkClick, setLinkClick] = useState(false);

  const handlePostHover = () => {
    postClick ? setPostHover(false) : setPostHover(true);
  };

  // Handle clicking logic for the Post Input Box
  const handlePostInputClick = () => {
    setIsPostInputClicked(true);
    setIsImageButtonClicked(false);
    setIsLinkButtonClicked(false);
    setPostClick(true);
    setImageClick(false);
    setLinkClick(false);
  }

  // Handle clicking logic for the Image Button
  const handleImageButtonClick = () => {
    setIsPostInputClicked(false);
    setIsImageButtonClicked(true);
    setIsLinkButtonClicked(false);
    setPostClick(false);
    setImageClick(true);
    setLinkClick(false);
  }

  // Handle clicking logic for the Post Link Button
  const handleLinkButtonClick = () => {
    setIsPostInputClicked(false);
    setIsImageButtonClicked(false);
    setIsLinkButtonClicked(true);
    setPostClick(false);
    setImageClick(false);
    setLinkClick(true);
  }

  // Handle clicking logic for the Post Tab
  const handlePostClick = () => {
    setPostHover(false);
    setPostClick(true);
    setImageHover(false);
    setImageClick(false);
    setLinkHover(false);
    setLinkClick(false);
  };

  const handleImageHover = () => {
    imageClick ? setImageHover(false) : setImageHover(true);
  };

  // Handle clicking logic for the Image Tab
  const handleImageClick = () => {
    setPostHover(false);
    setPostClick(false);
    setImageHover(false);
    setImageClick(true);
    setLinkHover(false);
    setLinkClick(false);
  };

  const handleLinkHover = () => {
    linkClick ? setLinkHover(false) : setLinkHover(true);
  };

  // Handle clicking logic for the Link Tab
  const handleLinkClick = () => {
    setPostHover(false);
    setPostClick(false);
    setImageHover(false);
    setImageClick(false);
    setLinkHover(false);
    setLinkClick(true);
  };

  const handleMouseLeave = () => {
    setPostHover(false);
    setImageHover(false);
    setLinkHover(false);
  }

  // Handle clicking logic for the Cancel button
  const handleCancelClick = () => {
    setPostClick(false);
    setImageClick(false);
    setLinkClick(false);
    setIsPostInputClicked(false);
    setIsImageButtonClicked(false);
    setIsLinkButtonClicked(false);
    setIsImageButtonHovered(false);
    setIsLinkButtonHovered(false);
  }

  const handleImageButtonHover = () => {
    setIsImageButtonHovered(true);
  }

  const handleLinkButtonHover = () => {
    setIsLinkButtonHovered(true);
  } 

  const handleButtonMouseLeave = () => {
    setIsImageButtonHovered(false);
    setIsLinkButtonHovered(false);
  } 

  // Handle dynamic styling for the image SVG in the image Button
  const imageSVGClasses = () => {
    let classes = 'transition-all fill-gray-500';
    if (isImageButtonHovered) {
      classes = ' transition-all fill-lime-400 scale-125'
    }

    return classes;
  }

  // Handle dynamic styling for the link SVG in the link Button
  const linkSVGClasses = () => {
    let classes = 'transition-all fill-gray-500';
    if (isLinkButtonHovered) {
      classes = ' transition-all fill-lime-400 scale-125'
    }

    return classes;
  }

  return (
    <div id="overallContainer" className="flex flex-col gap-1">
      {( isPostInputClicked || isImageButtonClicked || isLinkButtonClicked ) ?
        <CreatePostCard postHover={postHover} postClick={postClick} imageHover={imageHover} imageClick={imageClick} linkHover={linkHover} linkClick={linkClick} handlePostHover={handlePostHover} handlePostClick={handlePostClick} handleImageHover={handleImageHover} handleImageClick={handleImageClick} handleLinkHover={handleLinkHover} handleLinkClick={handleLinkClick} handleMouseLeave={handleMouseLeave} handleCancelClick={handleCancelClick}/>
        :
        <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] items-center rounded-md border border-gray-200 bg-white shadow-md">
          <form className="flex w-full items-center gap-4 p-2">
            <div className="p-2">
              <svg className="fill-lime-500" xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36">
                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/>
              </svg>
            </div>
            <input type="text" name="title" placeholder="Create Post" className="flex w-full py-2 px-4 cursor-pointer hover:outline-none hover:outline-lime-500 rounded-full shadow-inner bg-stone-50 hover:bg-stone-100 transition-all" onClick={handlePostInputClick}/>
            <button className="flex p-2 rounded-md" type="button" onClick={ handleImageButtonClick } onMouseEnter={ handleImageButtonHover } onMouseLeave={ handleButtonMouseLeave }>
              <svg className={ imageSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M769-648v-94h-94v-72.5h94V-908h72v93.5h95v72.5h-95v94h-72ZM109-55q-39.05 0-66.525-27.475Q15-109.95 15-149v-495q0-38.463 27.475-66.731Q69.95-739 109-739h132l84-98h257v95H368l-84 98H109v495h661v-393h95v393q0 39.05-28.269 66.525Q808.463-55 770-55H109Zm330.5-171q72.5 0 121.5-49t49-121.5q0-72.5-49-121T439.5-566q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
              </svg>
            </button>
            <button className="flex p-2 rounded-md" type="button" onClick={ handleLinkButtonClick } onMouseEnter={ handleLinkButtonHover } onMouseLeave={ handleButtonMouseLeave }>
              <svg className={ linkSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M439-255H280q-94.11 0-159.555-65.422Q55-385.845 55-479.696q0-93.852 65.445-160.078T280-706h159v95H280.429q-55.512 0-93.471 37.765-37.958 37.764-37.958 93Q149-425 186.958-387q37.959 38 93.471 38H439v94ZM305-444v-72h348v72H305Zm601-36h-95q0-55-37.958-93-37.959-38-93.471-38H521v-95h159q93.79 0 159.895 66.105T906-480ZM713-135v-114H599v-72h114v-114h72v114h114v72H785v114h-72Z"/>
              </svg>
            </button>
          </form>
        </div>
      }
    </div>
  )
}