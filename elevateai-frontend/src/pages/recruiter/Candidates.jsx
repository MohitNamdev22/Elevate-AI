import React from 'react';
import Sidebar from "./Sidebar";
import { 
  FaSearch, 
  FaFilter, 
  FaEnvelope, 
  FaPhone,
  FaEllipsisV,
  FaDownload,
  FaShare
} from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const CandidatesAnalytics = () => {
  // Enhanced statistics data
  const stats = [
    { label: 'Total Applications', value: 325, change: '+12%' },
    { label: 'Shortlisted Candidates', value: 75, change: '+8%' },
    { label: 'Top-Ranked Candidates', value: 10, change: '-3%' },
    { label: 'Active Job Postings', value: 12, change: '+5%' },
    { label: 'Average Time to Hire', value: '15 Days', change: '-10%' }
  ];

  // Enhanced candidates data
  const bestMatchCandidates = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      matchScore: 95,
      skills: ['React', 'Node.js', 'Python'],
    },
    {
      name: 'Michael Chen',
      role: 'Graphics Designer',
      matchScore: 92,
      skills: ['UI/UX', 'Figma', 'Design Systems'],
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      matchScore: 88,
      skills: ['Machine Learning', 'Python', 'SQL'],
    }
  ];

  // Distribution data for charts
  const distributionData = [
    { name: 'Frontend', total: 80, shortlisted: 20 },
    { name: 'Backend', total: 60, shortlisted: 15 },
    { name: 'Design', total: 40, shortlisted: 10 },
    { name: 'Data', total: 30, shortlisted: 8 }
  ];

  const statusData = [
    { name: 'Pending', value: 40, color: '#1E40AF' },
    { name: 'Reviewed', value: 30, color: '#06B6D4' },
    { name: 'Shortlisted', value: 20, color: '#22C55E' },
    { name: 'Hired', value: 10, color: '#7C3AED' }
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

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-5 gap-6 mb-8">
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

        {/* Best-Match Candidates Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Best-Match Candidates</h2>
            <a href="#" className="text-blue-600 text-sm">View All</a>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {bestMatchCandidates.map((candidate, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold">{candidate.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{candidate.role}</p>
                <div className="mb-3">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${candidate.matchScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{candidate.matchScore}%</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {candidate.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm">
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Request Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Candidate Distribution</h3>
            <BarChart width={500} height={300} data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="total" fill="#1E40AF" name="Total Applications" />
              <Bar dataKey="shortlisted" fill="#22C55E" name="Shortlisted" />
            </BarChart>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Candidate Status</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* Export & Share Section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Export & Share</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 border rounded-lg text-gray-600 flex items-center gap-2">
              <FaDownload /> Export
            </button>
            <button className="px-4 py-2 border rounded-lg text-gray-600 flex items-center gap-2">
              <FaShare /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesAnalytics;