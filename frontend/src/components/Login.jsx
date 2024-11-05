import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const LoginForm = async () => {
    const response = await login(loginData);

    if (response.data.success) {
      toast("User Login Successfully");
      navigate("/");
      setLoginData({ email: "", password: "" });
    }
    if (response.data.errors.email) {
      setEmailError(response.data.errors.email);
    }

    if (response.data.errors.password) {
      setPasswordError(response.data.errors.password);
    }
  };

  const handleInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setEmailError("");
    }
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginForm();
  };

  return (
    <div className="min-h-[90vh]  w-full flex justify-center items-center p-2 dark:bg-gray-900">
      <div className="w-full max-w-md rounded bg-white shadow-lg p-4 dark:bg-gray-800">
        <h2 className="font-bold text-2xl text-center mb-6 dark:text-blue-500">
          Login
        </h2>

        <form className="space-y-4 dark:text-white" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              onChange={handleInput}
              className="w-full px-2 py-2 border border-gray-500 focus:outline-none focus:border-blue-500 rounded dark:bg-gray-800"
              placeholder="Enter Your Email"
              name="email"
              value={loginData.email}
              required
            />

            {emailError ? <p className="text-red-500">{emailError}</p> : null}
          </div>

          <div>
            <input
              type="password"
              onChange={handleInput}
              className="w-full px-2 py-2 border border-gray-500 focus:outline-none focus:border-blue-500 rounded dark:bg-gray-800"
              placeholder="Enter Your Password"
              name="password"
              value={loginData.password}
              required
            />
            {passwordError ? (
              <p className="text-red-500">{passwordError}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>

          <p>
            Don't have an Account ?
            <Link
              to="/signup"
              className="text-blue-500 ml-2 border-b border-b-blue-500 p-1"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
