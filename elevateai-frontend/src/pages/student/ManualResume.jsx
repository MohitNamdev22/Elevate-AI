import React, { useState } from 'react';
import Sidebar from './Sidebar';

const PlusIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ManualResume = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    summary: '',
    workExperience: [],
    education: [],
    skills: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, e.target.value]
      }));
      e.target.value = '';
    }
  };

  return (
    <div className="flex bg-[#F8FAFC]">
            <Sidebar />
    <div className="mt-16 w-full min-h-screen p-6">
      {/* Left Section - Form */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Build Your Resume Manually</h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Save Draft
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Preview Template
              </button>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Professional Title</label>
                <input
                  type="text"
                  name="professionalTitle"
                  placeholder="e.g. Software Engineer"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.professionalTitle}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.phone}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  placeholder="linkedin.com/in/username"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.linkedinUrl}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  placeholder="github.com/username"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.githubUrl}
                />
              </div>
            </div>
          </div>

          {/* Professional Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>
            <textarea
              name="summary"
              rows="4"
              placeholder="Write a professional summary (max 250 characters)"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleInputChange}
              value={formData.summary}
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Keep it concise and highlight your key professional achievements.
            </p>
          </div>

          {/* Work Experience Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
            <button className="w-full p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon />
              Add Work Experience
            </button>
          </div>

          {/* Education Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Education</h2>
            <button className="w-full p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon />
              Add Education
            </button>
          </div>

          {/* Skills Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <input
              type="text"
              placeholder="Add skills (e.g. JavaScript, Project Management)"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              onKeyDown={handleSkillsChange}
            />
            <p className="text-sm text-gray-500">Press Enter to add multiple skills</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Right Section - Preview */}
      <div className="w-[600px] bg-white p-8 border-l">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Your resume preview will appear here
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualResume;