// Importing Dependencies and necessary Components 
import PostScoreAuth from "../Score/PostScoreAuth";
import PostScoreNoAuth from "../Score/PostScoreNoAuth";
import PostCardContent from "./PostCardContent";


export default function PostCard(props) {

  return (
    <div id="container" className="flex px-4 py-2 gap-4 w-[40rem] bg-white transition-all">
      <div id="score">
        { props.user ? <PostScoreAuth score={ props.score } votes={ props.votes } id={ props.id }/> : <PostScoreNoAuth score={ props.score }/> }
      </div>
      <PostCardContent id={ props.id } title={ props.title } creationDate={ props.creationDate } text={ props.text } imageLink={ props.imageLink } postLink={ props.postLink } score={ props.score } user={ props.user } commentsCount={ props.commentsCount }/>
    </div>
  )
}