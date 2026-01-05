import { useCallback, useState } from "react";
import PasswordInput from "../../input/password-input/password-input";
import type { AuthView } from "../auth-form";
import type { LoginRequestDto } from "../../../api/client";
import { isEmail } from "../../../utils/validation";
import TextInput from "../../input/text-input/text-input";

type LoginProps = {
  user: LoginRequestDto | undefined;
  onLogin: (property: keyof LoginRequestDto, value: string | undefined) => void;
  goTo: (view: AuthView) => void;
  onSubmit: () => Promise<void>;
}

function Login({user, onLogin, goTo, onSubmit}: LoginProps) {
  const [validLoginEmail, setLoginEmailValid] = useState<boolean>(true);
  // const isFormValid = !!user?.email && validLoginEmail && !!user?.password;

  const handleEmail = useCallback(
    (value: string) => {
      onLogin("email", value);
      setLoginEmailValid(isEmail(value));
    },
    [onLogin]
  );

  const handlePassword = useCallback(
    (value: string) => {
      onLogin("password", value);
    },
    [onLogin]
  );
  return (
    <form
      className="p-8 growDown relative"
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Please enter your details to sign in
      </p>
      {/* SKAPA ETT FELMEDDELANDE OM EMAIL ELLER LÖSENORD ÄR FELAKTIGT */}
      <div className="mb-4">
        <TextInput value={user?.email} onChange={(value) => {handleEmail(value)}} valid={validLoginEmail} label={"Email"} type={"email"} placeholder="Enter your email"/>
        <PasswordInput value={user?.password} onChange={(value) => {handlePassword(value)}} label={"Password"} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-gray-600 text-sm">Remember me</span>
        </label>
        <a className="text-blue-500 text-sm" href="#">
          Forgot password?
        </a>
      </div>
      <button className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-600">
        Sign In
      </button>
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <button
          className="text-blue-500 font-medium cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            goTo("signup");
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;