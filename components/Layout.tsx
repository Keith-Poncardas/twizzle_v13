import React from 'react'; // Importing React library to use JSX

// Importing layout components for sidebar and follow bar
import FollowBar from "@/components/layout/FollowBar"; // Component for the follow bar
import Sidebar from "@/components/layout/Sidebar"; // Component for the sidebar

// Defining the Layout component as a functional component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // Main wrapper div that takes up the full screen height and has a black background
    <div className="h-screen bg-black">
      {/* Container for centering content and setting maximum width */}
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        {/* Grid layout with 4 columns to arrange the sidebar, main content, and follow bar */}
        <div className="grid grid-cols-4 h-full">
          {/* Sidebar component on the left */}
          <Sidebar />
          {/* Main content area spanning 3 columns on small screens and 2 on large screens */}
          <div
            className="
              col-span-3  
              lg:col-span-2  
              border-x-[1px]  
              border-neutral-800 
          ">
            {/* Render the child components passed to the Layout */}
            {children}
          </div>
          {/* Follow bar component on the right side */}
          <FollowBar />
        </div>
      </div>
    </div>
  );
}

// Exporting the Layout component as the default export
export default Layout;
