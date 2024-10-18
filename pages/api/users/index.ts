import { NextApiRequest, NextApiResponse } from "next"; // Import types for API requests and responses
import prisma from "@/libs/prismadb"; // Import Prisma client to interact with the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET method. If not, return 405 Method Not Allowed.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Fetch all users from the database, ordered by creation date descending
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc", // Order users by createdAt field in descending order
      },
    });

    // Respond with the list of users and a 200 OK status
    return res.status(200).json(users);
  } catch (error) {
    console.log(error); // Log any errors that occur
    return res.status(400).end(); // Return a 400 Bad Request response in case of errors
  }
}
