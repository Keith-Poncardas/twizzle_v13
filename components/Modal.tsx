import { useCallback } from "react"; // Importing useCallback from React for memoizing functions
import { AiOutlineClose } from "react-icons/ai"; // Importing a close icon from react-icons
import Button from "./Button"; // Importing a custom Button component

// Defining the props interface for the Modal component
interface ModalProps {
  isOpen?: boolean; // Optional prop to control whether the modal is open
  onClose: () => void; // Function to handle closing the modal
  onSubmit: () => void; // Function to handle submission action
  title?: string; // Optional title for the modal
  body?: React.ReactElement; // Optional body content of the modal
  footer?: React.ReactElement; // Optional footer content of the modal
  actionLabel: string; // Label for the action button
  disabled?: boolean; // Optional prop to disable actions in the modal
}

// Defining the Modal component with the props
const Modal: React.FC<ModalProps> = ({
  isOpen, // Modal visibility state
  onClose, // Function to close the modal
  onSubmit, // Function to submit the modal action
  title, // Title for the modal
  body, // Body content of the modal
  actionLabel, // Label for the action button
  footer, // Footer content for the modal
  disabled, // Flag to disable the modal actions
}) => {
  // handleClose function to close the modal
  const handleClose = useCallback(() => {
    if (disabled) {
      return; // If the modal is disabled, do not close
    }
    onClose(); // Call the onClose function to close the modal
  }, [onClose, disabled]); // Dependencies for useCallback

  // handleSubmit function to handle submission of the modal
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return; // If the modal is disabled, do not submit
    }
    onSubmit(); // Call the onSubmit function to submit the action
  }, [onSubmit, disabled]); // Dependencies for useCallback

  // If the modal is not open, return null to avoid rendering
  if (!isOpen) {
    return null; // Prevent rendering if the modal is closed
  }

  return (
    <>
      {/* Modal overlay */}
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* Modal content container */}
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/* Modal header */}
            <div className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">
                {title} {/* Render the modal title */}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose} // Call handleClose when the close button is clicked
              >
                <AiOutlineClose size={20} /> {/* Close icon */}
              </button>
            </div>
            {/* Modal body */}
            <div className="relative p-10 flex-auto">
              {body} {/* Render the body content of the modal */}
            </div>
            {/* Modal footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled} // Disable the button if the modal is disabled
                label={actionLabel} // Set the button label
                secondary // Optional secondary styling for the button
                fullWidth // Make the button full width
                large // Make the button larger
                onClick={handleSubmit} // Call handleSubmit when the button is clicked
              />
              {footer} {/* Render the footer content of the modal */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Exporting the Modal component for use in other parts of the application
export default Modal;
