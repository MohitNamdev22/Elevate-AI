import React from 'react';
import Sidebar from './Sidebar';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';

const RecruiterProfile = () => {
  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <img 
              src="/api/placeholder/80/80" 
              alt="Sarah Wilson" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">Sarah Wilson</h1>
              <p className="text-gray-600">Senior Technical Recruiter</p>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <img src="/api/placeholder/16/16" alt="company" className="w-4 h-4" />
                Tech Solutions Inc
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Positions Filled', value: '127' },
            { title: 'Active Jobs', value: '12' },
            { title: 'Candidates Screened', value: '1.2k' },
            { title: 'Avg. Time to Hire', value: '18 days' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Professional Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>
              <p className="text-gray-600">
                Senior Technical Recruiter with 8+ years of experience in talent acquisition for technology
                companies. Specialized in hiring software engineers, product managers, and technical
                leaders. Passionate about building diverse and high-performing teams.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaPhone className="w-4 h-4" />
                  <span>+1 (555) 123-456</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="w-4 h-4" />
                  <span>sarah.wilson@techsolutions.co</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Recruiting Preferences */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recruiting Preferences</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-600 mb-2">Industry Focus</h3>
                  <div className="flex gap-2">
                    {['Software Development', 'Product Management', 'Data Science', 'DevOps'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-2">Work Model</h3>
                  <div className="flex gap-2">
                    {['Remote', 'Hybrid', 'On-site'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-medium">Interview Scheduled</h3>
                    <p className="text-gray-600">Senior Frontend Developer at Tech Solutions</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                {/* Add more activity items as needed */}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Connected Accounts */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaLinkedin className="text-blue-600" />
                    <span>LinkedIn</span>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaGithub />
                    <span>GitHub</span>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTwitter className="text-blue-400" />
                    <span>Twitter</span>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Tools */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Tools</h2>
              <div className="space-y-3">
                {[
                  'View Active Jobs',
                  'Saved Resumes',
                  'Interview Schedule',
                  'Performance Stats'
                ].map((tool) => (
                  <button
                    key={tool}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Monthly Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interviews Conducted</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">45</span>
                    <span className="text-green-500 text-sm">+12%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">85%</span>
                    <span className="text-green-500 text-sm">+5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time to Hire</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">18 days</span>
                    <span className="text-green-500 text-sm">-2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;