import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { 
  FaPlus, 
  FaShare, 
  FaCopy,
  FaCalendar,
  FaUsers,
  FaCode,
  FaArrowLeft,
  FaUpload
} from 'react-icons/fa';

// Main Hiring Challenges Page
const HiringChallenges = () => {
  const challenges = [
    {
      title: 'InnovaAI Hackathon',
      status: 'Active',
      duration: '2 days left',
      participants: '215 participants',
      skills: ['AI', 'Machine Learning'],
      applyBy: 'Apply before Jan 15, 2024',
      tags: ['AWS', 'Cloud Computing']
    },
    {
      title: 'Cloud Architecture Challenge',
      status: 'Active',
      duration: '5 days left',
      participants: '185 participants',
      applyBy: 'Apply before Feb 15, 2024',
      tags: ['AWS', 'Cloud Computing']
    },
    {
      title: 'Full Stack Development Sprint',
      status: 'Active',
      duration: '3 days left',
      participants: '150 participants',
      applyBy: 'Apply before Feb 20, 2024',
      tags: ['React', 'Node.js']
    }
  ];

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Engage Talent with Hiring Challenges</h1>
            <p className="text-gray-600">Organize, evaluate, and recruit the best talent through competitive hiring challenges designed for real-world problem solvers.</p>
          </div>
          <Link to="/recruiter/challenges/create-challenge">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FaPlus /> Create New Challenge
            </button>
          </Link>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">{challenge.title}</h3>
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                  {challenge.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendar className="text-gray-400" />
                  <span className="text-sm">{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-gray-400" />
                  <span className="text-sm">{challenge.participants}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-4">{challenge.applyBy}</p>

              <div className="flex gap-3">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  View Details
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <FaShare />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <FaCopy />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const CreateChallenge = () => {
  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [cashPrize, setCashPrize] = useState('');
  const [duration, setDuration] = useState('');
  const [target, setTarget] = useState('');
  const [submissionType, setSubmissionType] = useState('');

  const filledFields = [duration, target, submissionType, cashPrize].filter(Boolean).length;
  const progress = (filledFields / 4) * 100;

  const PreviewItem = ({ label, value }) => (
    <div>
      <span className="text-sm text-gray-600">{label}</span>
      <p className={value ? '' : 'text-gray-400 italic'}>
        {value || 'Not specified'}
      </p>
    </div>
  );

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/recruiter/challenges" className="text-gray-600 hover:text-gray-800">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-semibold">Create a New Hiring Challenge</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Publish Challenge
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Challenge Name
                  </label>
                  <input
                    type="text"
                    value={challengeName}
                    onChange={(e) => setChallengeName(e.target.value)}
                    placeholder="Tech Innovation Challenge 2025"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Describe the purpose, goals, and expected outcomes"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Challenge Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter challenge duration"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="E.g. Software Engineer"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submission Type
                  </label>
                  <select
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select submission type</option>
                    <option value="Code Upload">Code Upload</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Design Submission">Design Submission</option>
                  </select>
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FaUpload className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop problem statement file</p>
                  <p className="text-gray-400 text-sm">Maximum file size 50 MB</p>
                  <button className="mt-4 px-4 py-2 border rounded-lg text-gray-600">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Rewards and Perks</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Direct Hiring Opportunity</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cash Prize
                  </label>
                  <input
                    type="text"
                    value={cashPrize}
                    onChange={(e) => setCashPrize(e.target.value)}
                    placeholder="Enter prize amount"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Benefits
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Describe any additional perks"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Challenge Preview</h2>
              <div className="space-y-4">
              <PreviewItem label="" value={challengeName} />
                <PreviewItem label="Duration" value={duration && `${duration} days`} />
                <PreviewItem label="Target" value={target} />
                <PreviewItem label="Submission" value={submissionType} />
                <PreviewItem label="Prize" value={cashPrize && `$${cashPrize}`} />
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-right text-sm text-gray-600 mt-1">
                  {Math.round(progress)}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { HiringChallenges, CreateChallenge };