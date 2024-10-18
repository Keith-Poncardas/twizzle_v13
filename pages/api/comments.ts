import { NextApiRequest, NextApiResponse } from "next"; // Import types for API requests and responses
import serverAuth from "@/libs/serverAuth"; // Import authentication helper
import prisma from "@/libs/prismadb"; // Import Prisma client to interact with the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method. If not, return 405 Method Not Allowed.
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    // Authenticate the user making the request
    const { currentUser } = await serverAuth(req);
    const { body } = req.body; // Get the comment body from the request body
    const { postId } = req.query; // Get the post ID from query parameters

    // Validate the post ID
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // Create the comment in the database
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id, // Associate comment with the current user
        postId, // Associate comment with the specified post
      },
    });

    // NOTIFICATION PART START
    try {
      // Find the post to notify the author
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      // If the post exists and has a user ID, send a notification
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied on your tweet!", // Notification message
            userId: post.userId, // Notify the post author
          },
        });

        // Update user's notification status
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true, // Mark that the user has a new notification
          },
        });
      }
    } catch (error) {
      console.log(error); // Log any errors during notification creation
    }
    // NOTIFICATION PART END

    // Respond with the created comment
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error); // Log any errors that occur
    return res.status(400).end(); // Return a 400 Bad Request response in case of errors
  }
}
