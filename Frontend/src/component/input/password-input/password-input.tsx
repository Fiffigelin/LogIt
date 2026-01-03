import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export type ShowPasswordState = {
  login: boolean;
  signup: boolean;
  signupConfirm: boolean;
};

type AuthProps = {
  label: string;
  showPassword: boolean;
  handleShowPassword: () => void;
};

function PasswordInput({ label, showPassword, handleShowPassword }: AuthProps) {
  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-medium text-gray-700">{label}</label>

      <div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-3 rounded-l-lg focus:outline-none"
          placeholder="Enter your password"
          required
        />
        <span
          className="cursor-pointer text-black p-3 flex items-center"
          onClick={handleShowPassword}
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;
