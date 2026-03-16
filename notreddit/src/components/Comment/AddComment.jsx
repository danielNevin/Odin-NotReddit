// Importing Dependencies and necessary Components 
import { useState } from "react";
import { createComment } from "../../services/comments";
import { Link } from "react-router-dom";

export default function AddComment(props) {

  // State variables to track button press and comment content
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const handleButtonPress = () => {
    setIsButtonPressed(true);
  }

  const handleCancelPress = () => {
    setIsButtonPressed(false);
    setCommentContent('');
  }

  const handleCommentSubmission = async () => {
    await createComment(props.user.id, props.postId, commentContent);
    props.onCommentAdd();
    handleCancelPress();
  }  

  return (
    <>
      { isButtonPressed ? 
      <div id="container" className="flex gap-4 p-2 w-[40rem] rounded-md border cursor-pointer shadow-inner transition-all bg-stone-50">
        <form className="flex flex-col gap-3 bg-stone-50">
          <textarea className="w-[38.9rem] h-[10rem] bg-stone-50 rounded-md px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md focus:border resize-none transition-all" placeholder="What are your thoughts?" value={ commentContent } onChange={ (e) => setCommentContent(e.target.value) }></textarea>
          <div className="flex gap-4 justify-end">
            <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleCommentSubmission }>
              Post
            </button>
            <button className="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleCancelPress }>
              Cancel
            </button>
          </div>
        </form>
      </div> :
      <div id="container" className="flex gap-4 w-[40rem] items-center justify-center">
        {props.user ?
          <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[13rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleButtonPress }>
            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M433-183v-250H183v-94h250v-250h94v250h250v94H527v250h-94Z"/>
            </svg>
            <span className="text-white">Add a Comment</span>
          </button> :
          <Link to="/login">
            <button className="flex items-center justify-center bg-lime-500 rounded-xl hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[18rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ handleButtonPress }>
              <span className="text-white">Login to add a Comment</span>
            </button>
          </Link>
          }
      </div>
      }
    </>
  )
}
