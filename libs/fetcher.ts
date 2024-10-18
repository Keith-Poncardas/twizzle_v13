// Importing the axios library for making HTTP requests
import axios from "axios";

// Defining a fetcher function that takes a URL as a parameter
const fetcher = (url: string) =>
  // Making a GET request to the specified URL using axios
  axios
    .get(url)
    // Returning the data from the response
    .then((res) => res.data);

// Exporting the fetcher function as the default export
export default fetcher;
