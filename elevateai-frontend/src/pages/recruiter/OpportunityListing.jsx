import React from 'react';
import Sidebar from "./Sidebar";
import { 
  FaEdit, 
  FaTrash, 
  FaEllipsisV, 
  FaSearch, 
  FaFilter,
  FaMapMarkerAlt 
} from 'react-icons/fa';

const OpportunityListings = () => {
  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Opportunity Listings</h1>
            <p className="text-gray-600">Manage postings, track applications, and find top talent easily.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            + Post a New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Active Jobs', value: '24', change: '+2 this week' },
            { title: 'Total Applications', value: '143', change: '+28 this week' },
            { title: 'Interviews Scheduled', value: '32', change: '+12 this week' },
            { title: 'Hiring Rate', value: '68%', change: '+5% this month' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-2.5 flex items-center gap-2 text-gray-600">
              <FaFilter /> Filters
            </button>
          </div>
          
          {/* Filter Pills */}
          <div className="flex gap-4 mb-4">
            <select className="px-4 py-2 border rounded-lg text-gray-600">
              <option>Job Type</option>
            </select>
            <select className="px-4 py-2 border rounded-lg text-gray-600">
              <option>Location</option>
            </select>
            <select className="px-4 py-2 border rounded-lg text-gray-600">
              <option>Experience Level</option>
            </select>
            <select className="px-4 py-2 border rounded-lg text-gray-600">
              <option>Date Posted</option>
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-6 border-b">
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">
              Active Jobs (24)
            </button>
            <button className="px-4 py-2 text-gray-600">
              Drafts (3)
            </button>
            <button className="px-4 py-2 text-gray-600">
              Closed Jobs (12)
            </button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 text-sm border-b">
                <th className="p-4">Job Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Applications</th>
                <th className="p-4">Posted Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  title: 'Senior Frontend Developer',
                  type: 'Full-time',
                  location: 'San Francisco, CA',
                  applications: 45,
                  date: '1/15/2024',
                },
                {
                  title: 'Product Designer',
                  type: 'Full-time',
                  location: 'Remote',
                  applications: 32,
                  date: '1/14/2024',
                },
                {
                  title: 'DevOps Engineer',
                  type: 'Full-time',
                  location: 'New York, NY',
                  applications: 28,
                  date: '1/13/2024',
                },
                {
                  title: 'Full Stack Intern',
                  type: 'Internship',
                  location: 'Chicago, IL',
                  applications: 15,
                  date: '1/12/2024',
                },
                {
                  title: 'UX Researcher',
                  type: 'Contract',
                  location: 'Remote',
                  applications: 23,
                  date: '1/11/2024',
                }
              ].map((job, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.type}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaMapMarkerAlt />
                      {job.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span>{job.applications} applicants</span>
                      <div className="w-20 h-2 bg-blue-100 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(job.applications/45)*100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{job.date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3 text-gray-600">
                      <button><FaEdit /></button>
                      <button><FaTrash /></button>
                      <button><FaEllipsisV /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpportunityListings;