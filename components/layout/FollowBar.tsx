import useUsers from '@/hooks/useUsers'; // Custom hook to fetch users

import Avatar from '../Avatar'; // Importing Avatar component to display user profile pictures

const FollowBar = () => {
  // Destructuring data from useUsers hook and providing a default empty array
  const { data: users = [] } = useUsers();

  // Return null if there are no users to display
  if (users.length === 0) {
    return null;
  }

  return (
    // Wrapper for the follow suggestions, hidden on small screens
    <div className="px-6 py-4 hidden lg:block">
      {/* Background container for follow suggestions with padding and rounded corners */}
      <div className="bg-neutral-800 rounded-xl p-4">
        {/* Title for the section */}
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        {/* Container for the user suggestions, using flexbox for vertical alignment */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Mapping over the users array to create a list of user suggestion items */}
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              {/* Displaying the user's avatar */}
              <Avatar userId={user.id} />
              {/* Container for the user information */}
              <div className="flex flex-col">
                {/* User's name displayed in bold */}
                <p className="text-white font-semibold text-sm">{user.name}</p>
                {/* User's username displayed in a lighter color */}
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Exporting the FollowBar component as the default export
export default FollowBar;
