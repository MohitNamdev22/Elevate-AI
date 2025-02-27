import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../contexts/ResumeInfoContext';
import GlobalApi from '../../services/GlobalApi';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const Education = ({ onNext, resumeId }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [education, setEducation] = useState(resumeInfo.education || []);
  const [form, setForm] = useState({
    universityName: '',
    startDate: '',
    endDate: '',
    degree: '',
    major: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`resume_${resumeId}_education`);
    if (savedData) setEducation(JSON.parse(savedData));
  }, [resumeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addEducation = () => {
    if (!form.universityName || !form.degree || !form.major || !form.startDate || !form.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    const newEducation = [...education, { ...form }];
    setEducation(newEducation);
    localStorage.setItem(`resume_${resumeId}_education`, JSON.stringify(newEducation));
    setForm({
      universityName: '',
      startDate: '',
      endDate: '',
      degree: '',
      major: '',
      description: '',
    });
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, idx) => idx !== index);
    setEducation(newEducation);
    localStorage.setItem(`resume_${resumeId}_education`, JSON.stringify(newEducation));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (education.length === 0) {
        alert('Please add at least one education entry');
        setLoading(false);
        return;
      }

      const apiData = {
        userId: localStorage.getItem('userId'),
        education: education,
      };

      await GlobalApi.updateResume(resumeId, apiData);
      setResumeInfo({ ...resumeInfo, education });
      setLoading(false);
      onNext();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>

      {/* Education List */}
      <div className="space-y-4 mb-6">
        {education.map((edu, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">{edu.universityName}</h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
            <p className="text-gray-700">{edu.degree} in {edu.major}</p>
            <p className="text-sm text-gray-600">
              {edu.startDate} - {edu.endDate}
            </p>
            <p className="mt-2 text-gray-600 text-sm">{edu.description}</p>
          </div>
        ))}
      </div>

      {/* Add Education Form */}
      <div className="space-y-6 border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Add Education</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="universityName"
            placeholder="University Name"
            value={form.universityName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="major"
            placeholder="Major"
            value={form.major}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="month"
            name="startDate"
            placeholder="Start Date"
            value={form.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="month"
            name="endDate"
            placeholder="End Date"
            value={form.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Description (e.g., achievements, coursework)"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none col-span-2"
          />
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="w-full sm:w-auto flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          <FaPlus className="text-sm" />
          Add Education
        </button>
      </div>

      {/* Save Button */}
      <div className="mt-8 border-t pt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="text-sm" />
              Save & Continue
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Education;