import React, { useState } from 'react';
import Sidebar from "./Sidebar";

const JobPostingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    requiredSkills: [],
    experienceLevel: 'Senior'
  });

  const steps = [
    { number: 1, title: 'Job Details', isActive: true },
    { number: 2, title: 'Job Type & Location', isActive: false },
    { number: 3, title: 'Benefits', isActive: false },
    { number: 4, title: 'Preview', isActive: false }
  ];

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Create a Job Listing</h1>
          <p className="text-gray-600">Share your opportunities with top talent in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                {/* Step Circle */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  s.number === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {s.number}
                </div>
                
                {/* Step Title */}
                <span className={`ml-2 ${
                  s.number === 1 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {s.title}
                </span>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-24 h-[2px] mx-2 bg-blue-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl">
          <h2 className="text-xl font-semibold mb-6">Job Details</h2>
          
          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                placeholder="Describe the role, responsibilities, and required skills in detail"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.jobDescription}
                onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="Add skills (e.g, React, Node.js, Python)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <div className="flex gap-4">
                {['Entry Level', 'Intermediate', 'Senior', 'Lead'].map((level) => (
                  <button
                    key={level}
                    className={`px-6 py-2 rounded-lg ${
                      formData.experienceLevel === level
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                        : 'border border-gray-300 text-gray-600'
                    }`}
                    onClick={() => setFormData({...formData, experienceLevel: level})}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600">
              Back
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Next Step →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;