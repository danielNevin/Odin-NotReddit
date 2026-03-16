import { useState, useEffect } from 'react'
import { getAllPosts, getPostById, createPost } from '../services/posts'

export function useAllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

export function usePostsById(postId) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPostById(postId)
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [postId])

  return { posts, loading, error }
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitPost = async (userId, postType, title, content) => {
    setLoading(true);
    setError(null);
    try {
      await createPost(userId, postType, title, content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitPost, loading, error };
}