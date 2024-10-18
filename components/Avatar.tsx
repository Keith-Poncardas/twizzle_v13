import Image from "next/image"; // Import Next.js Image component for optimized image loading
import { useRouter } from "next/router"; // Import useRouter hook from Next.js for navigation
import { useCallback } from "react"; // Import useCallback to memoize the onClick handler

import useUser from "@/hooks/useUser"; // Custom hook to fetch user data

// Interface defining the props for the Avatar component
interface AvatarProps {
  userId: string; // The ID of the user whose avatar is being displayed
  isLarge?: boolean; // Optional prop to determine if the avatar should be large
  hasBorder?: boolean; // Optional prop to determine if the avatar should have a border
}

// Functional component to display the user's avatar
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter(); // Initialize the router for navigation

  // Fetch user data using the custom hook
  const { data: fetchedUser } = useUser(userId);

  // Callback function to handle avatar click event
  const onClick = useCallback((event: any) => {
    event.stopPropagation(); // Prevent click event from bubbling up

    const url = `/users/${userId}`; // Construct the URL to navigate to the user's profile

    router.push(url); // Navigate to the user's profile page
  }, [router, userId]);

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''} 
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90
        transition 
        cursor-pointer 
        relative 
      `}
    >
      <Image
        fill // Fill the parent container
        style={{
          objectFit: 'cover', // Ensure the image covers the area without distortion
          borderRadius: '100%' // Make the image circular
        }}
        alt="Avatar" // Alt text for accessibility
        onClick={onClick} // Assign the click event handler
        src={fetchedUser?.profileImage || '/images/placeholder.png'} // Use fetched user's profile image or a placeholder
      />
    </div>
  );
}

export default Avatar; // Export the Avatar component
