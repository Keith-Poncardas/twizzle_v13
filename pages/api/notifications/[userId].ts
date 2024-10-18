import { NextApiRequest, NextApiResponse } from "next"; // Importing types for API request and response objects from Next.js.
import prisma from "@/libs/prismadb"; // Importing Prisma client to interact with the database.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensuring that only GET requests are allowed.
  if (req.method !== "GET") {
    return res.status(405).end(); // If the request method is not GET, return a 405 Method Not Allowed response.
  }

  try {
    // Extracting userId from the query parameters.
    const { userId } = req.query;

    // Validating userId: It must exist and be of type string.
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID"); // Throw an error if the userId is missing or invalid.
    }

    // Fetching all notifications for the specified user from the database, ordered by creation date in descending order.
    const notifications = await prisma.notification.findMany({
      where: {
        userId, // Matching notifications where the userId matches the provided value.
      },
      orderBy: {
        createdAt: "desc", // Ordering notifications by their creation time in descending order (most recent first).
      },
    });

    // Updating the user's `hasNotification` field to false, marking that notifications have been viewed.
    await prisma.user.update({
      where: {
        id: userId, // Identifying the user by their ID.
      },
      data: {
        hasNotification: false, // Setting the `hasNotification` field to false to indicate notifications have been acknowledged.
      },
    });

    // Sending the notifications back in the response with a 200 OK status.
    return res.status(200).json(notifications);
  } catch (error) {
    // Catching any errors and logging them for debugging.
    console.log(error);

    // Returning a 400 Bad Request status if an error occurs during execution.
    return res.status(400).end();
  }
}
