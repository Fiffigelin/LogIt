import { useCallback, useState } from "react";
import type { RegisterUserDto } from "../../../api/client";
import type { AuthView } from "../auth-form";
import { isEmail } from "../../../utils/validation";
import TextInput from "../../input/text-input/text-input";
import PasswordConfirmationGroup from "../../input/password-confirmation-group/password-confirmation";

type SignUpProps = {
  user: RegisterUserDto | undefined;
  onRegistration: (property: keyof RegisterUserDto, value: string | undefined) => void;
  goTo: (view: AuthView) => void;
  onSubmit: () => Promise<void>;
}

function SignUp({user, onRegistration, goTo, onSubmit}: SignUpProps) {
  const [validEmail, setValidEmal] = useState<boolean>(true);
  // const isFormValid = !!user?.email && validLoginEmail && !!user?.password;

  const handleFullName = useCallback(
    (value: string) => {
      onRegistration("username", value);
    },
    [onRegistration]
  );

  const handleEmail = useCallback(
    (value: string) => {
      onRegistration("email", value);
      setValidEmal(isEmail(value));
    },
    [onRegistration]
  );

  const handlePassword = useCallback(
    (value: string) => {
      onRegistration("password", value);
    },
    [onRegistration]
  );


  return (
    <form
      className="p-8 growDown"
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Get started with your free account
      </p>
      <div className="mb-4">
        <TextInput value={user?.username} onChange={(value) => {handleFullName(value)}} label={"Full Name"} type={"text"} placeholder="Enter your full name"/>
        <TextInput value={user?.email} onChange={(value) => {handleEmail(value)}} valid={validEmail} label={"Email"} type={"email"} placeholder="Enter your email"/>
        <PasswordConfirmationGroup value={user?.password} onChangePassword={(value) => handlePassword(value)} />
      </div>

      <label className="flex items-center gap-2 text-gray-600 text-sm mb-4">
        <input type="checkbox" required />
        <span>
          I agree to the{" "}
          <a href="#" className="text-blue-500">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
        </span>
      </label>
      <button className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-600">
        Create Account
      </button>
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <button
          className="text-blue-500 font-medium cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            goTo("login");
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default SignUp;