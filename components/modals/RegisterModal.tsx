import axios from "axios"; // Importing Axios for making HTTP requests
import { toast } from "react-hot-toast"; // Importing toast for notifications
import { useCallback, useState } from "react"; // Importing React hooks
import { signIn } from 'next-auth/react'; // Importing signIn method from NextAuth for authentication

import useLoginModal from "@/hooks/useLoginModal"; // Custom hook for managing the login modal state
import useRegisterModal from "@/hooks/useRegisterModal"; // Custom hook for managing the registration modal state

import Input from "../Input"; // Importing Input component for text inputs
import Modal from "../Modal"; // Importing Modal component for rendering the modal

// RegisterModal component definition
const RegisterModal = () => {
  const loginModal = useLoginModal(); // Getting login modal state and functions
  const registerModal = useRegisterModal(); // Getting register modal state and functions

  // State variables for email, password, username, and name inputs
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [username, setUsername] = useState(''); // State for username input
  const [name, setName] = useState(''); // State for name input

  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  // Function to toggle between registration and login modals
  const onToggle = useCallback(() => {
    if (isLoading) {
      return; // Prevent toggling if currently loading
    }

    registerModal.onClose(); // Close the registration modal
    loginModal.onOpen(); // Open the login modal
  }, [loginModal, registerModal, isLoading]);

  // Function to handle form submission
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading state to true

      if (!email || !password || !username || !name) {
        toast.error('Please fill in all fields.'); // Display error message if any field is empty
        return null;
      }


      // Sending a POST request to register a new user
      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      setIsLoading(false); // Reset loading state

      toast.success('Account created.'); // Show success notification

      // Automatically sign in the new user after registration
      await signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose(); // Close the registration modal
    } catch (error) {
      toast.error('Something went wrong'); // Show error notification on failure
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [email, password, registerModal, username, name]);

  // Body content of the modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading} // Disable input when loading
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
      />
      <Input
        disabled={isLoading} // Disable input when loading
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update name state on input change
      />
      <Input
        disabled={isLoading} // Disable input when loading
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
      />
      <Input
        disabled={isLoading} // Disable input when loading
        placeholder="Password"
        type="password" // Password input type
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
      />
    </div>
  );

  // Footer content of the modal
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
          onClick={onToggle} // Toggle to login modal on click
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        > Sign in</span>
      </p>
    </div>
  );

  // Returning the Modal component with props
  return (
    <Modal
      disabled={isLoading} // Disable modal if loading
      isOpen={registerModal.isOpen} // Modal open state
      title="Create an account" // Modal title
      actionLabel="Register" // Register button label
      onClose={registerModal.onClose} // Function to close modal
      onSubmit={onSubmit} // Function to handle submission
      body={bodyContent} // Body content of the modal
      footer={footerContent} // Footer content of the modal
    />
  );
}

export default RegisterModal; // Exporting RegisterModal component as default
