// Importing the useSWR hook from the swr library for data fetching
import useSWR from "swr";

// Importing a custom fetcher function to handle API requests
import fetcher from "@/libs/fetcher";

// Defining a custom hook to fetch a user's data based on their userId
const useUser = (userId: string) => {
  // Using the useSWR hook to fetch data from the API endpoint for a specific user
  // If the userId is present, it forms the API endpoint `/api/users/${userId}`
  // If no userId is provided, it returns null and the request is not made
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  // Returning an object with the data, error status, loading state, and a mutate function
  return {
    data, // The user data fetched from the API
    error, // Any error that occurred during the fetch process
    isLoading, // A boolean indicating if the data is being fetched
    mutate, // A function that can be used to re-fetch the data
  };
};

// Exporting the custom useUser hook for use in other components
export default useUser;
