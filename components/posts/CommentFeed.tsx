import CommentItem from './CommentItem'; // Importing the CommentItem component

// Define the interface for the props
interface CommentFeedProps {
  comments?: Record<string, any>[]; // Optional prop 'comments' which is an array of objects
}

// Functional component CommentFeed definition
const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        // Rendering CommentItem for each comment in the comments array
        <CommentItem key={comment.id} data={comment} /> // Using comment.id as the key for each item
      ))}
    </>
  );
};

// Exporting CommentFeed component as default
export default CommentFeed;
