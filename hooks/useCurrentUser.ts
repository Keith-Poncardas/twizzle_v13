// Importing the useSWR hook from the swr library for data fetching
import useSWR from "swr";

// Importing the fetcher function for making API requests
import fetcher from "@/libs/fetcher";

// Defining a custom hook to fetch the current user
const useCurrentUser = () => {
  // Using the useSWR hook to fetch data from the '/api/current' endpoint
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  // Returning an object containing the fetched data, error status, loading state, and mutate function
  return {
    data, // The data returned from the API request
    error, // Any error that occurred during the fetch
    isLoading, // A boolean indicating if the data is currently being loaded
    mutate, // A function to trigger a re-fetch of the data
  };
};

// Exporting the useCurrentUser hook as the default export
export default useCurrentUser;
