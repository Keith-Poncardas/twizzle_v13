// Importing the create function from the zustand library to create a store
import { create } from "zustand";

// Defining an interface for the login modal store
interface LoginModalStore {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

// Creating the login modal store using zustand
const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false, // Initial state of the modal is closed
  onOpen: () => set({ isOpen: true }), // Function to set isOpen to true
  onClose: () => set({ isOpen: false }), // Function to set isOpen to false
}));

// Exporting the useLoginModal hook as the default export
export default useLoginModal;
