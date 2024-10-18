// Importing necessary components and hooks
import Header from "@/components/Header"; // Importing the Header component for page title and navigation
import NotificationsFeed from "@/components/NotificationsFeed"; // Importing the NotificationsFeed component to display user notifications
import useCurrentUser from "@/hooks/useCurrentUser"; // Importing the hook to get the current user's information
import { NextPageContext } from "next"; // Importing NextPageContext for type definition in server-side props
import { getSession } from "next-auth/react"; // Importing getSession to retrieve session information for authentication

// getServerSideProps function to fetch session data on the server side
export async function getServerSideProps(context: NextPageContext) {
  // Fetching the session from the context
  const session = await getSession(context);

  // If there is no session (user not authenticated), redirect to the home page
  if (!session) {
    return {
      redirect: {
        destination: '/', // Redirecting to the home page
        permanent: false, // This is a temporary redirect
      }
    }
  }

  // If session exists, return it as a prop to the Notifications component
  return {
    props: {
      session // Returning the session data as a prop
    }
  }
}

// Notifications component definition
const Notifications = () => {
  return (
    <>
      {/* Rendering the Header with a back arrow and label for the Notifications page */}
      <Header showBackArrow label="Notifications" />

      {/* Rendering the NotificationsFeed component to display the list of notifications */}
      <NotificationsFeed />
    </>
  );
}

// Exporting the Notifications component as default
export default Notifications;
