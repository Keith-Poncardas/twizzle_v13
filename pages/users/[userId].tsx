// Importing necessary libraries and components
import { useRouter } from "next/router"; // Importing useRouter for accessing route parameters
import { ClipLoader } from "react-spinners"; // Importing a loading spinner for displaying loading state

import useUser from "@/hooks/useUser"; // Importing the custom hook to fetch user data

import PostFeed from "@/components/posts/PostFeed"; // Importing the PostFeed component to display user posts
import Header from "@/components/Header"; // Importing the Header component for page navigation
import UserBio from "@/components/users/UserBio"; // Importing the UserBio component to display user biography
import UserHero from "@/components/users/UserHero"; // Importing the UserHero component for the user's hero section

const UserView = () => {
  const router = useRouter(); // Using the router to access the current route and parameters
  const { userId } = router.query; // Destructuring userId from the router query parameters

  // Using the useUser hook to fetch the user data by userId
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  // If the user data is loading or not fetched, display a loading spinner
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} /> {/* Loading spinner centered on the screen */}
      </div>
    )
  }

  return (
    <>
      {/* Rendering the Header component with a back arrow and the user's name as the label */}
      <Header showBackArrow label={fetchedUser?.name} />

      {/* Rendering the UserHero component with the userId to display the user's hero section */}
      <UserHero userId={userId as string} />

      {/* Rendering the UserBio component with the userId to display the user's biography */}
      <UserBio userId={userId as string} />

      {/* Rendering the PostFeed component to display posts from the user */}
      <PostFeed userId={userId as string} />
    </>
  );
}

export default UserView; // Exporting the UserView component as default
