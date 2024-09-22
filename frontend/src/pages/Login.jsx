import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://task4-back.onrender.com/task4/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        navigate('/dashboard')
      } else {
        console.log(data.message);
        setErrors([
          data.message ||
            "An unexpected error occurred. Please try again later.",
        ]);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen w-screen flex justify-center items-center">
      <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
        <div className="bg-white border overflow-hidden sm:rounded-md rounded-none">
          <div className="p-6">
            {errors.length > 0 && (
              <div className="mb-4">
                <div className="text-red-600 dark:text-red-400 text-sm">
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  className="p-2 text-sm border bg-slate-50 rounded-md w-full"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="p-2 text-sm border bg-slate-50 rounded-md w-full"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
              </div>
              <div className="flex justify-center mt-6 mb-4">
                <button
                  type="submit"
                  className="rounded-md p-2 w-full text-white bg-blue-500"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-auto mt-px border-t border-dashed border-gray-200"></div>
              <div className="mx-4 text-secondary"></div>
              <div className="flex-auto mt-px border-t border-dashed border-gray-200"></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Don&#39;t have an account ?
              <a href="/register" className="text-blue-500 ms-1">
                <b>Register</b>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
