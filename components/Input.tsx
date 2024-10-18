interface InputProps {
  placeholder?: string; // Optional placeholder text
  value?: string; // Optional controlled value
  type?: string; // Type of the input (text, email, password, etc.)
  disabled?: boolean; // Optional flag to disable the input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
  label?: string; // Optional label for the input
}

const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>} {/* Conditional rendering of label */}
      <input
        disabled={disabled} // Disable the input if the disabled prop is true
        onChange={onChange} // Handle input changes
        value={value} // Controlled value
        placeholder={placeholder} // Placeholder text
        type={type} // Input type
        className="
          w-full
          p-4 
          text-lg 
          bg-black 
          border-2
          border-neutral-800 
          rounded-md
          outline-none
          text-white
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
}

export default Input; // Exporting the Input component
