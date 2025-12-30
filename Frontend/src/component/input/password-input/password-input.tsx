import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import type { AuthProps } from "../../auth-form/auth-form";

function PasswordInput({showPassword, handleShowPassword}: AuthProps) {
  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-medium text-gray-700">Password</label>
      <div className="flex border rounded-lg">
        <input
          type={showPassword.login ? "text" : "password"}
          className="w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your password"
          required
          />
        <span
          className="cursor-pointer text-black p-4 self-center"
          onClick={() => handleShowPassword("login")}
          >
          {showPassword.login ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;