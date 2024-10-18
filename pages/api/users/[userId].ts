import { NextApiRequest, NextApiResponse } from "next"; // Import types for API requests and responses
import prisma from "@/libs/prismadb"; // Import Prisma client to interact with the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET method. Otherwise, return 405 Method Not Allowed.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query; // Extract userId from the query parameters

    // Validate userId
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID"); // Throw error if userId is invalid
    }

    // Fetch the user details from the database
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId, // Find user by userId
      },
    });

    // Count the number of followers for the user
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId, // Count users who follow the specified userId
        },
      },
    });

    // Respond with the user details and followers count
    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error); // Log any errors
    return res.status(400).end(); // Return a 400 Bad Request response in case of errors
  }
}
