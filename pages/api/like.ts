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
    // Destructure postId from the request body
    const { postId } = req.body;

    // Authenticate the current user
    const { currentUser } = await serverAuth(req);

    // Validate postId
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the post that the user wants to like/unlike
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // Check if the post exists
    if (!post) {
      throw new Error("Invalid ID");
    }

    // Get the current liked IDs, default to an empty array if none
    let updatedLikedIds = [...(post.likedIds || [])];

    // Handle liking a post
    if (req.method === "POST") {
      // Add the current user ID to the liked IDs
      updatedLikedIds.push(currentUser.id);

      // NOTIFICATION PART START
      try {
        // Check if the post has a user associated with it
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        // If the post has a user ID, create a notification
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your tweet!",
              userId: post.userId,
            },
          });

          // Update the user to indicate they have a new notification
          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    // Handle unliking a post
    if (req.method === "DELETE") {
      // Filter out the current user ID from the liked IDs
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser?.id
      );
    }

    // Update the post with the new liked IDs in the database
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    // Respond with the updated post data
    return res.status(200).json(updatedPost);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
    // Respond with a 400 Bad Request status for any errors encountered
    return res.status(400).end();
  }
}
