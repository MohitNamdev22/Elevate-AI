import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaLinkedin, FaTwitter, FaUpload } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import elevateAILogo from '../assets/elevateai-logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';


const Signup = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
  phoneNumber: '',
  location: '',
  role: selectedRole,
  profileImage: null,
  studentDetails: {
    university: '',
    yearOfStudy: '',
    skills: '', // Array of skills
    experience: [],
    achievements: [], // Array of achievements
    githubUrl: '',
    codeforcesUrl: '',
    leetcodeUrl: '',
    certificates: '', // Add this field
    achievements: '', 
  },
  recruiterDetails: {
    jobTitle: '',
    companyName: '',
    yearsOfExperience: '',
    professionalSummary: '',
    industryFocus: [],
    workModel: [],
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
    companyWebsite: '',
  },
    mentorDetails: {
      jobTitle: '',
      organization: '',
      experienceLevel: '',
      linkedinUrl: '', // Changed from twitterUrl
      aboutMe: '',
      hourlyRate: '',
      responseTime: '',
        degree: '',
        university: '',
        year: '',
      technicalSkills: '', // Changed from array to string
      availableSlots: ''
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
    console.log(name,value)
    if (name.includes('experience.')) {
      // Handle experience array updates
      const [, index, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        studentDetails: {
          ...prev.studentDetails,
          experience: prev.studentDetails.experience.map((exp, i) => {
            if (i === parseInt(index)) {
              return { ...exp, [field]: value };
            }
            return exp;
          })
        }
      }));
    } else if (name.includes('.')) {
      // Handle other nested objects
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [`${type}Details`]: {
          ...prev[`${type}Details`],
          [parent]: {
            ...prev[`${type}Details`][parent],
            [child]: value
          }
        }
      }));
    } 
    
    else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [`${type}Details`]: {
          ...prev[`${type}Details`],
          [name]: value
        }
      }));
    }
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
    if (!formData.fullName || !formData.email) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
  
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  // Add this function inside your component
const handleAddExperience = () => {
  setFormData(prev => ({
    ...prev,
    studentDetails: {
      ...prev.studentDetails,
      experience: [
        ...prev.studentDetails.experience,
        { title: '', company: '', duration: '', description: '' }
      ]
    }
  }));
};

  const handleSubmit = async (e) => {

    console.log('handle submit')
    console.log(formData)
    e.preventDefault();
    setLoading(true);
  setError('');
    // if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          role: formData.role,
          email : formData.email,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          profileImage: formData.profileImage,
          studentDetails: formData.role === 'Student' ? formData.studentDetails : undefined,
          recruiterDetails: formData.role === 'Recruiter' ? formData.recruiterDetails : undefined,
          mentorDetails: formData.role === 'Mentor' ? formData.mentorDetails : undefined
        }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const userData = {
        userId: data.userId,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        profileImage: formData.profileImage,
        [formData.role.toLowerCase() + 'Details']: formData[formData.role.toLowerCase() + 'Details']
      };
  
      localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userId', data.userId);
  

      if(formData.role === 'Student'){
        navigate('/student/dashboard', { state: { message: 'Registration successful! Please log in.' } });
      }
      else if(formData.role === 'Recruiter'){
        navigate('/recruiter/dashboard', { state: { message: 'Registration successful! Please log in.' } });
      }
      else if(formData.role === 'Mentor'){
        navigate('/mentor/dashboard', { state: { message: 'Registration successful! Please log in.' } });
      }
     
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
    Complete Your Profile
  </h1>
  <p className="text-gray-600">
    Help us personalize your experience
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
              onClick={() => {
                setSelectedRole('Student');
                setFormData(prev => ({ ...prev, role: 'Student' }));
              }}
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
              onClick={() => {
                setSelectedRole('Recruiter');
                setFormData(prev => ({ ...prev, role: 'Recruiter' }));
              }}
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
              onClick={() => {
                setSelectedRole('Mentor');
                setFormData(prev => ({ ...prev, role: 'Mentor' }));
              }}
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

            {/* <div className="grid grid-cols-2 gap-4">
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
            </div> */}

            {/* Role-Specific Fields */}
            {selectedRole === 'Student' && (
              <>
              <div className="space-y-6">
                {/* Education Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University/College</label>
                    <input
                      type="text"
                      name="university"
                      placeholder="Enter your university name"
                      value={formData.studentDetails.university}
                      onChange={(e) => handleRoleSpecificChange(e, 'student')}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                    <select
                      name="yearOfStudy"
                      value={formData.studentDetails.yearOfStudy}
                      onChange={(e) => handleRoleSpecificChange(e, 'student')}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">Final Year</option>
                    </select>
                  </div>
                </div>
          
                {/* Skills */}
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
  <input
    type="text"
    name="skills"
    placeholder="Enter skills (e.g., React, Node.js, Python, AWS)"
    value={formData.studentDetails.skills}
    onChange={(e) => handleRoleSpecificChange(e, 'student')}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Certificates</label>
  <input
    type="text"
    name="certificates"
    placeholder="Enter your certifications (e.g., AWS Solutions Architect, Google Cloud Engineer)"
    value={formData.studentDetails.certificates}
    onChange={(e) => handleRoleSpecificChange(e, 'student')}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <p className="text-sm text-gray-500 mt-1">Separate certificates with commas</p>
</div>

{/* Achievements */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
  <textarea
    name="achievements"
    placeholder="Enter your achievements and accomplishments"
    value={formData.studentDetails.achievements}
    onChange={(e) => handleRoleSpecificChange(e, 'student')}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows={3}
  />
  <p className="text-sm text-gray-500 mt-1">Include academic awards, hackathon wins, or other notable accomplishments</p>
</div>
          
                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  {formData.studentDetails.experience.map((exp, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-lg mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name={`experience.${index}.title`}
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => handleRoleSpecificChange(e, 'student')}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name={`experience.${index}.company`}
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => handleRoleSpecificChange(e, 'student')}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <textarea
                        name={`experience.${index}.description`}
                        placeholder="Description of your role and responsibilities"
                        value={exp.description}
                        onChange={(e) => handleRoleSpecificChange(e, 'student')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddExperience()}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Experience
                  </button>
                </div>
          
                {/* Connected Platforms */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">Connect Platforms</p>
                  <div className="space-y-3">
                    <div className="relative">
                      <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="githubUrl"
                        placeholder="GitHub Username"
                        value={formData.studentDetails.githubUrl}
                        onChange={(e) => handleRoleSpecificChange(e, 'student')}
                        className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="relative">
                      <SiLeetcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="leetcodeUrl"
                        placeholder="LeetCode Username"
                        value={formData.studentDetails.leetcodeUrl}
                        onChange={(e) => handleRoleSpecificChange(e, 'student')}
                        className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
            </>
            )}

            {selectedRole === 'Recruiter' && (
               <>
               <div className="space-y-6">
                 <h3 className="text-lg font-medium">Professional Information</h3>
                 
                 {/* Job Title and Company */}
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                     <input
                       type="text"
                       name="jobTitle"
                       placeholder="e.g., Senior Technical Recruiter"
                       value={formData.recruiterDetails.jobTitle}
                       onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                   </div>
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
                 </div>
           
                 {/* Years of Experience */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                   <input
                     type="number"
                     name="yearsOfExperience"
                     placeholder="Enter years of experience"
                     value={formData.recruiterDetails.yearsOfExperience}
                     onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                 </div>
           
                 {/* Professional Summary */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                   <textarea
                     name="professionalSummary"
                     placeholder="Describe your recruiting experience and expertise..."
                     value={formData.recruiterDetails.professionalSummary}
                     onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     rows={4}
                   />
                 </div>
           
                 {/* Industry Focus */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Industry Focus</label>
                   <input
                     type="text"
                     name="industryFocus"
                     placeholder="e.g., Software Development, Product Management, Data Science"
                     value={formData.recruiterDetails.industryFocus}
                     onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                   <p className="text-sm text-gray-500 mt-1">Separate areas with commas</p>
                 </div>
           
                 {/* Work Model */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Work Model Preferences</label>
                   <input
                     type="text"
                     name="workModel"
                     placeholder="e.g., Remote, Hybrid, On-site"
                     value={formData.recruiterDetails.workModel}
                     onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                   <p className="text-sm text-gray-500 mt-1">Separate preferences with commas</p>
                 </div>
           
                 {/* Connected Accounts */}
                 <div className="space-y-4">
                   <p className="text-sm font-medium text-gray-700">Connected Accounts</p>
                   <div className="space-y-3">
                     <div className="relative">
                       <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                       <input
                         type="url"
                         name="linkedinUrl"
                         placeholder="LinkedIn Profile URL"
                         value={formData.recruiterDetails.linkedinUrl}
                         onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                         className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                     <div className="relative">
                       <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                       <input
                         type="text"
                         name="githubUrl"
                         placeholder="GitHub Username"
                         value={formData.recruiterDetails.githubUrl}
                         onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                         className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                     <div className="relative">
                       <FaTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                       <input
                         type="text"
                         name="twitterUrl"
                         placeholder="X Username"
                         value={formData.recruiterDetails.twitterUrl}
                         onChange={(e) => handleRoleSpecificChange(e, 'recruiter')}
                         className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                   </div>
                 </div>
           
                 {/* Company Website */}
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
             </>
            )}

{selectedRole === 'Mentor' && (
  <>
    <div className="space-y-6">
      {/* Existing fields... */}

      {/* About Me Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
        <textarea
          name="aboutMe"
          placeholder="Tell us about your expertise and mentoring style..."
          value={formData.mentorDetails.aboutMe}
          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="degree"
            placeholder="Degree (e.g., M.Sc. Computer Science)"
            value={formData.mentorDetails.degree}
            onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="university"
            placeholder="University"
            value={formData.mentorDetails.university}
            onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
        <input
          type="text"
          name="technicalSkills"
          placeholder="Enter skills (e.g., React, Node.js, AWS, TypeScript)"
          value={formData.mentorDetails.technicalSkills}
          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
      </div>


      {/* Mentorship Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
          <input
            type="number"
            name="hourlyRate"
            placeholder="Enter your hourly rate"
            value={formData.mentorDetails.hourlyRate}
            onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Slots per Week</label>
          <input
            type="number"
            name="availableSlots"
            placeholder="Number of slots"
            value={formData.mentorDetails.availableSlots}
            onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Response Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
        <select
          name="responseTime"
          value={formData.mentorDetails.responseTime}
          onChange={(e) => handleRoleSpecificChange(e, 'mentor')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select response time</option>
          <option value="within12">Within 12 hours</option>
          <option value="within24">Within 24 hours</option>
          <option value="within48">Within 48 hours</option>
        </select>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        {/* Existing LinkedIn and GitHub fields... */}
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