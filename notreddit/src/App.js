// Importing Dependencies and necessary Components
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
  // State declarations
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch posts and their associated data
  const getPosts = async () => {
    // Fetch posts from the "Posts" collection in Firestore
    const queryPostSnapshot = await getDocs(collection(db, "Posts"));
    // Extract post data from the query result
    const postData = queryPostSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Fetch votes from the "Votes" collection in Firestore
    const queryVoteSnapshot = await getDocs(collection(db, "Votes"));
    // Extract vote data from the query result
    const voteData = queryVoteSnapshot.docs.map((doc) => ({ id: doc.id, votes: doc.data() }));

    // Iterate through each post and add comment counts
    for (let post of postData) {
      // Fetch the number of comments for each post
      post.commentsCount = await fetchPostComments(post);

      // Find the corresponding vote data for each post
      for (let vote of voteData) {
        if (post.id === vote.id) {
          // Calculate the score for each post based on the sum of the votes
          post.score = fetchPostScore(vote.votes);
          post.votes = vote.votes;
        }
      }
    }

    // Update the state with the fetched posts and associated data
    setPosts(postData);
    setIsLoading(false);
  };

  // Function to fetch the number of comments for a post
  const fetchPostComments = async (object) => {
    // Fetch the comments collection for a specific post from Firestore
    const querySnapshot = await getDocs(collection(db, "Posts", object.id, "comments"));
    // Return the size (number of documents) in the query result, which represents the number of comments
    return querySnapshot.size;
  };

  // Function to calculate the score for a post based on the sum of its votes
  const fetchPostScore = (obj) => {
    // Get the values of the votes object
    const values = Object.values(obj);
    // Calculate the sum of the vote values using lodash's reduce function
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return sum;
  };

  // Fetch posts and associated data when the component mounts
  useEffect(() => {
    getPosts();
  }, []);

  // Listen for changes in the authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        // ...
        console.log("uid:", uid);
      } else {
        // User is signed out
        // ...
        console.log("User is logged out");
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage posts={posts} isLoading={isLoading} />} />
        <Route path="/post/:id" element={<PostPage posts={posts} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
