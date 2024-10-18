// Import necessary types from Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Import serverAuth for user authentication
import serverAuth from "@/libs/serverAuth";

// Import Prisma client for database interactions
import prisma from "@/libs/prismadb";

// Define the API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is PATCH
  if (req.method !== "PATCH") {
    // If not PATCH, respond with 405 Method Not Allowed
    return res.status(405).end();
  }

  try {
    // Authenticate the current user
    const { currentUser } = await serverAuth(req);

    // Destructure fields from the request body
    const { name, username, bio, profileImage, coverImage } = req.body;

    // Validate required fields
    if (!name || !username) {
      throw new Error("Missing fields");
    }

    // Update user information in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id, // Find user by their ID
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    // Respond with the updated user data
    return res.status(200).json(updatedUser);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
    // Respond with a 400 Bad Request status for any errors encountered
    return res.status(400).end();
  }
}
