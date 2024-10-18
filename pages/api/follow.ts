// Import necessary types from Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Import Prisma client for database interactions
import prisma from "@/libs/prismadb";

// Import serverAuth for user authentication
import serverAuth from "@/libs/serverAuth";

// Define the API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is either POST or DELETE
  if (req.method !== "POST" && req.method !== "DELETE") {
    // If neither, respond with 405 Method Not Allowed
    return res.status(405).end();
  }

  try {
    // Destructure userId from the request body
    const { userId } = req.body;

    // Authenticate the current user
    const { currentUser } = await serverAuth(req);

    // Validate userId
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the user to be followed/unfollowed
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new Error("Invalid ID");
    }

    // Get the current following IDs, default to an empty array if none
    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    // Handle following a user
    if (req.method === "POST") {
      // Add the userId to the following list
      updatedFollowingIds.push(userId);

      // NOTIFICATION PART START
      try {
        // Create a notification for the user being followed
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        // Update the followed user to indicate they have a new notification
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    // Handle unfollowing a user
    if (req.method === "DELETE") {
      // Filter out the userId from the following list
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    // Update the current user's following IDs in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
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
