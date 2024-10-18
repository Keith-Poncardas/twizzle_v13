import { signIn } from "next-auth/react"; // Importing signIn method from NextAuth for authentication
import { useCallback, useState } from "react"; // Importing React hooks
import { toast } from "react-hot-toast"; // Importing toast for notifications

import useLoginModal from "@/hooks/useLoginModal"; // Custom hook for managing the login modal state
import useRegisterModal from "@/hooks/useRegisterModal"; // Custom hook for managing the registration modal state

import Input from "../Input"; // Importing Input component for text inputs
import Modal from "../Modal"; // Importing Modal component for rendering the modal

// LoginModal component definition
const LoginModal = () => {
  const loginModal = useLoginModal(); // Getting login modal state and functions
  const registerModal = useRegisterModal(); // Getting register modal state and functions

  // State variables for email and password inputs
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  // Function to handle form submission
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading state to true

      if (!email || !password) {
        toast.error("No email or password provided"); // Display error message if email or password is empty
        return null;
      }

      // Attempt to sign in using email and password
      await signIn('credentials', {
        email,
        password,
      });

      toast.success('Logged in'); // Show success notification

      loginModal.onClose(); // Close the modal on successful login
    } catch (error) {
      toast.error('Something went wrong'); // Show error notification on failure
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [email, password, loginModal]);

  // Function to toggle between login and registration modals
  const onToggle = useCallback(() => {
    loginModal.onClose(); // Close the login modal
    registerModal.onOpen(); // Open the registration modal
  }, [loginModal, registerModal]);

  // Body content of the modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        value={email} // Controlled input for email
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password" // Password input type
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        value={password} // Controlled input for password
        disabled={isLoading}
      />
    </div>
  );

  // Footer content of the modal
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twizzle?
        <span
          onClick={onToggle} // Toggle to registration modal on click
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        > Create an account</span>
      </p>
    </div>
  );

  // Returning the Modal component with props
  return (
    <Modal
      disabled={isLoading} // Disable modal if loading
      isOpen={loginModal.isOpen} // Modal open state
      title="Login" // Modal title
      actionLabel="Sign in" // Sign-in button label
      onClose={loginModal.onClose} // Function to close modal
      onSubmit={onSubmit} // Function to handle submission
      body={bodyContent} // Body content of the modal
      footer={footerContent} // Footer content of the modal
    />
  );
}

export default LoginModal; // Exporting LoginModal component as default
