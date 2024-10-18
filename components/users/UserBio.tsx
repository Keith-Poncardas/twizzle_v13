import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi"; // Calendar icon for joined date
import { format } from "date-fns"; // Library for date formatting

import useCurrentUser from "@/hooks/useCurrentUser"; // Custom hook to fetch current user data
import useUser from "@/hooks/useUser"; // Custom hook to fetch user data by user ID
import useFollow from "@/hooks/useFollow"; // Custom hook for follow/unfollow functionality
import useEditModal from "@/hooks/useEditModal"; // Custom hook for managing edit modal

import Button from "../Button"; // Reusable Button component

interface UserBioProps {
  userId: string; // User ID of the profile being displayed
}

// Functional component to display user biography and stats
const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser(); // Fetch current user data
  const { data: fetchedUser } = useUser(userId); // Fetch user data for the specified user ID

  const editModal = useEditModal(); // Instance of the edit modal
  const { isFollowing, toggleFollow } = useFollow(userId); // Manage follow/unfollow functionality

  // Memoized function to format the user's account creation date
  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null; // Return null if no creation date is present
    }
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy'); // Format date to 'Month Year'
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {/* Render edit button for current user's profile or follow/unfollow button for others */}
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} /> // Edit button opens the edit modal
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'} // Button text changes based on follow status
            secondary={!isFollowing} // Secondary style when unfollowing
            outline={isFollowing} // Outlined style when following
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name} {/* Display user's name */}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username} {/* Display user's username */}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {fetchedUser?.bio} {/* Display user's bio */}
          </p>
          <div
            className="flex flex-row items-center gap-2 mt-4 text-neutral-500"
          >
            <BiCalendar size={24} /> {/* Calendar icon */}
            <p>
              Joined {createdAt} {/* Display account creation date */}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p> {/* Display following count */}
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p> {/* Display followers count */}
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBio; // Export the UserBio component
