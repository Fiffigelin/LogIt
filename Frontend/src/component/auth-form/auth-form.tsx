import { useCallback, useState } from "react";
import SignUp from "./sign-up/sign-up";
import Login from "./login/login";

export type AuthProps = {
  showPassword: ShowPasswordState,
  handleShowPassword: (field: keyof ShowPasswordState) => void;
}

type ShowPasswordState  = {
  login: boolean;
  signup: boolean;
  signupConfirm: boolean;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<ShowPasswordState >({
    login: false,
    signup: false,
    signupConfirm: false,
  });

const handleShowPassword = useCallback(
  (field: keyof ShowPasswordState , value?: boolean) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: value !== undefined ? value : !prev[field],
    }));
  },
  []
);

  return (
    <div className="w-lg mx-auto mt-20">
      <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Toggle Buttons */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-lg font-semibold transition 
            ${isLogin ? "text-blue-500 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-blue-500" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 text-lg font-semibold transition 
            ${!isLogin ? "text-blue-500 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-blue-500" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? 
          <Login showPassword={showPassword} handleShowPassword={handleShowPassword} /> : 
          <SignUp showPassword={showPassword} handleShowPassword={handleShowPassword} />
        }
      </div>
    </div>
  );
}
