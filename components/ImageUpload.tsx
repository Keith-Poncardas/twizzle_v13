import Image from "next/image"; // Importing Next.js Image component for optimized images
import { useCallback, useState } from "react"; // Importing hooks from React
import { useDropzone } from "react-dropzone"; // Importing useDropzone for drag-and-drop functionality

// Define the interface for the ImageUpload component's props
interface DropzoneProps {
  onChange: (base64: string) => void; // Callback for when the image changes
  label: string; // Label for the dropzone
  value?: string; // Optional initial base64 value
  disabled?: boolean; // Optional flag to disable the dropzone
}

// Functional component for ImageUpload
const ImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
  const [base64, setBase64] = useState(value); // State to hold the base64 image data

  // Callback to handle image change
  const handleChange = useCallback((base64: string) => {
    onChange(base64); // Trigger the onChange callback
  }, [onChange]);

  // Callback to handle dropped files
  const handleDrop = useCallback((files: any) => {
    const file = files[0]; // Get the first dropped file
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result); // Set the base64 state
      handleChange(event.target.result); // Call handleChange with the base64 result
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }, [handleChange]);

  // Setup dropzone properties
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, // Limit to one file
    onDrop: handleDrop, // Set the onDrop handler
    disabled, // Disable the dropzone if the disabled prop is true
    accept: {
      'image/jpeg': [], // Accept JPEG images
      'image/png': [], // Accept PNG images
    }
  });

  return (
    <div {...getRootProps({ className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700' })}>
      <input {...getInputProps()} />
      {base64 ? ( // If there is a base64 image, display it
        <div className="flex items-center justify-center">
          <Image
            src={base64}
            height={100} // Use number instead of string for height
            width={100} // Use number instead of string for width
            alt="Uploaded image" // Accessibility text for the image
          />
        </div>
      ) : ( // If no image, display the label
        <p className="text-white">{label}</p>
      )}
    </div>
  );
}

export default ImageUpload; // Export the ImageUpload component
