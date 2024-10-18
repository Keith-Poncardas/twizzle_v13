import axios from 'axios'; // Import axios for HTTP requests
import { useCallback, useState } from 'react'; // Import React hooks
import { toast } from 'react-hot-toast'; // Import toast for notifications

import useLoginModal from '@/hooks/useLoginModal'; // Custom hook for login modal
import useRegisterModal from '@/hooks/useRegisterModal'; // Custom hook for register modal
import useCurrentUser from '@/hooks/useCurrentUser'; // Custom hook to fetch the current user
import usePosts from '@/hooks/usePosts'; // Custom hook for managing posts
import usePost from '@/hooks/usePost'; // Custom hook for managing a specific post

import Avatar from './Avatar'; // Import Avatar component
import Button from './Button'; // Import Button component

// Define the interface for the Form component's props
interface FormProps {
  placeholder: string; // Placeholder text for the textarea
  isComment?: boolean; // Optional prop to determine if the form is for comments
  postId?: string; // Optional post ID for comments
}

// Functional component for the Form
const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  // Hooks for modals and user data
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string); // Get mutate function for a specific post

  const [body, setBody] = useState(''); // State for the body of the post/comment
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Function to handle form submission
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading state to true
      // Determine the URL based on whether the form is for a comment or a post
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body }); // Make POST request with the body

      toast.success('Shout created'); // Show success notification
      setBody(''); // Clear the body state
      mutatePosts(); // Refresh posts
      mutatePost(); // Refresh specific post if applicable
    } catch (error) {
      toast.error('Something went wrong'); // Show error notification
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? ( // Check if the user is logged in
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} /> {/* Render user's avatar */}
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading} // Disable textarea if loading
              onChange={(event) => setBody(event.target.value)} // Update body state on change
              value={body} // Bind body state to textarea
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder} // Set placeholder text
            />
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Shout" /> {/* Render button */}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twizzle!</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} /> {/* Render login button */}
            <Button label="Register" onClick={registerModal.onOpen} secondary /> {/* Render register button */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form; // Export the Form component
