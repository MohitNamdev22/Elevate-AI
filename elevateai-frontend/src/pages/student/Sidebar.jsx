import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaMap, 
  FaBriefcase, 
  FaUserGraduate, 
  FaFileAlt, 
  FaChalkboardTeacher, 
  FaBell, 
  FaUserCircle, 
  FaHome, 
  FaFileCode
} from "react-icons/fa";
import elevateaiLogo from '../../assets/elevateai-logo.svg';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/student/dashboard" },
    { name: "Roadmaps", icon: <FaMap />, path: "/student/roadmaps" },
    { name: "Opportunities", icon: <FaBriefcase />, path: "/student/opportunities" },
    { name: "AI-Mock Interviews", icon: <FaUserGraduate />, path: "/student/mock-interviews" },
    { name: "AI Resume Analyzer", icon: <FaFileCode />, path: "/student/resume-analyzer" },
    { name: "Resume Generator", icon: <FaFileAlt />, path: "/student/resume-generator" },
    { name: "Expert Mentorship", icon: <FaChalkboardTeacher />, path: "/student/mentorship" },
  ];

  return (
    <div className="flex">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#F8FAFC] shadow-md flex items-center justify-between px-6 z-20">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={elevateaiLogo} alt="ElevateAI" className="h-8" />
          <span className="text-xl font-semibold ml-2">ElevateAI</span>
        </div>

        {/* Search and Icons Section */}
        <div className="flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
          <Link to="/student/profile">
          <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600" />
          </Link>
        </div>
      </div>

      {/* Sidebar - Now starts below navbar */}
      <div className="h-[calc(100vh-4rem)] w-64 bg-[#F8FAFC] shadow-lg flex flex-col fixed top-16">
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                location.pathname.startsWith(item.path) ? "bg-blue-600 text-white" : ""
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area - Adjusted for new navbar */}
      <div className="ml-52 mt-16 flex-1">
        {/* Page Content */}
        <div className="p-6">
          {/* Content from child pages will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;