"use client";

import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import signIn from "../../../public/assets/signin/sign-in.png";
// import logo from "../../../public/assets/logo-small.png";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

export default function SignIn() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              Get Started
            </h2>
            <p className="text-gray-500 text-sm font-medium text-center md:text-left">
              Sign in to continue to ThinkAct AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={email}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-600 
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
                  placeholder="Enter your password"
                  value={password}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                    text-gray-800 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-600 
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

            <div className="flex justify-between items-center py-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 rounded text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-[#2B2B2B] font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl 
                transition duration-300 ease-in-out 
                hover:bg-blue-700 hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#2B2B2B] font-semibold hover:underline"
              >
                Sign Up
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
