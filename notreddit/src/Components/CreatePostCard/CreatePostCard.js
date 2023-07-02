import React from "react";
import CreatePostText from "./CreatePostTextInput";
import CreatePostImage from "./CreatePostImageInput";
import CreatePostLink from "./CreatePostLinkInput";

export default function CreatePostCard(props) {

  const postButtonClasses = () => {
    let classes = 'flex gap-2 justify-center items-center text-gray-400 bg-white transition-all rounded-t-md';

    if (props.postHover) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 bg-stone-100 transition-all border-b-2';
    }

    if (props.postClick) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 transition-all border-b-2 bg-lime-50 text-lime-500 border-lime-500'
    }

    return classes;
  }

  const postSVGClasses = () => {
    let classes = 'transition-all';
    if (!(props.postHover && props.postClick)) {
      classes += ' fill-gray-400'
    }

    if (props.postClick) {
      classes += ' fill-lime-500'
    }

    return classes;
  }

  const imageButtonClasses = () => {
    let classes = 'flex gap-2 justify-center items-center text-gray-400 bg-white transition-all rounded-t-md';

    if (props.imageHover) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 bg-stone-100 transition-all border-b-2';
    }

    if (props.imageClick) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 transition-all border-b-2 bg-lime-50 text-lime-500 border-lime-500'
    }

    return classes;
  }

  const imageSVGClasses = () => {
    let classes = 'transition-all';
    if (!(props.imageHover && props.imageClick)) {
      classes += ' fill-gray-400'
    }

    if (props.imageClick) {
      classes += ' fill-lime-500'
    }

    return classes;
  }

  const linkButtonClasses = () => {
    let classes = 'flex gap-2 justify-center items-center text-gray-400 bg-white transition-all rounded-t-md';

    if (props.linkHover) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 bg-stone-100 transition-all border-b-2';
    }

    if (props.linkClick) {
      classes = 'flex gap-2 justify-center items-center text-gray-400 transition-all border-b-2 bg-lime-50 text-lime-500 border-lime-500'
    }

    return classes;
  }

  const linkSVGClasses = () => {
    let classes = 'transition-all';
    if (!(props.linkHover && props.linkClick)) {
      classes += ' fill-gray-400'
    }

    if (props.linkClick) {
      classes+= ' fill-lime-500'
    }

    return classes;
  }

  return (
    <div id="container" className="flex flex-col w-[40rem] rounded-md border shadow-md border-gray-300 bg-white transition-all">
      <div id="tabs" className="grid grid-cols-3 w-full h-[5rem] p-[0.1rem] gap-[0.1rem] bg-white rounded-t-md">
        <button id="postButton" className={ postButtonClasses() } onMouseEnter={ props.handlePostHover } onMouseLeave={ props.handleMouseLeave } onClick={ props.handlePostClick }>
          <svg className={ postSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M189-95q-39.05 0-66.525-27.475Q95-149.95 95-189v-582q0-39.463 27.475-67.231Q149.95-866 189-866h383v95H189v582h582v-383h95v383q0 39.05-27.769 66.525Q810.463-95 771-95H189Zm132-182v-60h319v60H321Zm0-127v-60h319v60H321Zm0-127v-60h319v60H321Zm376.5-71v-96H602v-71h96v-97h71v97h97v71.5h-97v95.5h-71.5Z"/>
          </svg>
          <span>Post</span>
        </button>
        <button id="imageButton" className={ imageButtonClasses() } onMouseEnter={ props.handleImageHover } onMouseLeave={ props.handleMouseLeave } onClick={ props.handleImageClick }>
          <svg className={ imageSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M769-648v-94h-94v-72.5h94V-908h72v93.5h95v72.5h-95v94h-72ZM109-55q-39.05 0-66.525-27.475Q15-109.95 15-149v-495q0-38.463 27.475-66.731Q69.95-739 109-739h132l84-98h257v95H368l-84 98H109v495h661v-393h95v393q0 39.05-28.269 66.525Q808.463-55 770-55H109Zm330.5-171q72.5 0 121.5-49t49-121.5q0-72.5-49-121T439.5-566q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
          </svg>
          <span>Image or Video</span>
        </button>
        <button id="linkButton" className={ linkButtonClasses() } onMouseEnter={ props.handleLinkHover } onMouseLeave={ props.handleMouseLeave } onClick={ props.handleLinkClick }>
          <svg className={ linkSVGClasses() } xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M439-255H280q-94.11 0-159.555-65.422Q55-385.845 55-479.696q0-93.852 65.445-160.078T280-706h159v95H280.429q-55.512 0-93.471 37.765-37.958 37.764-37.958 93Q149-425 186.958-387q37.959 38 93.471 38H439v94ZM305-444v-72h348v72H305Zm601-36h-95q0-55-37.958-93-37.959-38-93.471-38H521v-95h159q93.79 0 159.895 66.105T906-480ZM713-135v-114H599v-72h114v-114h72v114h114v72H785v114h-72Z"/>
          </svg>
          <span>Link</span>
        </button>
      </div>
      <div id="inputs">
        { props.postClick && (
          <CreatePostText handleCancelClick={ props.handleCancelClick }/>
          )
        }
        { props.imageClick && (
          <CreatePostImage handleCancelClick={ props.handleCancelClick }/>
          )
        } 

        { props.linkClick && (
          <CreatePostLink handleCancelClick={ props.handleCancelClick }/>
          )
        }
      </div>
    </div>
  )
}