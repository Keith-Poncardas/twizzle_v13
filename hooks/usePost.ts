// Importing the useSWR hook from the swr library for data fetching
import useSWR from "swr";

// Importing the fetcher function for making API requests
import fetcher from "@/libs/fetcher";

// Defining a custom hook to fetch a specific post by its ID
const usePost = (postId: string) => {
  // Using the useSWR hook to fetch data from the specific post API endpoint
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  // Returning an object containing the fetched data, error status, loading state, and mutate function
  return {
    data, // The data returned from the API request (the post information)
    error, // Any error that occurred during the fetch
    isLoading, // A boolean indicating if the data is currently being loaded
    mutate, // A function to trigger a re-fetch of the data
  };
};

// Exporting the usePost hook as the default export
export default usePost;
