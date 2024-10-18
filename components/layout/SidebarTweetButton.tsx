import { useCallback } from "react"; // Importing useCallback for memoizing functions
import { BsFillMegaphoneFill } from "react-icons/bs"; // Importing megaphone icon for the tweet button
import { useRouter } from "next/router"; // Importing useRouter for navigation

import useLoginModal from "@/hooks/useLoginModal"; // Custom hook for handling the login modal
import useCurrentUser from "@/hooks/useCurrentUser"; // Custom hook for fetching current user data

// SidebarTweetButton component definition
const SidebarTweetButton = () => {
  const router = useRouter(); // Initializing router for navigation
  const loginModal = useLoginModal(); // Using the login modal hook
  const { data: currentUser } = useCurrentUser(); // Fetching current user data

  // Click handler for the tweet button
  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen(); // Open login modal if user is not logged in
    }

    router.push('/'); // Navigate to the homepage if the user is logged in
  }, [loginModal, router, currentUser]); // Dependencies for useCallback

  return (
    <div onClick={onClick}> {/* Main container for the tweet button */}
      <div className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <BsFillMegaphoneFill size={24} color="white" /> {/* Rendering the feather icon */}
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      ">
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        ">
          Shout {/* Displaying the label for the tweet button */}
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton; // Exporting SidebarTweetButton component as the default export
