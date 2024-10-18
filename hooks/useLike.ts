import axios from "axios"; // Importing Axios for making HTTP requests.
import { useCallback, useMemo } from "react"; // Importing React hooks for memoization and performance optimization.
import { toast } from "react-hot-toast"; // Importing toast for showing notifications.

import useCurrentUser from "./useCurrentUser"; // Custom hook to get the current logged-in user.
import useLoginModal from "./useLoginModal"; // Custom hook to manage the login modal state.
import usePost from "./usePost"; // Custom hook to get data for a specific post.
import usePosts from "./usePosts"; // Custom hook to get all posts (or filtered by user).

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  // Getting the current user data from the custom hook.
  const { data: currentUser } = useCurrentUser();
  // Getting the specific post data and a mutate function to update it.
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  // Getting the mutate function for updating the posts list (to reflect likes/unlikes).
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  // Access the login modal state handler.
  const loginModal = useLoginModal();

  // Memoize the check if the post is liked by the current user.
  const hasLiked = useMemo(() => {
    // Extract the list of users who liked the post.
    const list = fetchedPost?.likedIds || [];

    // Check if the current user's ID is in the likedIds list.
    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]); // Dependencies: fetchedPost and currentUser.

  // useCallback hook to handle the like/unlike functionality.
  const toggleLike = useCallback(async () => {
    // If the user is not logged in, show the login modal.
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      // If the post is already liked, prepare the DELETE request to unlike the post.
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      }
      // If the post is not liked yet, prepare the POST request to like the post.
      else {
        request = () => axios.post("/api/like", { postId });
      }

      // Execute the like/unlike request.
      await request();
      // Mutate the post to update the UI for the specific post.
      mutateFetchedPost();
      // Mutate the posts list to update the like count or status.
      mutateFetchedPosts();

      // Show a success notification using toast.
      toast.success("Success");
    } catch (error) {
      // If an error occurs, show an error notification using toast.
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
    loginModal,
  ]);
  // Dependencies: currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal.

  // Returning the `hasLiked` boolean and the `toggleLike` function for use in components.
  return {
    hasLiked, // Boolean indicating if the current user has liked the post.
    toggleLike, // Function to toggle like/unlike for the post.
  };
};

export default useLike; // Exporting the custom hook for use in other components.
