import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaGithub, FaCode, FaBriefcase } from "react-icons/fa";

const GitHubActivity = () => {
  const [commits, setCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/users/${userId}/total-commits`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch commits');
        }

        setCommits(data.totalCommits);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching commits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-lg font-semibold">GitHub Activity</h3>
      <div className="mt-4 flex items-center">
        <FaGithub className="text-4xl text-gray-600 mr-4" />
        <div>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <p className="text-gray-700 font-medium">{commits} commits</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LeetCodeProgress = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`http://localhost:3000/api/users/${userId}/leetcode-stats`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch LeetCode stats');
        }

        setStats(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching LeetCode stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-lg font-semibold">LeetCode Progress</h3>
      <div className="mt-4">
        {loading ? (
          <div className="flex items-center">
            <FaCode className="text-4xl text-gray-400 mr-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <FaCode className="text-4xl text-gray-600 mr-4" />
              <div>
                <p className="text-gray-700 font-medium">Total Solved: {stats.totalSolved}</p>
                <p className="text-gray-500 text-sm">
                  Easy: {stats.easySolved} | Medium: {stats.mediumSolved} | Hard: {stats.hardSolved}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-100 p-2 rounded-md text-center">
                <p className="text-green-700 text-sm font-medium">{stats.easySolved}</p>
                <p className="text-green-600 text-xs">Easy</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-md text-center">
                <p className="text-yellow-700 text-sm font-medium">{stats.mediumSolved}</p>
                <p className="text-yellow-600 text-xs">Medium</p>
              </div>
              <div className="bg-red-100 p-2 rounded-md text-center">
                <p className="text-red-700 text-sm font-medium">{stats.hardSolved}</p>
                <p className="text-red-600 text-xs">Hard</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchJobs = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Add setTimeout to delay the fetch
        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await fetch('http://localhost:3000/api/users/top-categories-and-jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: userId
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch jobs');
        }

        // Only update state if component is still mounted
        if (isSubscribed) {
          setJobs(data.topJobs);
          setCategories(data.topCategories);
          setError(null);
        }
      } catch (err) {
        // Only update error state if component is still mounted
        if (isSubscribed) {
          setError(err.message);
          console.error('Error fetching jobs:', err);
        }
      } finally {
        // Only update loading state if component is still mounted
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isSubscribed = false;
    };
  }, []); // Empty dependency array

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recommended Jobs</h3>
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-4">
          {jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{job.title}</h4>
                {/* <span className={`text-xs px-2 py-1 rounded-full ${
                  job.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {job.active ? 'Active' : 'Closed'}
                </span> */}
              </div>
              <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
              <p className="text-sm text-gray-700">{job.stipend}</p>
              <div className="mt-4 space-y-2">
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors"
                  onClick={() => window.open(job.link, '_blank')}
                  // disabled={!job.active}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/internships/');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch jobs');
        }

        setJobs(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const userId = localStorage.getItem('userId');

    console.log(jobId, userId);
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/internships/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          jobId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to apply for job');
      }

      console.log('Applied successfully:', data);
      alert('Applied successfully!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Error applying for job: ' + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">All Jobs</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-4">
          {jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{job.title}</h4>
              </div>
              <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
              <p className="text-sm text-gray-700">{job.stipend}</p>
              <div className="mt-4 space-y-2">
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors"
                  onClick={() => handleApply(job._id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <div className="flex bg-[#F8FAFC]">

        <Sidebar/>
      <div className=" mt-16 p-8 w-full min-h-screen">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome back, Mohit</h2>
          <p className="text-gray-600">Here's what’s next on your journey</p>
        </div>

        {/* Learning Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Your Learning Progress</h3>
          <p className="text-gray-600">You're making great progress! Keep it up.</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-green-600">
              <FaCheckCircle className="mr-2" /> Complete React Fundamentals - Completed
            </div>
            <div className="flex items-center text-blue-600">
              <FaClock className="mr-2" /> Advanced Node.js Concepts - In Progress
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2" /> Database Design Pattern - Upcoming
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* GitHub Activity */}
            <GitHubActivity />
          

          {/* LeetCode Progress */}
            <LeetCodeProgress /> 
          

          {/* Mock Interviews */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-lg font-semibold">Mock Interviews</h3>
            <p className="text-gray-500 text-sm">Next Interview: Tomorrow, 2:00 PM</p>
            <p className="text-gray-500 text-sm">Last Score: 8.5/10</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md w-full">
              Prepare Now
            </button>
          </div>
        </div>

        {/* AI Specialist Roadmap */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold">AI Specialist Roadmap</h3>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-green-100 text-green-700 p-2 rounded-md text-center">
              Python Fundamentals - Completed
            </div>
            <div className="bg-green-100 text-green-700 p-2 rounded-md text-center">
              Machine Learning Basics - Completed
            </div>
            <div className="bg-gray-200 text-gray-700 p-2 rounded-md text-center">
              Deep Learning - Upcoming
            </div>
            <div className="bg-gray-200 text-gray-700 p-2 rounded-md text-center">
              Neural Network - Upcoming
            </div>
          </div>
        </div> */}

        {/* Top Opportunities */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <RecommendedJobs />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <AllJobs />
        </div>

        {/* Hiring Challenges */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold">Hiring Challenges & Hackathons happening</h3>
          <div className="grid grid-cols-4 gap-6 mt-4">
            <div className="border p-4 rounded-lg shadow-sm text-center">
              <h4 className="font-medium">Google Cloud x MLB</h4>
              <p className="text-sm text-gray-500">$98,700 in prizes</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>
            <div className="border p-4 rounded-lg shadow-sm text-center">
              <h4 className="font-medium">Amazon Community Days</h4>
              <p className="text-sm text-gray-500">$50,000 in prizes</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>
            <div className="border p-4 rounded-lg shadow-sm text-center">
              <h4 className="font-medium">Cloudinary Hack Week</h4>
              <p className="text-sm text-gray-500">$9,800 in prizes</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
