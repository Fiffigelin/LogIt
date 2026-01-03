import PasswordInput, { type ShowPasswordState } from "../../input/password-input/password-input";
import TextInput from "../../input/text-input/text-input";
import type { AuthView } from "../auth-form";

type SignUpProps = {
  showPassword: ShowPasswordState,
  handleShowPassword: (field: keyof ShowPasswordState) => void;
  goTo: (view: AuthView) => void;
}

function SignUp({showPassword, handleShowPassword, goTo}: SignUpProps) {
  return (
    <form
      className="p-8 growDown"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Signup submitted!");
      }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Get started with your free account
      </p>
      <div className="mb-4">
        <TextInput label={"Full Name"} type={"text"} placeholder="Enter your full name"/>
        <TextInput label={"Email"} type={"email"} placeholder="Enter your email"/>
        <PasswordInput label={"Password"} showPassword={showPassword.signup} handleShowPassword={() => handleShowPassword("signup")} />
        <PasswordInput label={"Confirm Password"} showPassword={showPassword.signupConfirm} handleShowPassword={() => handleShowPassword("signupConfirm")} />
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