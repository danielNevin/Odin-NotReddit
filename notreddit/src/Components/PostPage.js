import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { db } from "../config/firestore";
import { useParams } from "react-router-dom";

export default function PostPage() {

  const { id } = useParams();
  
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState([]);

  const getPageData = async () => {
    const docRef = doc(db, "Posts", `${id}`);
    const docSnap = await getDoc(docRef);
    const data = { id: docSnap.id, ...docSnap.data() };
    setPostData(data);
    getComments(data.id);
  }

  const getComments = async (postId) => {
    const querySnapshot = await getDocs(collection(db, "Posts", postId, "comments"));
    const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
    setComments(data);
  };

  const commentCards = comments?.map((comment, index) => {
    return <CommentCard key={index} content={comment.content} creationDate={comment.creationDate} score={comment.score} user={comment.user}/>
  });

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <div id="container" className="flex flex-col gap-4 p-4 bg-stone-100 justify-center items-center">
      {postData && <PostCard title={postData.title} creationDate={postData.creationDate} text={postData.text} imageLink={postData.imageLink} postLink={postData.postLink} score={postData.score} user={postData.user} commentsCount={postData.commentsCount}/>}
      <AddComment/>
      { comments && commentCards}
    </div>
  )
}