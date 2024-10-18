import axios from "axios"; // Importing Axios for making HTTP requests.
import { useCallback, useMemo } from "react"; // Importing React hooks to optimize performance.
import { toast } from "react-hot-toast"; // Importing toast notifications for success/error feedback.

import useCurrentUser from "./useCurrentUser"; // Custom hook to get the current user.
import useLoginModal from "./useLoginModal"; // Custom hook to manage the login modal.
import useUser from "./useUser"; // Custom hook to fetch a specific user's data.

const useFollow = (userId: string) => {
  // Destructuring current user data and the function to mutate it (refresh) from the custom hook.
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // Getting a mutation function for updating the fetched user data by userId.
  const { mutate: mutateFetchedUser } = useUser(userId);

  // Getting the login modal handler.
  const loginModal = useLoginModal();

  // useMemo hook to memoize the check if the current user is following the given user.
  const isFollowing = useMemo(() => {
    // Get the list of user IDs the current user is following.
    const list = currentUser?.followingIds || [];

    // Check if the given userId is in the list.
    return list.includes(userId);
  }, [currentUser, userId]); // Dependencies: currentUser and userId.

  // useCallback hook to handle the follow/unfollow action.
  const toggleFollow = useCallback(async () => {
    // If there's no current user (not logged in), open the login modal.
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      // If already following, prepare the DELETE request to unfollow the user.
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      }
      // If not following, prepare the POST request to follow the user.
      else {
        request = () => axios.post("/api/follow", { userId });
      }

      // Execute the follow/unfollow request.
      await request();
      // Refresh the current user data after following/unfollowing.
      mutateCurrentUser();
      // Refresh the fetched user data (to update the UI).
      mutateFetchedUser();

      // Show success notification using toast.
      toast.success("Success");
    } catch (error) {
      // If an error occurs, show an error notification using toast.
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);
  // Dependencies: currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal.

  // Returning the `isFollowing` boolean and the `toggleFollow` function.
  return {
    isFollowing, // Whether the current user is following the given user.
    toggleFollow, // Function to follow/unfollow the user.
  };
};

export default useFollow; // Exporting the custom hook for use in other components.
