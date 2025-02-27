import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeInfoContext } from '../../contexts/ResumeInfoContext';
import GlobalApi from '../../services/GlobalApi';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const Skills = ({ onNext, resumeId }) => {
  const navigate = useNavigate();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skills, setSkills] = useState(resumeInfo.skills || []);
  const [form, setForm] = useState({ name: '', rating: 50 });
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`resume_${resumeId}_skills`);
    if (savedData) setSkills(JSON.parse(savedData));
  }, [resumeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? Number(value) : value });
  };

  const addSkill = () => {
    if (!form.name) return alert('Please enter a skill name');
    const newSkills = [...skills, { ...form }];
    setSkills(newSkills);
    localStorage.setItem(`resume_${resumeId}_skills`, JSON.stringify(newSkills));
    setForm({ name: '', rating: 50 });
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, idx) => idx !== index);
    setSkills(newSkills);
    localStorage.setItem(`resume_${resumeId}_skills`, JSON.stringify(newSkills));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (skills.length === 0) {
        alert('Please add at least one skill');
        return setLoading(false);
      }

      await GlobalApi.updateResume(resumeId, {
        userId: localStorage.getItem('userId'),
        skills: skills
      });
      
      setResumeInfo({ ...resumeInfo, skills });
      navigate(`/student/resume-generator/resume/${resumeId}/download`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>

      {/* Skills List */}
      <div className="space-y-3 mb-6">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-800 font-medium">{skill.name}</span>
            <button 
              onClick={() => removeSkill(index)}
              className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Skill Form */}
      <div className="space-y-4 border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Add Skill</h4>
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="Enter skill name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <button
            onClick={addSkill}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <FaPlus className="text-sm" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
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
              <svg 
                className="animate-spin h-5 w-5 mr-2" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FaSave />
              Save & Finalize
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Skills;