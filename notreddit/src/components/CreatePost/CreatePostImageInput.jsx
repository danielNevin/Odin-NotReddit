
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCreatePost } from "../../hooks/usePosts";

export default function CreatePostImageInput(props) {

  const { user } = useAuth();
  const { submitPost, loading } = useCreatePost();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handlePost = async () => {
    await submitPost(user.id, 'image', title, { imageLink: link });
    props.handleCancelClick();
  }; 

  return (
    <form id="imageInput" className="flex flex-col p-4 gap-4">
      {/* Input field for the post title */}
      <input type="text" name="title" placeholder="Title" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={ title } onChange={ (e) => setTitle(e.target.value) }/>
      {/* Input field for the image link */}
      <input type="text" name="content" placeholder="Your Image URL" className="px-4 h-10 shadow-inner bg-stone-50 hover:bg-stone-100 rounded-full focus:outline-none focus:outline-lime-500 transition-all" value={ link } onChange={ (e) => setLink(e.target.value) }/>
      <div id="submission" className="flex p-2 gap-4 justify-end">
        {/* "Post" button */}
        <button class="bg-lime-500 hover:text-xl hover:rounded hover:bg-lime-600 text-white w-[6rem] h-[2.5rem] rounded-xl transition-all" type="button" onClick={ handlePost } disabled={ loading }>
          Post
        </button>
        {/* "Cancel" button */}
        <button class="flex items-center justify-center bg-red-500 rounded-xl hover:text-xl hover:rounded hover:bg-red-600 text-white w-[6rem] h-[2.5rem] gap-2 px-2 transition-all" type="button" onClick={ props.handleCancelClick }>
          Cancel
        </button>
      </div>
    </form>
  )
}
