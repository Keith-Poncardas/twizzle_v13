import useSWR from "swr"; // Importing SWR for data fetching.
import fetcher from "@/libs/fetcher"; // Importing a custom fetcher function for handling API requests.

const useNotifications = (userId?: string) => {
  // If userId is provided, construct the API URL; otherwise, set the URL to null (prevents fetching).
  const url = userId ? `/api/notifications/${userId}` : null;

  // Using the SWR hook to fetch data, handle errors, and manage loading state.
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  // Returning the fetched data, any errors, loading state, and the mutate function for refreshing the data.
  return {
    data, // The fetched notifications data.
    error, // Any error that occurred during the fetching process.
    isLoading, // A boolean indicating whether the data is currently being loaded.
    mutate, // A function to trigger re-fetching of the data (useful for updating the data manually).
  };
};

export default useNotifications; // Exporting the custom hook to be used in other components.
