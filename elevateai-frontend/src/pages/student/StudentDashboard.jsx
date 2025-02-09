import Sidebar from "./Sidebar";
import { FaCheckCircle, FaClock, FaGithub, FaCode, FaBriefcase } from "react-icons/fa";

const StudentDashboard = () => {
  return (
    <div className="flex bg-[#F8FAFC]">

        <Sidebar/>
      <div className=" mt-16 pt-8  w-full min-h-screen">
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
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-lg font-semibold">GitHub Activity</h3>
            <div className="mt-4 flex items-center">
              <FaGithub className="text-4xl text-gray-600 mr-4" />
              <div>
                <p className="text-gray-700 font-medium">234 commits</p>
                <p className="text-gray-500 text-sm">+12% this week</p>
              </div>
            </div>
          </div>

          {/* LeetCode Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-lg font-semibold">LeetCode Progress</h3>
            <div className="mt-4 flex items-center">
              <FaCode className="text-4xl text-gray-600 mr-4" />
              <div>
                <p className="text-gray-700 font-medium">Rank: 45,678</p>
                <p className="text-gray-500 text-sm">Top 15%</p>
              </div>
            </div>
          </div>

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
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
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
        </div>

        {/* Top Opportunities */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold">Top Opportunities</h3>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {/* Opportunity 1 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">AI Engineer Intern</h4>
              <p className="text-sm text-gray-500">TechCorp - San Francisco, CA</p>
              <p className="text-sm text-gray-700">$8000/month</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>

            {/* Opportunity 2 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">ML Research Assistant</h4>
              <p className="text-sm text-gray-500">DataViz Inc - New York, NY</p>
              <p className="text-sm text-gray-700">$7500/month</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>

            {/* Opportunity 3 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">Junior Data Scientist</h4>
              <p className="text-sm text-gray-500">AI Solutions - Boston, MA</p>
              <p className="text-sm text-gray-700">$85,000/year</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Apply Now
              </button>
            </div>
          </div>
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
