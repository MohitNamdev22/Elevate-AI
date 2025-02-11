import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaLinkedin, FaUpload } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import elevateAILogo from '../assets/elevateai-logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    role: 'Student',
    profileImage: null,
    studentDetails: {
      areaOfInterest: '',
      githubUrl: '',
      codeforcesUrl: '',
      leetcodeUrl: ''
    },
    recruiterDetails: {
      companyName: '',
      industry: '',
      companySize: '',
      companyWebsite: '',
      jobTitle: '',
      referralCode: ''
    },
    mentorDetails: {
      jobTitle: '',
      organization: '',
      experienceLevel: '',
      weeklyCommitment: '',
      linkedinUrl: '',
      githubUrl: '',
      personalWebsite: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSpecificChange = (e, type) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [`${type}Details`]: {
        ...prev[`${type}Details`],
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    console.log('handle submit')
    e.preventDefault();
    // if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          profileImage: formData.profileImage,
          studentDetails: formData.role === 'Student' ? formData.studentDetails : undefined,
          recruiterDetails: formData.role === 'Recruiter' ? formData.recruiterDetails : undefined,
          mentorDetails: formData.role === 'Mentor' ? formData.mentorDetails : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/student/dashboard', { state: { message: 'Registration successful! Please log in.' } });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
              type="button"
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
              type="button"
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
              type="button"
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                    onChange={handleImageUpload}
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

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={handleInputChange}
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
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
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

            {/* Role-Specific Fields */}
            {selectedRole === 'Student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
                  <select
                    name="areaOfInterest"
                    value={formData.studentDetails.areaOfInterest}
                    onChange={(e) => handleRoleSpecificChange(e, 'student')}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
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
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <FaGithub className="text-gray-700" />
                      <span>GitHub</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <SiCodeforces className="text-gray-700" />
                      <span>Codeforces</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <SiLeetcode className="text-gray-700" />
                      <span>LeetCode</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Skip for now
                  </button>
                </div>
              </>
            )}

            {selectedRole === 'Recruiter' && (
              <>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Enter company name"
                        value={formData.recruiterDetails.companyName}
                        onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        name="industry"
                        value={formData.recruiterDetails.industry}
                        onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
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
                      <select
                        name="companySize"
                        value={formData.recruiterDetails.companySize}
                        onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
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
                        name="companyWebsite"
                        placeholder="https://company.com"
                        value={formData.recruiterDetails.companyWebsite}
                        onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      placeholder="Your job title"
                      value={formData.recruiterDetails.jobTitle}
                      onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
                    <input
                      type="text"
                      name="referralCode"
                      placeholder="Enter referral code"
                      value={formData.recruiterDetails.referralCode}
                      onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedRole === 'Mentor' && (
              <>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder="Current job title"
                        value={formData.mentorDetails.jobTitle}
                        onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Current organization"
                        value={formData.mentorDetails.organization}
                        onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                      <select
                        name="experienceLevel"
                        value={formData.mentorDetails.experienceLevel}
                        onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select experience level</option>
                        <option value="junior">Junior (1-3 years)</option>
                        <option value="mid">Mid-Level (4-6 years)</option>
                        <option value="senior">Senior (7-10 years)</option>
                        <option value="expert">Expert (10+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Time Commitment</label>
                      <select
                        name="weeklyCommitment"
                        value={formData.mentorDetails.weeklyCommitment}
                        onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
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
                          name="linkedinUrl"
                          placeholder="LinkedIn Profile URL"
                          value={formData.mentorDetails.linkedinUrl}
                          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                          className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="url"
                          name="githubUrl"
                          placeholder="GitHub Profile URL"
                          value={formData.mentorDetails.githubUrl}
                          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                          className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="url"
                          name="personalWebsite"
                          placeholder="Personal Website URL"
                          value={formData.mentorDetails.personalWebsite}
                          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
                          className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

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
              disabled={!acceptedTerms || loading}
            >
              {loading ? 'Loading...' : selectedRole === 'Student' ? 'Continue' : 'Complete Registration'}
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