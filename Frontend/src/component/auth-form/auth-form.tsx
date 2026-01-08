import { useState } from "react";
import type { LoginRequestDto } from "../../api/client";
import SignUp from "./sign-up/sign-up";
import Login from "./login/login";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import type { AuthStatus } from "../../context/auth-context";
import type { RegisterFormModel } from "../../view-models/view-models";

export type AuthView = "login" | "signup";
type AuthFormProps = {
  registrationUser: RegisterFormModel | undefined;
  loginUser: LoginRequestDto | undefined;
  loading: boolean;
  status: AuthStatus | null;
  clearStatus: () => void;
  onRegistration: (property: keyof RegisterFormModel, value: string | undefined) => void;
  onLogin: (property: keyof LoginRequestDto, value: string | undefined) => void;
  onSubmitLogin: () => Promise<void>;
  onSubmitRegister: () => Promise<void>;
}

function AuthForm({registrationUser, loginUser, loading, status, onRegistration, clearStatus, onLogin, onSubmitLogin, onSubmitRegister}: AuthFormProps) {
  const [view, setView] = useState<AuthView>("login");

  return (
    <div className="w-lg mx-auto mt-20">
      <div className="relative w-full bg-white rounded-xl shadow-xl overflow-hidden">
        
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
            user={loginUser}
            status={status}
            clearStatus={clearStatus}
            onLogin={onLogin}
            goTo={setView}
            onSubmit={onSubmitLogin}
          />
        )}

        {view === "signup" && (
          <SignUp
            user={registrationUser}
            status={status}
            clearStatus={clearStatus}
            onRegistration={onRegistration}
            goTo={setView}
            onSubmit={onSubmitRegister}
          />
        )}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center
                          bg-white/10 backdrop-blur-sm">
                          
            <LoadingSpinner size={24} />
        
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;