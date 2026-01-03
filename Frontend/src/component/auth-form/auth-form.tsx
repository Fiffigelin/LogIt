import { useCallback, useState } from "react";
import type { ShowPasswordState } from "../input/password-input/password-input";
import SignUp from "./sign-up/sign-up";
import Login from "./login/login";

export type AuthView = "login" | "signup";

export default function AuthForm() {
const [view, setView] = useState<AuthView>("login");
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
            className={`flex-1 py-4 text-lg font-semibold transition cursor-pointer
            ${view === "login" ? "text-blue-500 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.75 after:bg-blue-500" : "text-gray-500"}`}
            onClick={() => setView("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 text-lg font-semibold transition cursor-pointer
            ${view === "signup" ? "text-blue-500 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.75 after:bg-blue-500" : "text-gray-500"}`}
            onClick={() => setView("signup")}
          >
            Sign Up
          </button>
        </div>

        {view === "login" && (
          <Login
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            goTo={setView}
          />
        )}

        {view === "signup" && (
          <SignUp
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            goTo={setView}
          />
        )}

      </div>
    </div>
  );
}
