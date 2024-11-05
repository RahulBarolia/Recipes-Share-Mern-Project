import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../context/AuthContext";
const Signup = () => {
  const navigate = useNavigate();

  const { register, isLoading } = useContext(AuthContext);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const Register = async () => {
    const response = await register(signupData);

    if (response.data.success) {
      toast(response.data.message);

      setSignupData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } else {
      console.log(response.data);
      if (response.data.errors.name) {
        setNameError(response.data.errors.name);
      }
      if (response.data.errors.email) {
        setEmailError(response.data.errors.email);
      }
      if (response.data.errors.password) {
        setPasswordError(response.data.errors.password);
      }
    }
  };

  console.log("Name Error", PasswordError);

  const handleSubmit = (e) => {
    e.preventDefault();
    Register();
  };

  const handleInput = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

    if (e.target.name === "name") {
      setNameError("");
    }
    if (e.target.name === "email") {
      setEmailError("");
    }
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-[90vh] dark:bg-gray-900 w-full bg-white flex justify-center items-center p-2">
      <div className="w-full max-w-md rounded bg-white shadow-lg p-4 dark:bg-gray-800">
        <h2 className="font-bold text-2xl text-center mb-6 dark:text-blue-500">
          Signup
        </h2>

        <form
          action=""
          className="space-y-4 dark:text-white "
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              onChange={handleInput}
              className="w-full px-2 py-2 border border-gray-500 focus:outline-none focus:border-blue-500 rounded dark:bg-gray-800 "
              placeholder="Enter Your Name"
              name="name"
              value={signupData.name}
              required
            />

            {nameError ? <p className="text-red-500">{nameError}</p> : null}
          </div>

          <div>
            <input
              type="text"
              onChange={handleInput}
              className="w-full px-2 py-2 border border-gray-500 focus:outline-none focus:border-blue-500 rounded dark:bg-gray-800"
              placeholder="Enter Your Email"
              name="email"
              value={signupData.email}
              required
            />
            {EmailError ? <p className="text-red-500">{EmailError}</p> : null}
          </div>

          <div>
            <input
              onChange={handleInput}
              type="password"
              className="w-full px-2 py-2 border border-gray-500 focus:outline-none focus:border-blue-500 rounded dark:bg-gray-800"
              placeholder="Enter Your Password"
              name="password"
              value={signupData.password}
              required
            />

            {PasswordError ? (
              <p className="text-red-500">{PasswordError}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
