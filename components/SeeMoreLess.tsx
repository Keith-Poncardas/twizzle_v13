import React, { useState } from 'react';

// Define the interface for component props
interface SeeMoreLessProps {
  text: string;          // The full text to display
  maxLength?: number;    // The maximum length of text to show when collapsed
  moreText?: string;     // The text to display for expanding the content
  lessText?: string;     // The text to display for collapsing the content
}

// Functional component definition
const SeeMoreLess: React.FC<SeeMoreLessProps> = ({
  text,
  maxLength = 100,     // Default max length is set to 100 characters
  moreText = "See More", // Default text for expanding
  lessText = "See Less", // Default text for collapsing
}) => {
  // State to manage whether the text is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Function to toggle the expansion state
  const toggleExpand = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to parent elements
    setIsExpanded(prev => !prev); // Toggle the expanded state
  };

  // Determine the displayed text based on the expanded state
  const displayedText = isExpanded
    ? text // Show the full text if expanded
    : `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`; // Show truncated text with ellipsis if necessary

  return (
    <div>
      <p>
        {displayedText} {/* Render the displayed text */}
        {text.length > maxLength && ( // Check if the text exceeds max length
          <span
            className='inline text-blue-500 cursor-pointer' // Style the span as inline and blue, and indicate it's clickable
            onClick={toggleExpand} // Attach the click event handler
          >
            {isExpanded ? ` ${lessText}` : ` ${moreText}`} {/* Display appropriate toggle text */}
          </span>
        )}
      </p>
    </div>
  );
};

// Export the component for use in other files
export default SeeMoreLess;
