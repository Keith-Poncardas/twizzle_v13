// Importing PrismaClient from the Prisma client library
import { PrismaClient } from "@prisma/client";

// Declaring a global variable 'prisma' that can be either a PrismaClient instance or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

// Creating an instance of PrismaClient. If global prisma exists, it uses that; otherwise, it creates a new PrismaClient.
const client = globalThis.prisma || new PrismaClient();

// Ensuring the global prisma is only set to client if the environment is not production
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Exporting the client as the default export for use in other parts of the application
export default client;
