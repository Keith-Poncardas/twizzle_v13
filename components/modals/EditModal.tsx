import axios from "axios"; // Importing axios for HTTP requests
import { useCallback, useEffect, useState } from "react"; // Importing React hooks
import { toast } from "react-hot-toast"; // Importing toast for notifications

import useCurrentUser from "@/hooks/useCurrentUser"; // Custom hook for current user data
import useEditModal from "@/hooks/useEditModal"; // Custom hook for managing the edit modal state
import useUser from "@/hooks/useUser"; // Custom hook for fetching user data by ID

import Input from "../Input"; // Importing Input component for text inputs
import Modal from "../Modal"; // Importing Modal component for rendering the modal
import ImageUpload from "../ImageUpload"; // Importing ImageUpload component for image uploads

// EditModal component definition
const EditModal = () => {
  const { data: currentUser } = useCurrentUser(); // Fetching current user data
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id); // Hook to mutate (refresh) fetched user data
  const editModal = useEditModal(); // Getting edit modal state and functions

  // State variables for user profile data
  const [profileImage, setProfileImage] = useState(''); // State for profile image
  const [coverImage, setCoverImage] = useState(''); // State for cover image
  const [name, setName] = useState(''); // State for name
  const [username, setUsername] = useState(''); // State for username
  const [bio, setBio] = useState(''); // State for bio

  // Effect to initialize the modal fields with current user data
  useEffect(() => {
    setProfileImage(currentUser?.profileImage); // Set profile image
    setCoverImage(currentUser?.coverImage); // Set cover image
    setName(currentUser?.name); // Set name
    setUsername(currentUser?.username); // Set username
    setBio(currentUser?.bio); // Set bio
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  // Function to handle form submission
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading state to true

      // Sending a PATCH request to update the user profile
      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      mutateFetchedUser(); // Refresh user data after update

      toast.success('Updated'); // Show success notification

      editModal.onClose(); // Close the modal
    } catch (error) {
      toast.error('Something went wrong'); // Show error notification
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  // Body content of the modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)} // Update name state on input change
        value={name} // Controlled input for name
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        value={username} // Controlled input for username
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)} // Update bio state on input change
        value={bio} // Controlled input for bio
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading} // Disable modal if loading
      isOpen={editModal.isOpen} // Modal open state
      title="Edit your profile" // Modal title
      actionLabel="Save" // Save button label
      onClose={editModal.onClose} // Function to close modal
      onSubmit={onSubmit} // Function to handle submission
      body={bodyContent} // Body content of the modal
    />
  );
}

export default EditModal; // Exporting EditModal component as default
