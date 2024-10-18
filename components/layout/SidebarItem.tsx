import React, { useCallback } from 'react'; // Importing React and useCallback hook for memoizing functions
import { IconType } from "react-icons"; // Importing IconType for type definition of icons
import { useRouter } from 'next/router'; // Importing useRouter hook for navigation

import useLoginModal from '@/hooks/useLoginModal'; // Custom hook for handling login modal
import useCurrentUser from '@/hooks/useCurrentUser'; // Custom hook for fetching current user data
import { BsDot } from 'react-icons/bs'; // Importing a dot icon for notifications

// Defining the props for SidebarItem component
interface SidebarItemProps {
  label: string; // Label text for the sidebar item
  icon: IconType; // Icon component for the sidebar item
  href?: string; // Optional link for navigation
  onClick?: () => void; // Optional click handler
  auth?: boolean; // Indicates if authentication is required
  alert?: boolean; // Indicates if there is an alert for this item
}

// SidebarItem component definition
const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter(); // Initializing router for navigation
  const loginModal = useLoginModal(); // Using the login modal hook

  const { data: currentUser } = useCurrentUser(); // Fetching current user data

  // Callback function to handle clicks on the sidebar item
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick(); // Call the onClick function if provided
    }

    // If authentication is required and no current user, open the login modal
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href); // Navigate to the specified href
    }
  }, [router, href, auth, loginModal, onClick, currentUser]); // Dependencies for useCallback

  return (
    <div onClick={handleClick} className="flex flex-row items-center"> {/* Main container for the sidebar item */}
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="white" /> {/* Rendering the icon with specified size and color */}
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null} {/* Conditional alert dot */}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" /> {/* Rendering the icon for larger screens */}
        <p className="hidden lg:block text-white text-xl">
          {label} {/* Displaying the label for the sidebar item */}
        </p>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null} {/* Conditional alert dot */}
      </div>
    </div>
  );
}

export default SidebarItem; // Exporting SidebarItem component as the default export
