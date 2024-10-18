import { BsTwitter } from "react-icons/bs"; // Importing the Twitter icon from react-icons

import useNotifications from "@/hooks/useNotifications"; // Custom hook to fetch notifications
import useCurrentUser from "@/hooks/useCurrentUser"; // Custom hook to fetch the current user
import { useEffect } from "react"; // Importing useEffect from React for side effects

const NotificationsFeed = () => {
  // Using the custom hook to get the current user data and a function to mutate (update) the current user
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  // Fetching notifications for the current user; defaults to an empty array if none found
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  // useEffect to trigger a mutation on the current user when the component mounts or currentUser changes
  useEffect(() => {
    mutateCurrentUser(); // Refresh current user data
  }, [mutateCurrentUser]); // Dependency array includes mutateCurrentUser

  // Conditional rendering to display a message if there are no notifications
  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications {/* Message when no notifications are available */}
      </div>
    );
  }

  // Rendering the notifications feed if there are notifications
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        // Mapping over each notification to render it
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} /> {/* Displaying the Twitter icon */}
          <p className="text-white">
            {notification.body} {/* Displaying the notification body */}
          </p>
        </div>
      ))}
    </div>
  );
}

// Exporting the NotificationsFeed component for use in other parts of the application
export default NotificationsFeed;
