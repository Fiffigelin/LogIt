import PasswordInput from "../../input/password-input/password-input";
import type { AuthProps } from "../auth-form";

function Login({showPassword, handleShowPassword}: AuthProps) {
  return (
    <form
      className="p-8 growDown"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Login submitted!");
      }}
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Please enter your details to sign in
      </p>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>
      <PasswordInput showPassword={showPassword} handleShowPassword={handleShowPassword} />

      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-gray-600 text-sm">Remember me</span>
        </label>
        <a className="text-blue-500 text-sm" href="#">
          Forgot password?
        </a>
      </div>
      <button className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
        Sign In
      </button>
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <button
          className="text-blue-500 font-medium"
          onClick={(e) => {
            e.preventDefault();
            console.log(false);
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;