import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://task4-back.onrender.com/task4/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
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
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="p-2 text-sm border bg-slate-50 rounded-md w-full"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
              </div>

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
                  Register
                </button>
              </div>
            </form>
            {success && (
              <div className="text-center">
                <p>
                  <b>Registration successful</b>
                </p>
                <a className="text-blue-500" href="/">
                  go to login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
