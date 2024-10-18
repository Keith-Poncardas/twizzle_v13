import { NextApiRequest, NextApiResponse } from "next"; // Import types for API requests and responses
import serverAuth from "@/libs/serverAuth"; // Import server-side authentication helper
import prisma from "@/libs/prismadb"; // Import Prisma client to interact with the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST and GET methods. Otherwise, return 405 Method Not Allowed.
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Handle POST request (for creating a post)
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req); // Authenticate the user
      const { body } = req.body; // Extract the post body from the request

      // Create a new post in the database
      const post = await prisma.post.create({
        data: {
          body, // The content of the post
          userId: currentUser.id, // Associate the post with the current authenticated user
        },
      });

      // Respond with the newly created post
      return res.status(200).json(post);
    }

    // Handle GET request (for fetching posts)
    if (req.method === "GET") {
      const { userId } = req.query; // Extract the userId from the query parameters

      console.log({ userId });

      let posts;

      // If a specific userId is provided, fetch posts only by that user
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId, // Filter by userId
          },
          include: {
            user: true, // Include the user who created the post
            comments: true, // Include comments on the post
          },
          orderBy: {
            createdAt: "desc", // Order posts by creation date in descending order
          },
        });
      } else {
        // If no userId is provided, fetch all posts
        posts = await prisma.post.findMany({
          include: {
            user: true, // Include the user who created the post
            comments: true, // Include comments on the post
          },
          orderBy: {
            createdAt: "desc", // Order posts by creation date in descending order
          },
        });
      }

      // Respond with the list of posts
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error); // Log any errors
    return res.status(400).end(); // Return a 400 Bad Request response in case of errors
  }
}
