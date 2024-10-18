// Importing the useSWR hook from the swr library for data fetching
import useSWR from "swr";

// Importing the fetcher function for making API requests
import fetcher from "@/libs/fetcher";

// Defining a custom hook to fetch posts, optionally filtered by user ID
const usePosts = (userId?: string) => {
  // Constructing the URL based on whether a userId is provided
  // If userId is provided, use it to filter posts by that user; otherwise, fetch all posts
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  // Using the useSWR hook to fetch data from the constructed URL
  // The fetcher function is used to handle the actual API request and response
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  // Returning an object containing the fetched data, error status, loading state, and mutate function
  return {
    data, // The data returned from the API request (the list of posts)
    error, // Any error that occurred during the fetch process
    isLoading, // A boolean indicating if the data is currently being loaded
    mutate, // A function to trigger a re-fetch of the data, useful for refreshing the data
  };
};

// Exporting the usePosts hook as the default export, making it available for use in other components or modules
export default usePosts;
