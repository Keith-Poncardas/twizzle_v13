// Define the interface for the Button component's props
interface ButtonProps {
  label: string; // The text displayed on the button
  secondary?: boolean; // Optional prop to determine if the button is a secondary style
  fullWidth?: boolean; // Optional prop to determine if the button should take the full width of its container
  large?: boolean; // Optional prop to determine if the button should be large
  onClick: () => void; // Function to call when the button is clicked
  disabled?: boolean; // Optional prop to disable the button
  outline?: boolean; // Optional prop to determine if the button should have an outline style
}

// Functional component for the Button
const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline
}) => {
  return (
    <button
      disabled={disabled} // Disable the button if disabled prop is true
      onClick={onClick} // Assign the click event handler
      className={`
        disabled:opacity-70 
        disabled:cursor-not-allowed 
        rounded-full 
        font-semibold 
        hover:opacity-80 
        transition
        border-2 
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-sky-500'} 
        ${secondary ? 'text-black' : 'text-white'} 
        ${secondary ? 'border-black' : 'border-sky-500'} 
        ${large ? 'text-xl' : 'text-md'} 
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''} 
      `}
    >
      {label} {/* Display the button label */}
    </button>
  );
}

export default Button; // Export the Button component
