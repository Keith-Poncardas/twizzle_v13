import bcrypt from "bcrypt"; // Importing bcrypt for password hashing and comparison.
import NextAuth from "next-auth"; // Importing NextAuth for authentication.
import CredentialsProvider from "next-auth/providers/credentials"; // Importing CredentialsProvider for custom credentials-based authentication.
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Importing PrismaAdapter to integrate NextAuth with Prisma.

import prisma from "@/libs/prismadb"; // Importing Prisma client instance for database operations.

export default NextAuth({
  // Configuring Prisma as the adapter for NextAuth.
  adapter: PrismaAdapter(prisma),

  // Adding a credentials provider for email/password authentication.
  providers: [
    CredentialsProvider({
      name: "credentials", // Naming the authentication method.
      credentials: {
        email: { label: "email", type: "text" }, // Defining email field.
        password: { label: "password", type: "password" }, // Defining password field.
      },
      async authorize(credentials) {
        // Checking if both email and password are provided.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Finding the user in the database using Prisma based on the provided email.
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If the user doesn't exist or doesn't have a hashed password, throw an error.
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Comparing the provided password with the stored hashed password using bcrypt.
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If the password is incorrect, throw an error.
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // If the credentials are valid, return the user object.
        return user;
      },
    }),
  ],

  // Enabling debugging in development mode.
  debug: process.env.NODE_ENV === "development",

  // Configuring session strategy to use JWT (JSON Web Tokens).
  session: {
    strategy: "jwt",
  },

  // Configuring JWT settings, including the secret for token signing.
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, // Secret used to sign the JWT tokens.
  },

  // The general secret used by NextAuth (this could also be used for signing tokens).
  secret: process.env.NEXTAUTH_SECRET,
});
