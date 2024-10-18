import Image from "next/image"; // Import Next.js Image component for optimized image loading

import useUser from "@/hooks/useUser"; // Custom hook to fetch user data

import Avatar from "../Avatar"; // Import Avatar component to display the user's avatar

// Interface defining the props for the UserHero component
interface UserHeroProps {
  userId: string; // The ID of the user whose hero section is being displayed
}

// Functional component to display the user's hero section (cover image and avatar)
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  // Fetch user data using the custom hook
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      {/* Hero section with a background and cover image */}
      <div className="bg-neutral-700 h-44 relative"> {/* Set background color and height */}
        {fetchedUser?.coverImage && ( // Conditionally render cover image if it exists
          <Image
            src={fetchedUser.coverImage} // Source of the cover image
            fill // Fill the parent container
            alt="Cover Image" // Alt text for accessibility
            style={{ objectFit: 'cover' }} // Ensure the image covers the area without distortion
          />
        )}
        {/* Position the avatar over the cover image */}
        <div className="absolute -bottom-16 left-4"> {/* Position avatar with absolute positioning */}
          <Avatar
            userId={userId} // Pass user ID to the Avatar component
            isLarge // Indicate that a larger avatar should be used
            hasBorder // Indicate that the avatar should have a border
          />
        </div>
      </div>
    </div>
  );
}

export default UserHero; // Export the UserHero component
