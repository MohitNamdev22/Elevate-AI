import React from 'react';
import Sidebar from "./Sidebar";
import { 
  FaSearch, 
  FaFilter, 
  FaEnvelope, 
  FaPhone,
  FaEllipsisV 
} from 'react-icons/fa';

const CandidatesOverview = () => {
  // Sample data for statistics
  const stats = [
    { label: 'Total Applications', value: 156, change: '+12%' },
    { label: 'Shortlisted', value: 48, change: '+5%' },
    { label: 'Pending Review', value: 28, change: '-3%' },
    { label: 'Rejected', value: 12, change: '+2%' }
  ];

  // Sample data for candidates
  const candidates = [
    {
      name: 'Sarah Wilson',
      role: 'Senior Frontend Developer',
      matchScore: 92,
      experience: '5 years',
      education: 'B.S. Computer Science',
      skills: ['React', 'TypeScript', 'Node.js'],
      status: 'Shortlisted'
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      matchScore: 88,
      experience: '4 years',
      education: 'M.S. Software Engineering',
      skills: ['Python', 'Django', 'React'],
      status: 'Reviewed'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      matchScore: 85,
      experience: '3 years',
      education: 'B.A. Design',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      status: 'Pending'
    }
  ];

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Your Candidates Overview</h1>
          <p className="text-gray-600">Track, evaluate, and manage applicants effortlessly</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name or skills..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg text-gray-600 flex items-center gap-2">
            <FaFilter /> Filters
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Applications per Job</h3>
            {/* Add bar chart component here */}
            <div className="h-48 bg-gray-50 rounded flex items-end gap-4 p-4">
              {[80, 60, 50, 40, 30].map((height, index) => (
                <div
                  key={index}
                  className="bg-blue-500 w-16 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Application Status</h3>
            {/* Add pie chart component here */}
            <div className="h-48 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 border-r-orange-400 border-b-green-500" />
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-lg shadow-sm">
          {candidates.map((candidate, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <span className="text-sm text-gray-600">{candidate.role}</span>
                  </div>
                  <div className="flex items-center gap-6 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Match Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${candidate.matchScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{candidate.matchScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Experience</span>
                      <p className="font-medium">{candidate.experience}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Education</span>
                      <p className="font-medium">{candidate.education}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {candidate.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      candidate.status === 'Shortlisted'
                        ? 'bg-green-50 text-green-600'
                        : candidate.status === 'Reviewed'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {candidate.status}
                  </span>
                  <div className="flex gap-3 text-gray-400">
                    <button><FaEnvelope /></button>
                    <button><FaPhone /></button>
                    <button><FaEllipsisV /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesOverview;