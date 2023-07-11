// Importing necessary dependencies and components
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Header from "./Header";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firestore";
import { useParams } from "react-router-dom";
import FilterComments from "./FilterComments";
import BackToTopButton from "./BackToTopButton";

export default function PostPage(props) {

  // Extracting the "id" parameter from the URL using the useParams hook from react-router-dom.
  const { id } = useParams();
  
  // State variables to store data and manage component state.
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch the page data asynchronously.
  const getPageData = async () => {
    try {
      // Fetching the post document.
      const docSnapPost = await getDoc(doc(db, "Posts", `${id}`));
      const postDoc = { id: docSnapPost.id, ...docSnapPost.data() };

      // Fetching the vote document.
      const docSnapVote = await getDoc(doc(db, "Votes", `${id}`));
      const voteDoc = { id: docSnapVote.id, votes: docSnapVote.data() };

      // Updating the post data with additional fields.
      postDoc.commentsCount = await fetchPostComments(postDoc);
      postDoc.score = fetchPostScore(voteDoc.votes);
      postDoc.votes = voteDoc.votes;

      // Setting the post data and fetching the comments.
      setPostData(postDoc);
      await getComments(postDoc.id);

      // Setting the loading state to false.
      setIsLoading(false);

      console.log(postDoc);
      console.log(comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to calculate the total score of a post based on vote data.
  const fetchPostScore = (obj) => {
    const values = Object.values(obj);
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return sum;
  }

  // Function to fetch the number of comments for a post.
  const fetchPostComments = async (object) => {
    const querySnapshot = await getDocs(collection(db, "Posts", object.id, "comments"));
    return querySnapshot.size;
  };

  // Function to fetch the comments for a post.
  const getComments = async (postId) => {
    const querySnapshotComments = await getDocs(collection(db, "Posts", postId, "comments"));
    const commentData = querySnapshotComments.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const queryVoteSnapshot = await getDocs(collection(db, "Posts", postId, "commentVotes"));
    const voteData = queryVoteSnapshot.docs.map(doc => ({ id: doc.id, votes: doc.data() }));

    for (let comment of commentData) {
      for (let vote of voteData) {
        if (comment.id === vote.id) {
          comment.score = fetchCommentScore(vote.votes);
          comment.votes = vote.votes;
        }
      }
    }

    setComments(commentData);
    console.log(comments);
  }

  // Function to calculate the total score of a comment based on vote data.
  const fetchCommentScore = (obj) => {
    const values = Object.values(obj);
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return sum;
  }

  // Function to fetch the votes for a comment.
  const getCommentVotes = async(commentId, postId) => {
    const querySnapshotVotes = await getDocs(collection(db, "Posts", postId, "comments", commentId, "voteDocs"));
    const voteData = querySnapshotVotes.docs.map(doc => ({ ...doc.data() }));
    return voteData;
  }

  // Event handler functions for filtering comments.
  const handleFilterTop = () => {
    const sortedArray = [...comments].sort((a, b) => b.score - a.score);
    setComments(sortedArray);
  }

  const handleFilterNew = () => {
    const sortedArray = [...comments].sort((a, b) => b.creationDate - a.creationDate);
    setComments(sortedArray);
  }

  const handleFilterOld = () => {
    const sortedArray = [...comments].sort((a, b) => a.creationDate - b.creationDate);
    setComments(sortedArray);
  }

  // Generating CommentCard components based on the comment data.
  const commentCards = comments?.map((comment, index) => {
    return <CommentCard key={index} content={ comment.content } creationDate={ comment.creationDate } score={ comment.score } user={ comment.user } id={ postData.id } votes={ comment.votes } commentId={ comment.id }/>
  })

  // Fetching page data and setting the document title on component mount.
  useEffect(() => {
    getPageData();
    document.title = 'NotReddit';
  }, [])

  // Updating the posts state when the props.posts value changes.
  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  // Loading Spinner
  if (isLoading) {
    return (
      <div role="status" className="min-h-screen min-w-full flex items-center justify-center">
        <div className="rounded-full bg-white shadow-lg">
          <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-lime-500 p-4" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <>
      <div id="container" className="flex flex-col gap-4 bg-stone-100 items-center min-h-screen p-0 overflow-x-hidden">
        <Header posts={ posts }/>
        <div id="post-container" className="flex flex-col gap-4 bg-white items-start p-4 rounded shadow-md border mb-4">
          {postData && <PostCard title={ postData.title } id={ postData.id } creationDate={ postData.creationDate } text={ postData.text } imageLink={ postData.imageLink } postLink={ postData.postLink } score={ postData.score } user={ postData.user } commentsCount={ postData.commentsCount } votes={ postData.votes }/>}
          <FilterComments handleFilterTop={ handleFilterTop } handleFilterNew={ handleFilterNew } handleFilterOld={ handleFilterOld }/>
          <AddComment postid={ id } comments={ comments } setComments={ setComments }/>
          { comments && commentCards }
          <div className="flex items-center justify-center w-[40rem]">
            <BackToTopButton/>
          </div>
        </div>
      </div>
    </>
  )
}