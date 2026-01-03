type AuthProps = {
  label: string;
  type?: "text" | "email";
  placeholder?: string;
};

function TextInput({ label, type = "text", placeholder = "" }: AuthProps) {
  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-medium text-gray-700">{label}</label>

      <div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type={type}
          className="w-full p-3 rounded-lg focus:outline-none"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

export default TextInput;
