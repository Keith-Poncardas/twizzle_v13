import { NextApiRequest, NextApiResponse } from "next"; // Import types for API request and response handling in Next.js
import prisma from "@/libs/prismadb"; // Import the Prisma client to interact with the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET; if not, return a 405 Method Not Allowed status.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Extract the postId from the query parameters.
    const { postId } = req.query;

    // Validate the postId: it must exist and be a string.
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID"); // Throw an error if the postId is invalid.
    }

    // Find the post by its ID, and include related user and comments data.
    const post = await prisma.post.findUnique({
      where: {
        id: postId, // Search for the post with the given postId.
      },
      include: {
        user: true, // Include the user who created the post.
        comments: {
          include: {
            user: true, // Include the user information for each comment.
          },
          orderBy: {
            createdAt: "desc", // Order comments by creation date in descending order (newest first).
          },
        },
      },
    });

    // Return the post data as a JSON response with a 200 OK status.
    return res.status(200).json(post);
  } catch (error) {
    // Log the error to the console for debugging.
    console.log(error);

    // If an error occurs, return a 400 Bad Request status.
    return res.status(400).end();
  }
}
