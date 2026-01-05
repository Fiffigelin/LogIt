import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { isEqual, validatePassword } from "../../../utils/validation";

type ShowPasswordState = {
  password: boolean;
  confirmation: boolean;
};

type PasswordProps = {
  value: string | undefined;
  onChangePassword: (value: string) => void;
}
function PasswordConfirmationGroup({value, onChangePassword}: PasswordProps) {
  const [showPassword, setShowPassword] = useState<ShowPasswordState >({
    password: false,
    confirmation: false,
  });
  const [isTouched, setIsTouched] = useState<ShowPasswordState >({
    password: false,
    confirmation: false,
  });

  const [confirmationValue, setConfirmationValue] = useState<string>("");
  const [isValid, setIsValid] = useState<ShowPasswordState>({
    password: false,
    confirmation: false
  })

  const handleShowPassword = 
    (field: keyof ShowPasswordState , value?: boolean) => {
      setShowPassword((prev) => ({
        ...prev,
        [field]: value !== undefined ? value : !prev[field],
      }));
  };

  const markTouched = (field: keyof ShowPasswordState) => {
    setIsTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const handlePassword = (value: string) => {
    onChangePassword(value);
    setIsValid(prev => ({
      ...prev,
      password: validatePassword(value),
    }));
  };

  const handleConfirmation = (confirmation: string) => {
    setConfirmationValue(confirmation);
    setIsValid(prev => ({
      ...prev,
      confirmation: isEqual(confirmation, value),
    }));
  };

  return(
    <div className="flex flex-col">
      <div className="mb-4 relative">
        <label className="flex justify-between items-center mb-2 font-medium text-gray-700">
          <p>Password</p>
          <div className="group relative inline-block mr-1">
            <IoInformationCircleOutline size={24}  />

            {/* Tooltip box */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 -right-3 mb-5 w-60 bg-black text-white text-sm rounded-md px-3 py-2 pointer-events-none">
              Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
            
              <svg
                className="absolute h-6 w-8 -right-2 -translate-x-1/2 -bottom-5"
                viewBox="0 0 10 10"
                fill="black"
              >
                <polygon points="0,0 5,5 10,0" />
              </svg>
            </div>

          </div>
        </label>

        <div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
          <input
            value={value}
            type={showPassword.password ? "text" : "password"}
            className="w-full p-3 rounded-l-lg focus:outline-none"
            placeholder="Enter your password"
            onChange={(e) => handlePassword(e.target.value)}
            onBlur={() => markTouched("password")}
            required
          />
          <span
            className="cursor-pointer text-black p-3 flex items-center"
            onClick={() => handleShowPassword("password")}
          >
            {showPassword.password ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>
        { isTouched.password && !isValid.password && <p className="text-sm text-red-600">Password must be at least 8 characters and include uppercase, lowercase, number and special character.</p>}
      </div>
      
      <div className="mb-4 relative">
        <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
        <div className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
          <input
            value={confirmationValue}
            type={showPassword.confirmation ? "text" : "password"}
            className="w-full p-3 rounded-l-lg focus:outline-none"
            placeholder="Confirm your password"
            onChange={(e) => handleConfirmation(e.target.value)}
            onBlur={() => markTouched("confirmation")}
            required
          />
          <span
            className="cursor-pointer text-black p-3 flex items-center"
            onClick={() => handleShowPassword("confirmation")}
          >
            {showPassword.confirmation ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>
        {isTouched.confirmation && !isValid.confirmation && <p className="text-sm text-red-600">Password doesn't match.</p>}
      </div>
    </div>
  );
}

export default PasswordConfirmationGroup;