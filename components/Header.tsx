import { useRouter } from "next/router"; // Importing useRouter for navigation
import { useCallback } from "react"; // Importing useCallback for memoizing functions
import { BiArrowBack } from "react-icons/bi"; // Importing back arrow icon

// Define the interface for the Header component's props
interface HeaderProps {
  showBackArrow?: boolean; // Optional prop to determine if the back arrow should be shown
  label: string; // Title label for the header
}

// Functional component for the Header
const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter(); // Getting the router instance

  // Function to handle back navigation
  const handleBack = useCallback(() => {
    router.back(); // Navigate back to the previous page
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5"> {/* Header container */}
      <div className="flex flex-row items-center gap-2"> {/* Flex container for layout */}
        {showBackArrow && ( // Conditionally render back arrow
          <BiArrowBack
            onClick={handleBack} // Handle back navigation
            color="white" // Icon color
            size={20} // Icon size
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
            "
          />
        )}
        <h1 className="text-white text-xl font-semibold"> {/* Header title */}
          {label}
        </h1>
      </div>
    </div>
  );
}

export default Header; // Export the Header component
