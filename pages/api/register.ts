// Importing the necessary libraries
import bcrypt from "bcrypt"; // Importing bcrypt for hashing passwords
import { NextApiRequest, NextApiResponse } from "next"; // Importing types for Next.js API request and response
import prisma from "@/libs/prismadb"; // Importing the Prisma client to interact with the database

// Define the API handler function for user registration
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    // If not, respond with a 405 Method Not Allowed status
    return res.status(405).end();
  }

  try {
    // Destructure the required fields from the request body
    const { email, username, name, password } = req.body;

    // Hash the password using bcrypt, with a salt round of 12
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database using Prisma
    const user = await prisma.user.create({
      data: {
        email, // User's email
        username, // User's username
        name, // User's name
        hashedPassword, // Hashed password for secure storage
      },
    });

    // Respond with the created user object, omitting the hashed password for security
    return res.status(200).json(user);
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Respond with a 400 Bad Request status for any encountered errors
    return res.status(400).end();
  }
}
