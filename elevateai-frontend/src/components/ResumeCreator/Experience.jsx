import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../contexts/ResumeInfoContext';
import GlobalApi from '../../services/GlobalApi';
import { FaSave, FaPlus, FaTrash, FaMagic } from 'react-icons/fa';
import { toast } from 'sonner';

const Experience = ({ onNext, resumeId }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experiences, setExperiences] = useState(resumeInfo.experiences || []);
  const [form, setForm] = useState({
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummary: '',
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Load experiences from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`resume_${resumeId}_experience`);
    if (savedData) setExperiences(JSON.parse(savedData));
  }, [resumeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenerateAI = async () => {
    if (!form.title) {
      toast('Please add position title first');
      return;
    }
    setGenerating(true);
    try {
      const response = await GlobalApi.generateExperience({
        title: form.title,
        companyName: form.companyName,
      });
      setForm((prev) => ({ ...prev, workSummary: response.content }));
    } catch (error) {
      console.error('AI Generation error:', error);
      toast.error('Failed to generate experience content');
    } finally {
      setGenerating(false);
    }
  };

  const addExperience = () => {
    const newExperiences = [...experiences, { ...form }];
    setExperiences(newExperiences);
    localStorage.setItem(`resume_${resumeId}_experience`, JSON.stringify(newExperiences));
    setForm({
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      workSummary: '',
    });
  };

  const removeExperience = (index) => {
    const newExperiences = experiences.filter((_, idx) => idx !== index);
    setExperiences(newExperiences);
    localStorage.setItem(`resume_${resumeId}_experience`, JSON.stringify(newExperiences));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const apiData = {
        userId: localStorage.getItem('userId'),
        experience: experiences,
      };
      setResumeInfo({ ...resumeInfo, experience: experiences });
      await GlobalApi.updateResume(resumeId, apiData);
      setLoading(false);
      onNext();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional Experience</h2>

      {/* Experience List */}
      <div className="space-y-4 mb-6">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">{exp.title}</h3>
              <button
                onClick={() => removeExperience(index)}
                className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
            <p className="text-gray-700">{exp.companyName}</p>
            <p className="text-sm text-gray-600">
              {exp.city}, {exp.state} | {exp.startDate} -{' '}
              {exp.currentlyWorking ? 'Present' : exp.endDate}
            </p>
            <p className="mt-2 text-gray-600 text-sm">{exp.workSummary}</p>
          </div>
        ))}
      </div>

      {/* Add Experience Form */}
      <div className="space-y-6 border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Add Experience</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
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
            disabled={form.currentlyWorking}
            required={!form.currentlyWorking}
          />
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={form.currentlyWorking}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Currently Working Here</label>
          </div>
          <div className="col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Work Summary</label>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={generating}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <>
                    <FaMagic className="text-sm" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
            <textarea
              name="workSummary"
              value={form.workSummary}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Describe your key responsibilities and achievements..."
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="w-full sm:w-auto flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          <FaPlus className="text-sm" />
          Add Experience
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

export default Experience;