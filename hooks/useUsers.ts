// Importing the useSWR hook from the swr library for data fetching
import useSWR from "swr";

// Importing a custom fetcher function to handle API requests
import fetcher from "@/libs/fetcher";

// Defining a custom hook to fetch all users
const useUsers = () => {
  // Using the useSWR hook to fetch data from the API endpoint for all users
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  // Returning the fetched data, error status, loading state, and a mutate function
  return {
    data, // The list of users fetched from the API
    error, // Any error that occurred during the fetch process
    isLoading, // A boolean indicating if the data is being fetched
    mutate, // A function that can be used to re-fetch the data
  };
};

// Exporting the custom useUsers hook for use in other components
export default useUsers;
