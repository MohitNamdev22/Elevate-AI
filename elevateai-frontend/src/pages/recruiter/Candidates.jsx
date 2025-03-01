import React, { useEffect, useState } from 'react';
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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

const CandidatesAnalytics = () => {
  // State to store the fetched data
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    uniqueApplicants: 0,
    activeJobs: 0,
    averageApplications: 0
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${API_BASE_URL}/api/internships/${userId}/applicants1`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch applicants');
        }

        setApplicants(data);
        
        // Calculate statistics
        const totalJobs = data.length;
        const totalApplications = data.reduce((sum, job) => sum + job.applicants.length, 0);
        const uniqueApplicants = new Set(
          data.flatMap(job => job.applicants.map(app => app._id))
        ).size;

        setStats({
          totalApplications,
          uniqueApplicants,
          activeJobs: totalJobs,
          averageApplications: totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : 0
        });

      } catch (err) {
        setError(err.message);
        console.error('Error fetching applicants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const calculateDistributionData = () => {
    const distribution = applicants.reduce((acc, job) => {
      if (!acc[job.jobTitle]) {
        acc[job.jobTitle] = {
          name: job.jobTitle,
          total: job.applicants.length
        };
      }
      return acc;
    }, {});

    return Object.values(distribution);
  };

  const calculateStatusData = () => {
    const totalApplicants = stats.totalApplications;
    return [
      { name: 'New', value: totalApplicants, color: '#1E40AF' },
      { name: 'Reviewed', value: Math.floor(totalApplicants * 0.6), color: '#06B6D4' },
      { name: 'Shortlisted', value: Math.floor(totalApplicants * 0.3), color: '#22C55E' },
      { name: 'Hired', value: Math.floor(totalApplicants * 0.1), color: '#7C3AED' }
    ];
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

  const statisticsCards = [
    { label: 'Total Applications', value: stats.totalApplications },
    { label: 'Unique Applicants', value: stats.uniqueApplicants },
    { label: 'Active Jobs', value: stats.activeJobs },
    { label: 'Avg. Applications per Job', value: stats.averageApplications },
  ];


  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Candidates Analytics</h1>
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
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statisticsCards.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Applications by Job</h3>
            <BarChart width={500} height={300} data={calculateDistributionData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="total" fill="#1E40AF" />
            </BarChart>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Application Status</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={calculateStatusData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {calculateStatusData().map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* Applicants List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Applicants</h3>
          <div className="space-y-4">
            {applicants.map(job => 
              job.applicants.map(applicant => (
                <div key={applicant._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{applicant.fullName}</h4>
                      <p className="text-sm text-gray-600">Applied for: {job.jobTitle}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {applicant.studentDetails.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm">
                        View Profile
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


        {/* <div className="mb-8">
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
        </div> */}
      </div>
    </div>
  );
};

export default CandidatesAnalytics;