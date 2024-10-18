// Importing necessary libraries and components
import { useRouter } from "next/router"; // Importing useRouter for accessing the router object and query parameters
import { ClipLoader } from "react-spinners"; // Importing a loading spinner component for indicating loading state

import usePost from "@/hooks/usePost"; // Importing the custom hook to fetch post data

import Header from "@/components/Header"; // Importing the Header component for page navigation
import Form from "@/components/Form"; // Importing the Form component for submitting comments
import PostItem from "@/components/posts/PostItem"; // Importing the PostItem component to display the post content
import CommentFeed from "@/components/posts/CommentFeed"; // Importing the CommentFeed component to display comments associated with the post

const PostView = () => {
  const router = useRouter(); // Using the router to access the current route and query parameters
  const { postId } = router.query; // Destructuring postId from the router query parameters

  // Using the usePost hook to fetch the post data by postId
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  // If the post is loading or not fetched, display a loading spinner
  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} /> {/* Loading spinner centered on the screen */}
      </div>
    )
  }

  return (
    <>
      {/* Rendering the Header component with a back arrow and label for the post view */}
      <Header showBackArrow label="Shout" />

      {/* Rendering the PostItem component with the fetched post data */}
      <PostItem data={fetchedPost} />

      {/* Rendering the Form component for submitting comments, passing the postId and a placeholder text */}
      <Form postId={postId as string} isComment placeholder="Shout your reply" />

      {/* Rendering the CommentFeed component to display the comments associated with the post */}
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}

export default PostView; // Exporting the PostView component as default
