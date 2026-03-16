// Importing necessary dependencies and components
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard/PostCard";
import CommentCard from "../components/Comment/CommentCard";
import AddComment from "../components/Comment/AddComment";
import PostPageHeader from "../components/Headers/PostPageHeader";
import { useParams } from "react-router-dom";
import FilterComments from "../components/UI/FilterComments";
import BackToTopButton from "../components/UI/BackToTopButton";
import { usePostsById } from "../hooks/usePosts";
import { useComments } from "../hooks/useComments";

export default function PostPage(props) {
 
  // Extracting the "id" parameter from the URL using the useParams hook from react-router-dom.
  const { id } = useParams();

  // Fetch post and associated data when the component mounts
  const { posts: postData, loading: postLoading, error: postError } = usePostsById(id);
  const { comments, loading: commentsLoading, refetch } = useComments(id);

  // Create bucket for sorted comments
  const [sortedComments, setSortedComments] = useState([]);

  // Passthrough User
  const user = props.user

  // Event handler functions for filtering comments.
  const handleFilterTop = () => {
    setSortedComments([...sortedComments].sort((a, b) => b.score - a.score));
  }

  const handleFilterNew = () => {
    setSortedComments([...sortedComments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  }

  const handleFilterOld = () => {
    setSortedComments([...sortedComments].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
  }

  // Generating CommentCard components based on the comment data.
  const commentCards = sortedComments?.map((comment, index) => {
    return <CommentCard key={comment.id} content={ comment.content } creationDate={ comment.created_at } score={ comment.score } poster={ comment.author_name } id={ postData.id } commentId={ comment.id }/>
  })

  // Seed sortedComments when hook data loads
  useEffect(() => {
    setSortedComments(comments);
  }, [comments])

  // Fetching page data and setting the document title on component mount.
  useEffect(() => {
    if (postData?.title) document.title = postData.title;
  }, [postData])

  // Loading Spinner
  if (postLoading || commentsLoading) {
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
        <PostPageHeader user={ user }/>
        <div id="post-container" className="flex flex-col gap-4 bg-white items-start p-4 rounded shadow-md border mb-4">
          {postData && <PostCard title={ postData.title } id={ postData.id } creationDate={ postData.created_at } text={ postData.post_text } imageLink={ postData.post_image_link } postLink={ postData.post_link } score={ postData.score } user={ postData.author_name } commentsCount={ postData.comment_count }/>}
          <FilterComments handleFilterTop={ handleFilterTop } handleFilterNew={ handleFilterNew } handleFilterOld={ handleFilterOld }/>
          <AddComment user={ user } postId={ id } onCommentAdd={ refetch }/>
          { comments && commentCards }
          <div className="flex items-center justify-center w-[40rem]">
            <BackToTopButton/>
          </div>
        </div>
      </div>
    </>
  )
}