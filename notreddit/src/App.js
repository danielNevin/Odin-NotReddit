import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";  
import PostPage from "./Components/PostPage";
import FrontPage from "./Components/FrontPage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firestore";
import { getDocs, collection } from "firebase/firestore";
import _ from "lodash";
import { HashRouter as Router } from "react-router-dom";

function App() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    const queryPostSnapshot = await getDocs(collection(db, "Posts"));
    const postData = queryPostSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const queryVoteSnapshot = await getDocs(collection(db, "Votes"));
    const voteData = queryVoteSnapshot.docs.map(doc => ({ id: doc.id, votes: doc.data() }));
    for (let post of postData) {
      post.commentsCount = await fetchPostComments(post);
      for (let vote of voteData) {
        if (post.id === vote.id) {
          post.score = fetchPostScore(vote.votes);
          post.votes = vote.votes;
        }
      }
    }
    setPosts(postData);
    setIsLoading(false);
  };

  const fetchPostComments = async (object) => {
    const querySnapshot = await getDocs(collection(db, "Posts", object.id, "comments"));
    return querySnapshot.size;
  };

  const fetchPostScore = (obj) => {
    const values = Object.values(obj);
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return sum;
  }

  useEffect(() => {
    getPosts();
  },[])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("User is logged out")
      }
    });
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <FrontPage posts={ posts } isLoading={ isLoading }/> } />
        <Route path="/post/:id" element={ <PostPage posts={ posts } /> } />
        <Route path="/signup" element={ <SignUp/> }/>
        <Route path="/login" element={ <SignIn/> }/>
      </Routes>
    </Router>
  );
}

export default App;
