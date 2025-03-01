import React, {useState, useEffect} from 'react';
import Sidebar from "./Sidebar";
import { 
  FaEdit, 
  FaTrash, 
  FaEllipsisV, 
  FaSearch, 
  FaFilter,
  FaMapMarkerAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';


const OpportunityListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
    hiringRate: 0
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${API_BASE_URL}/api/internships/recruiter/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch jobs');
        }

        setJobs(data);
        
        // Calculate stats
        const activeJobs = data.filter(job => job.active).length;
        const totalApplications = data.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);
        
        setStats({
          activeJobs,
          totalApplications,
          interviewsScheduled: Math.floor(totalApplications * 0.4), // Example calculation
          hiringRate: Math.floor((activeJobs / data.length) * 100)
        });

      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/internships/${jobId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete job');
        }

        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }


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
          <Link to="/recruiter/opportunity-listing/jobpost">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              + Post a New Job
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">Active Jobs</p>
            <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
            <span className="text-green-500 text-sm">+{Math.floor(stats.activeJobs * 0.1)} this week</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">Total Applications</p>
            <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
            <span className="text-green-500 text-sm">+{Math.floor(stats.totalApplications * 0.2)} this week</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">Interviews Scheduled</p>
            <h3 className="text-2xl font-bold">{stats.interviewsScheduled}</h3>
            <span className="text-green-500 text-sm">+{Math.floor(stats.interviewsScheduled * 0.15)} this week</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">Hiring Rate</p>
            <h3 className="text-2xl font-bold">{stats.hiringRate}%</h3>
            <span className="text-green-500 text-sm">+5% this month</span>
          </div>
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
              Active Jobs ({stats.activeJobs})
            </button>
            <button className="px-4 py-2 text-gray-600">
              Drafts 
            </button>
            <button className="px-4 py-2 text-gray-600">
              Closed Jobs
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
            {jobs.map((job) => (
                <tr key={job._id} className="border-b last:border-b-0">
                  <td className="p-4">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.duration}</p>
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
                      <span>{job.applicants?.length || 0} applicants</span>
                      <div className="w-20 h-2 bg-blue-100 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${((job.applicants?.length || 0)/45)*100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(job.posted_time).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      job.active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3 text-gray-600">
                      <Link to={`/recruiter/opportunity-listing/edit/${job._id}`}>
                        <button><FaEdit /></button>
                      </Link>
                      <button onClick={() => handleDeleteJob(job._id)}><FaTrash /></button>
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