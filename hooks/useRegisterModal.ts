// Importing the create function from the zustand library to create a store
import { create } from "zustand";

// Defining an interface for the register modal store
interface RegisterModalStore {
  isOpen: boolean; // Indicates whether the modal is open or closed
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

// Creating the register modal store using zustand
const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false, // Initial state of the modal is closed
  onOpen: () => set({ isOpen: true }), // Function to set isOpen to true
  onClose: () => set({ isOpen: false }), // Function to set isOpen to false
}));

// Exporting the useRegisterModal hook as the default export
export default useRegisterModal;
