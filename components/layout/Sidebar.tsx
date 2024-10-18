import { signOut } from 'next-auth/react'; // Importing signOut function from next-auth for user logout
import { BiLogOut } from 'react-icons/bi'; // Importing logout icon
import { BsHouseFill, BsBellFill } from 'react-icons/bs'; // Importing home and notifications icons
import { FaUser } from 'react-icons/fa'; // Importing user profile icon

import useCurrentUser from '@/hooks/useCurrentUser'; // Custom hook to fetch the current user data

import SidebarItem from './SidebarItem'; // Component to render individual sidebar items
import SidebarLogo from './SidebarLogo'; // Component to render the sidebar logo
import SidebarTweetButton from './SidebarTweetButton'; // Component for the tweet button in the sidebar

const Sidebar = () => {
  // Fetching the current user data using the custom hook
  const { data: currentUser } = useCurrentUser();

  // Defining the sidebar items with their respective icons, labels, and links
  const items = [
    {
      icon: BsHouseFill, // Home icon
      label: 'Home', // Display label for the item
      href: '/', // Link to the home page
    },
    {
      icon: BsBellFill, // Notifications icon
      label: 'Notifications', // Display label for notifications
      href: '/notifications', // Link to notifications page
      auth: true, // Indicates this item requires authentication
      alert: currentUser?.hasNotification // Conditional alert for notifications based on current user data
    },
    {
      icon: FaUser, // Profile icon
      label: 'Profile', // Display label for the profile
      href: `/users/${currentUser?.id}`, // Link to the user's profile page
      auth: true, // Indicates this item requires authentication
    },
  ];

  return (
    // Sidebar container, taking one column in a grid layout
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]"> {/* Space between items and fixed width for larger screens */}
          <SidebarLogo /> {/* Render the sidebar logo */}
          {items.map((item) => ( // Map over the items array to render SidebarItem components
            <SidebarItem
              key={item.href} // Unique key for each sidebar item
              alert={item.alert} // Pass alert state to the SidebarItem
              auth={item.auth} // Pass auth requirement to the SidebarItem
              href={item.href} // Pass link for navigation to SidebarItem
              icon={item.icon} // Pass the icon to the SidebarItem
              label={item.label} // Pass the display label to SidebarItem
            />
          ))}
          {currentUser && ( // Conditional rendering for logout button if currentUser exists
            <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />
          )}
          <SidebarTweetButton /> {/* Render the tweet button at the bottom of the sidebar */}
        </div>
      </div>
    </div>
  );
};

// Exporting the Sidebar component as the default export
export default Sidebar;
