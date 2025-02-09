import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaLinkedin, FaUpload } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { Link } from 'react-router-dom';
import elevateAILogo from '../assets/elevateai-logo.svg';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [profileImage, setProfileImage] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Common form fields for all roles
  const CommonFields = () => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUpload className="text-gray-400 text-xl" />
            )}
          </div>
          <div>
            <input
              type="file"
              id="profile-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <label
              htmlFor="profile-upload"
              className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Upload Photo
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City, Country"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Student specific fields
  const StudentFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Select your area of interest</option>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile Development</option>
          <option value="ai">AI/ML</option>
          <option value="data">Data Science</option>
        </select>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">Connect with Other Platforms</p>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FaGithub className="text-gray-700" />
            <span>GitHub</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <SiCodeforces className="text-gray-700" />
            <span>Codeforces</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <SiLeetcode className="text-gray-700" />
            <span>LeetCode</span>
          </button>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700">Skip for now</button>
      </div>
    </>
  );

  // Recruiter specific fields
  const RecruiterFields = () => (
    <>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Company Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select industry</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select company size</option>
              <option value="1-50">1-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
            <input
              type="url"
              placeholder="https://company.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="Your job title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
          <input
            type="text"
            placeholder="Enter referral code"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );

  // Mentor specific fields
  const MentorFields = () => (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Current job title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input
              type="text"
              placeholder="Current organization"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select experience level</option>
              <option value="junior">Junior (1-3 years)</option>
              <option value="mid">Mid-Level (4-6 years)</option>
              <option value="senior">Senior (7-10 years)</option>
              <option value="expert">Expert (10+ years)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Time Commitment</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select availability</option>
              <option value="1-2">1-2 hours/week</option>
              <option value="3-5">3-5 hours/week</option>
              <option value="5-10">5-10 hours/week</option>
              <option value="10+">10+ hours/week</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Professional Links</label>
          <div className="space-y-3">
            <div className="relative">
              <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="LinkedIn Profile URL"
                className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="GitHub Profile URL"
                className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="Personal Website URL"
                className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Logo */}
      <Link to="/" className="flex items-center mb-8 hover:opacity-80 transition-opacity">
        <img src={elevateAILogo} alt="ElevateAI" className="h-8" />
        <span className="ml-2 text-xl font-semibold">ElevateAI</span>
      </Link>

      {/* Main Form Container */}
      <div className="w-full max-w-2xl space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">
            Join ElevateAI—Tailored Just for You!
          </h1>
          <p className="text-gray-600">
            Select your role to get started with a personalized experience
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-gray-100 p-1 rounded-lg">
          <div className="flex justify-between">
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                selectedRole === 'Student'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRole('Student')}
            >
              👨‍🎓 Student
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                selectedRole === 'Recruiter'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRole('Recruiter')}
            >
              👥 Recruiter
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                selectedRole === 'Mentor'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRole('Mentor')}
            >
              👨‍🏫 Mentor
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
          <form className="space-y-6">
            <CommonFields />
            {selectedRole === 'Student' && <StudentFields />}
            {selectedRole === 'Recruiter' && <RecruiterFields />}
            {selectedRole === 'Mentor' && <MentorFields />}

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 border rounded-lg hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Registration Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!acceptedTerms}
            >
              {selectedRole === 'Student' ? 'Continue' : 'Complete Registration'}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;