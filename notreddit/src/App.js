import React, { useEffect, useState } from "react";
import { Route, Routes, UNSAFE_RouteContext } from "react-router-dom";  
import { getDocs, collection } from "@firebase/firestore";
import { db } from "./config/firestore";
import PostCard from "./Components/PostCard";
import FilterPosts from "./Components/FilterPosts";
import CreatePost from "./Components/CreatePost";
import AddComment from "./Components/AddComment";
import PostPage from "./Components/PostPage";
import FrontPage from "./Components/FrontPage";

function App() {

  // const [posts, setPosts] = useState()

  // const getPosts = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Posts"));
  //   const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //   setPosts(data);
  // };

  // const fetchPostComments = async (post) => {
  //   const querySnapshot = await getDocs(collection(db, "Posts", post.id, "comments"));
  //   const commentsCount = querySnapshot.size;
  //   return { ...post, commentsCount };
  // };

  // const fetchCommentsForPosts = async () => {
  //   const updatedPosts = await Promise.all(posts.map(fetchPostComments));
  //   setPosts(updatedPosts);
  // };

  // useEffect(() => {
  //   getPosts();
  //   if (posts) {
  //     fetchCommentsForPosts();
  //   }
  // }, []);

  // const postCards = posts?.map((post, index) => {
  //   return <PostCard key={index} id={post.id} title={post.title} creationDate={post.creationDate} text={post.text} imageLink={post.imageLink} postLink={post.postLink} score={post.score} user={post.user} commentsCount={post.commentsCount}/>
  // })

  return (

    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
    
    // <div id="container" className="flex flex-col gap-4 p-4 bg-slate-200 justify-center items-center">
    //   <CreatePost/>
    //   <AddComment/>
    //   <FilterPosts/>
    //   {posts && postCards}
    // </div>
  );
}

export default App;
