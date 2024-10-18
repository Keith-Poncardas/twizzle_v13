import usePosts from '@/hooks/usePosts'; // Importing the custom hook to fetch posts

import PostItem from './PostItem'; // Importing the PostItem component

// Define the interface for the props
interface PostFeedProps {
  userId?: string; // Optional prop for the user ID
}

// Functional component PostFeed definition
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  // Using the usePosts hook to fetch posts, optionally filtered by userId
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        // Rendering each post with the PostItem component
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

// Exporting PostFeed component as default
export default PostFeed;
