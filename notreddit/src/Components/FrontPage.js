import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";  
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../config/firestore";
import PostCardFrontPage from "./PostCardFrontPage";
import FilterPosts from "./FilterPosts";
import CreatePost from "./CreatePost";
import AddComment from "./AddComment";
import PostPage from "./PostPage";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function FrontPage() {

  const [posts, setPosts] = useState()

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  const fetchPostComments = async (post) => {
    const querySnapshot = await getDocs(collection(db, "Posts", post.id, "comments"));
    const commentsCount = querySnapshot.size;
    return { ...post, commentsCount };
  };

  const fetchCommentsForPosts = async () => {
    const updatedPosts = await Promise.all(posts.map(fetchPostComments));
    setPosts(updatedPosts);
  };

  useEffect(() => {
    getPosts();
    if (posts) {
      fetchCommentsForPosts();
    }
  }, []);

  const postCards = posts?.map((post, index) => {
    return(
      <Link to={`/post/${post.id}`}>
        <PostCardFrontPage key={index} id={post.id} title={post.title} creationDate={post.creationDate} text={post.text} imageLink={post.imageLink} postLink={post.postLink} score={post.score} user={post.user} commentsCount={post.commentsCount}/> 
      </Link>
    ) 
  })

  return (
    <div id="container" className="flex flex-col gap-4 p-4 bg-stone-100 items-center min-h-screen">
      <Header/>
      <CreatePost/>
      <FilterPosts/>
      { postCards }
    </div>
  );
}
