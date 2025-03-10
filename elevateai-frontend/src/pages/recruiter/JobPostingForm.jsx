import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    companyName: '',
    requiredSkills: '',
    experienceLevel: 'Senior',
    jobType: '',
    workLocation: '',
    location: '',
    benefits: [],
    recruiter:'',
    salaryRange: {
      currency: 'USD',
      min: '',
      max: ''
    }
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        recruiter: userId
      }));
    }
  }, []);
  const steps = [
    { number: 1, title: 'Job Details' },
    { number: 2, title: 'Job Type & Location' },
    { number: 3, title: 'Benefits' },
    { number: 4, title: 'Preview' }
  ];

  const categories = [
    'web-development',
    'backend-development',
    'frontend-development',
    '3d-printing',
    'data-science',
    'graphic-design',
    'machine-learning'
  ];

  const handleSubmit = async () => {
    console.log('Form Submitted:', formData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/internships/post-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Job posted successfully:', result);
        toast.success('Job posted successfully:', result.message);
        
        navigate('/recruiter/dashboard')
        // Reset form or navigate to another page
      } else {
        console.error('Failed to post job:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Create a Job Listing</h1>
          <p className="text-gray-600">Share your opportunities with top talent in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  s.number <= step ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {s.number}
                </div>
                <span className={`ml-2 ${
                  s.number <= step ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-24 h-[2px] mx-2 bg-blue-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Sections */}
        <div className="flex justify-center">
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl w-full">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Job Details</h2>
              <div className="space-y-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Corp"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={formData.requiredSkills}
                    onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})}
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

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
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Job Type & Location</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <div className="flex gap-4">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <button
                        key={type}
                        className={`px-6 py-2 rounded-lg ${
                          formData.jobType === type
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                            : 'border border-gray-300 text-gray-600'
                        }`}
                        onClick={() => setFormData({...formData, jobType: type})}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Location
                  </label>
                  <div className="flex gap-4">
                    {['Remote', 'Onsite', 'Hybrid'].map((location) => (
                      <button
                        key={location}
                        className={`px-6 py-2 rounded-lg ${
                          formData.workLocation === location
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                            : 'border border-gray-300 text-gray-600'
                        }`}
                        onClick={() => setFormData({...formData, workLocation: location})}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {(formData.workLocation === 'Onsite' || formData.workLocation === 'Hybrid') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Office Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter office location"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Benefits</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Benefits
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Health Insurance', 'Paid Time Off', 'Remote Work', 'Flexible Hours', 'Dental Care', 'Vision Care'].map((benefit) => (
                      <label key={benefit} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.benefits.includes(benefit)}
                          onChange={(e) => {
                            const updatedBenefits = e.target.checked
                              ? [...formData.benefits, benefit]
                              : formData.benefits.filter(b => b !== benefit);
                            setFormData({...formData, benefits: updatedBenefits});
                          }}
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span className="text-gray-600">{benefit}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range (per year)
                  </label>
                  <div className="flex gap-4">
                    <select
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      value={formData.salaryRange.currency}
                      onChange={(e) => setFormData({
                        ...formData,
                        salaryRange: {...formData.salaryRange, currency: e.target.value}
                      })}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      value={formData.salaryRange.min}
                      onChange={(e) => setFormData({
                        ...formData,
                        salaryRange: {...formData.salaryRange, min: e.target.value}
                      })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      value={formData.salaryRange.max}
                      onChange={(e) => setFormData({
                        ...formData,
                        salaryRange: {...formData.salaryRange, max: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Preview</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Job Title</h3>
                  <p className="text-gray-900">{formData.jobTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Job Description</h3>
                  <p className="text-gray-900 whitespace-pre-line">{formData.jobDescription}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Required Skills</h3>
                  <p className="text-gray-900">{formData.requiredSkills}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Experience Level</h3>
                  <p className="text-gray-900">{formData.experienceLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Job Type</h3>
                  <p className="text-gray-900">{formData.jobType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Work Location</h3>
                  <p className="text-gray-900">
                    {formData.workLocation} 
                    {formData.workLocation !== 'Remote' && ` (${formData.location})`}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Benefits</h3>
                  <p className="text-gray-900">{formData.benefits.join(', ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Salary Range</h3>
                  <p className="text-gray-900">
                    {formData.salaryRange.currency} {formData.salaryRange.min} - {formData.salaryRange.max}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-600 ${
                step === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </button>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
            >
              {step === 4 ? 'Post Job' : 'Next Step →'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;