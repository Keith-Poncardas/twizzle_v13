// Import necessary types from Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Import the serverAuth function for user authentication
import serverAuth from "@/libs/serverAuth";

// Define the API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    // If not GET, respond with 405 Method Not Allowed
    return res.status(405).end();
  }

  try {
    // Call serverAuth to authenticate the user based on the request
    const { currentUser } = await serverAuth(req);

    // If authentication is successful, respond with the current user's information
    return res.status(200).json(currentUser);
  } catch (error) {
    // Log any errors that occur during authentication
    console.log(error);
    // Respond with a 400 Bad Request status for any errors encountered
    return res.status(400).end();
  }
}
