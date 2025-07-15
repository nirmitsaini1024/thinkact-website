"use client";

import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import signIn from "../../../public/assets/signin/sign-in.png";
// import logo from "../../../public/assets/logo-small.png";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Attempting sign-in", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-5xl p-5 flex items-center gap-6 bg-white rounded-2xl shadow-lg border border-[#B3C2FF] overflow-hidden relative">
        {/* Large Screen Back Button - Positioned absolutely in body */}
        <Link
          href={"/"}
          className="fixed top-6 left-6 z-50 text-gray-600 hover:text-gray-800 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 max-md:hidden"
          aria-label="Go back"
        >
          <FaArrowLeft size={20} />
        </Link>

        {/* Left Section */}
        <div className="p-4 w-full md:w-1/2 flex flex-col justify-center relative">
          {/* Mobile Back Button - Inside the div */}
          <Link
            href={"/"}
            className="absolute top-0 left-0 text-gray-600 hover:text-gray-800 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 md:hidden"
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </Link>

          <div className="mb-4 flex flex-col items-center md:items-start">
            <Image
              src="/assets/logo-small.png"
              alt="Logo"
              className="w-10 h-10 mb-2 mx-auto md:mx-0"
              width={40}
              height={40}
            />
            <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
              Create an Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-primary 
                    transition duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-primary 
                    transition duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-primary 
                    transition duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                  @
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Create a strong password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-primary 
                    transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center 
                    text-gray-400 hover:text-gray-600 transition"
                >
                  {isPasswordVisible ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-3 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms-conditions"
                  className="text-primary hover:underline font-semibold"
                >
                  Terms & Conditions
                </Link>{" "}
              </label>
            </div>

            <button
              type="submit"
              disabled={!termsAccepted}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl 
                transition duration-300 ease-in-out 
                hover:bg-blue-700 hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                "
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-[#2B2B2B] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:w-1/2 md:block bg-[#F3F6FF] rounded-2xl p-5">
          <Image
            src="/assets/signin/sign-in.png"
            alt="Sign In"
            className="w-full p-4"
            width={500}
            height={500}
          />
          <h2 className="font-bold text-gray-800">
            Transform Data into Cool Insights
          </h2>
          <p className="text-gray-400 mt-2 text-xs">
            Make informed decision with ThinkAct AI powerful analytics tools,
            Harness the power of data to drive your business forward with
            ThinkAct AI Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
