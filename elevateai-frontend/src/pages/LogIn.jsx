import React from "react";
import logo from "../assets/images/logo.png";

function LogIn() {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-[35%] h-full bg-gradient-to-b from-[#1A365D] to-[#2563EB] relative flex flex-col p-10 pb-6 text-white">
        {/* Square Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center space-x-3">
          <img src={logo} alt="ElevateAI Logo" className="h-14 w-18" />
          <h2 className="text-3xl font-semibold">ElevateAI</h2>
        </div>

        {/* Welcome Message */}
        <div className="relative z-10 mt-12">
          <h1 className="text-5xl font-semibold leading-tight">
            Welcome to Your <br /> Professional Journey
          </h1>
          <h3 className="text-lg text-gray-300 mt-4">
            Connect with opportunities and talent across the globe
          </h3>
        </div>

        {/* Testimonial Box */}
        <div className="absolute bottom-16 left-10 right-10 bg-opacity-20 backdrop-white-md p-6 rounded-lg shadow-lg text-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none"></div>
          <p className="italic text-lg">
            "ElevateAI has transformed our recruitment process. It's intuitive and efficient."
          </p>
          <h4 className="mt-4 font-semibold text-xl ml-8">Sarah Johnson</h4>
          <p className="text-gray-200 ml-8">HR Director, Tech Corp</p>
        </div>

        {/* Trusted Companies Text */}
        <p className="absolute bottom-8 left-10 text-gray-300 text-sm">
          Trusted by 1000+ companies worldwide
        </p>
      </div>

      {/* Right Section */}
      <div className="w-[65%] flex items-center justify-center bg-white p-12">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-light mb-6 text-gray-900">Sign In</h2>
          <p className="text-gray-500 mb-12">Please sign in to continue to your account</p>
          
          <form className="space-y-4">
            
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg mt-1" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full p-3 border border-gray-300 rounded-lg mt-1" placeholder="Enter your password" />
            </div>
            <div className="flex justify-between">
                <div className="flex">
            <input className="mr-2 text-center items-center" type="checkbox"/>
            <label className="block text-gray-700">Remember me</label>
            </div>
            
            <a className="text-[#2563EB] hover:underline">Forgot Password</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </button>
          </form>
          
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          
          <button className="w-full flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
          
          <p className="mt-6 text-gray-500 text-center">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
