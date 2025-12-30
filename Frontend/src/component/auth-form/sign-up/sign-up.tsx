import type { AuthProps } from "../auth-form";

function SignUp({showPassword, handleShowPassword}: AuthProps) {
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
        <label className="block mb-2 font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type={showPassword.signup ? "text" : "password"}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Create a password"
          required
        />
        <span
          className="absolute right-3 top-11 cursor-pointer text-gray-500"
          onClick={() => handleShowPassword("signup")}
        >
          👁️
        </span>
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type={showPassword.signupConfirm ? "text" : "password"}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Confirm password"
          required
        />
        <span
          className="absolute right-3 top-11 cursor-pointer text-gray-500"
          onClick={() => handleShowPassword("signupConfirm")}
        >
          👁️
        </span>
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
      <button className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
        Create Account
      </button>
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <button
          className="text-blue-500 font-medium"
          onClick={(e) => {
            e.preventDefault();
            console.log(true);
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default SignUp;