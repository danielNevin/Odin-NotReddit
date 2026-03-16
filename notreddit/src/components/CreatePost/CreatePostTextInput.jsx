// Importing Dependencies and necessary Components 
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCreatePost } from "../../hooks/usePosts";

export default function CreatePostTextInput(props) {

  const { user } = useAuth();
  const { submitPost, loading } = useCreatePost();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    await submitPost(user.id, 'text', title, { text: content });
    props.handleCancelClick();
  };

  return (
    <form id="postInput" className="flex flex-col p-4 gap-4">
      {/* Input field for the post title */}
      <input type="text" name="title" placeholder="Title" className="px-4 h-10 shadow-inner rounded-full bg-stone-50 hover:bg-stone-100 focus:outline-none focus:outline-lime-500 transition-all" value={ title } onChange={ (e) => setTitle(e.target.value) }/>
      {/* Textarea field for the post content */}
      <textarea type="text" name="content" placeholder="Your Text (optional)" className="p-4 h-[10rem] shadow-inner rounded-2xl bg-stone-50 hover:bg-stone-100 focus:outline-none focus:outline-lime-500 transition-all" value={ content } onChange={ (e) => setContent(e.target.value) }/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        {/* "Post" button */}
        <button className="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button" onClick={ handlePost } disabled={ loading }>
          Post
        </button>
        {/* "Cancel" button */}
        <button className="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ props.handleCancelClick }>
          Cancel
        </button>
      </div>
    </form>
  )
}
