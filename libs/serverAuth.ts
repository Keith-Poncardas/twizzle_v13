// Importing NextApiRequest type from Next.js for type checking the request object
import { NextApiRequest } from "next";
// Importing getSession function from next-auth/react to retrieve session information
import { getSession } from "next-auth/react";

// Importing the Prisma client instance from the prisma database library
import prisma from "@/libs/prismadb";

// Defining the serverAuth function that checks the user's authentication status
const serverAuth = async (req: NextApiRequest) => {
  // Getting the session object from the request using getSession
  const session = await getSession({ req });

  // Checking if the session exists and if the user's email is present
  if (!session?.user?.email) {
    // Throwing an error if the user is not signed in
    throw new Error("Not signed in");
  }

  // Querying the database to find the current user by their email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email, // Using the user's email from the session
    },
  });

  // Checking if the current user was found in the database
  if (!currentUser) {
    // Throwing an error if the user is not found
    throw new Error("Not signed in");
  }

  // Returning the currentUser object if authentication is successful
  return { currentUser };
};

// Exporting the serverAuth function as the default export
export default serverAuth;
