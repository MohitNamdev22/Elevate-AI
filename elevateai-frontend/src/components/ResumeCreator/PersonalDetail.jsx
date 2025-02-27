import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../contexts/ResumeInfoContext';
import GlobalApi from '../../services/GlobalApi';

import { FaSave } from 'react-icons/fa';

const PersonalDetail = ({ onNext, resumeId }) => {
  // Update context destructuring to include setResumeInfo
  const { resumeInfo, updateResumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    themeColor: '#000000'
  });

  // Remove duplicate useEffect and combine the logic
  useEffect(() => {
    const loadResumeData = async () => {
      if (resumeId && resumeId !== 'new') {
        try {
          console.log('Loading resumes data for ID:', resumeId);
          const userId = localStorage.getItem('userId');
          const resumes = await GlobalApi.getResumes(userId);
          
          const resume = resumes.find(r => r._id === resumeId);
          console.log('Found Resume:', resume);

          if (resume) {
            const newFormData = {
              firstName: resume.firstName || '',
              lastName: resume.lastName || '',
              jobTitle: resume.jobTitle || '',
              address: resume.address || '',
              phone: resume.phone || '',
              email: resume.email || '',
              themeColor: resume.themeColor || '#000000'
            };
            
            console.log('Setting form data:', newFormData);
            setFormData(newFormData);
            
            // Update context with personal section
            updateResumeInfo('personal', newFormData);
            
            // Update other sections
            if (resume.experience) updateResumeInfo('experience', resume.experience);
            if (resume.education) updateResumeInfo('education', resume.education);
            if (resume.skills) updateResumeInfo('skills', resume.skills);
            if (resume.summary) updateResumeInfo('summary', resume.summary);
          } else {
            console.error('Resume not found:', resumeId);
          }
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      }
    };

    loadResumeData();
  }, [resumeId, updateResumeInfo, setResumeInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    // Update the personal info structure to match the context structure
    updateResumeInfo('personalInfo', {
      ...resumeInfo.personalInfo,
      [name]: value
    });
  
    // Update jobTitle separately since it's at the root level
    if (name === 'jobTitle') {
      updateResumeInfo('jobTitle', value);
    }
  
    // Update themeColor separately since it's at the root level
    if (name === 'themeColor') {
      updateResumeInfo('themeColor', value);
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Saving form data:', formData);
      const apiData = {
        userId: localStorage.getItem('userId'),
        ...formData
      };
  
      await GlobalApi.updateResume(resumeId, apiData);
      console.log('Save successful');
      
      // Update the context with proper structure
      updateResumeInfo('personalInfo', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
      
      // Update root level fields
      updateResumeInfo('jobTitle', formData.jobTitle);
      updateResumeInfo('themeColor', formData.themeColor);
      
      setLoading(false);
      onNext();
    } catch (error) {
      console.error('Save Error:', error);
      setLoading(false);
    }
  };

useEffect(() => {
  console.log('Current Form Data:', formData);
  console.log('Current Resume Info:', resumeInfo);
}, [formData, resumeInfo]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name & Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Job Title & Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone & Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Theme Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Theme Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="themeColor"
                value={formData.themeColor}
                onChange={handleChange}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-500">{formData.themeColor}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaSave /> Save
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
