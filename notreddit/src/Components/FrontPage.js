// Importing Dependencies and necessary Components 
import React, { useEffect, useState } from "react";
import FilterPosts from "./FilterPosts";
import CreatePost from "./CreatePost";
import Header from "./Header";
import PostScoreAuth from "./PostScoreAuth";
import PostCardContentFrontPage from "./PostCardContentFrontPage";
import BackToTopButton from "./BackToTopButton";
import PostScoreNoAuth from "./PostScoreNoAuth";
import { auth } from "../config/firestore";
import About from "./About";
import { Link } from "react-router-dom";

export default function FrontPage(props) {

  // State variable to store the posts
  const [posts, setPosts] = useState([]);

  // Function to handle the preliminary render
  const handleFilterRender = (postsArray) => {
    const sortedArray = [...postsArray].sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }

  // Event handler for the top filter click
  const handleFilterTop = () => {
    const sortedArray = [...posts].sort((a, b) => {
      if (a.score > b.score) {
        return -1
      } else if (a.score < b.score) {
        return 1
      } else {
        return 0
      }
    });
    setPosts(sortedArray);
  }

  // Event handler for the new filter click
  const handleFilterNew = () => {
    const sortedArray = [...posts].sort((a, b) => b.creationDate - a.creationDate);
    setPosts(sortedArray);
  }

  // Event handler for the old filter click
  const handleFilterOld = () => {
    const sortedArray = [...posts].sort((a, b) => a.creationDate - b.creationDate);
    setPosts(sortedArray);
  }

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  useEffect(() => {
    document.title = 'NotReddit';
  }, [])

  // Create post cards based on the posts data
  const postCards = posts?.map((post, index) => {
    return(
      <div id="container" key={ index } className="flex px-4 py-2 gap-4 w-[40rem] rounded-md border bg-white shadow-md hover:shadow-lg hover:translate-y-[-3px] transition-all">
        <div id="score">
          { auth.currentUser ? <PostScoreAuth posts={ posts } score={ post.score } votes={ post.votes } id={ post.id }/> : <PostScoreNoAuth score={ post.score }/> }
        </div>
        <Link to={`/post/${ post.id }`}>
          <PostCardContentFrontPage id={ post.id } title={ post.title } creationDate={ post.creationDate } text={ post.text } imageLink={ post.imageLink } postLink={ post.postLink } score={ post.score } user={ post.user } commentsCount={ post.commentsCount } />
        </Link>
      </div> 
    ) 
  })

  // Loading Spinner
  const loadingSpin = (
    <div role="status" className="min-h-screen min-w-full flex items-center justify-center">
      <div className="rounded-full bg-white shadow-lg">
        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-lime-500 p-4" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    </div>
  )

  return (
    <>
      {props.isLoading ? 
      loadingSpin
      :
      <div id="container" className="flex flex-col gap-4 bg-stone-100 items-center min-h-screen overflow-x-hidden pb-4">
        <Header posts={ posts }/>
        <div className="grid grid-cols-9 gap-4 w-[60rem]">
          <div className="flex flex-col col-span-6 gap-4 items-center">
            <CreatePost/>
            <FilterPosts handleFilterTop={ handleFilterTop } handleFilterNew={ handleFilterNew } handleFilterOld={ handleFilterOld }/>
            { postCards }
            <BackToTopButton/>
          </div>
          <div className="flex flex-col col-span-3">
            <About/>
          </div>
        </div>
      </div>
      }
    </>
  );
}
