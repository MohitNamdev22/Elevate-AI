"use client";
import React from "react";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { FaHome, FaMap, FaBriefcase, FaUserGraduate, FaFileAlt, FaChalkboardTeacher, FaBell, FaUserCircle } from "react-icons/fa";
import elevateaiLogo from "../../public/elevate-ai.png";

function DashboardLayout({ children }) {
  let location = { pathname: "" }; // Fallback in case useLocation is outside a Router

  try {
    location = useLocation(); // Try to get location if inside Router
  } catch (error) {
    console.warn("useLocation() is being used outside a <Router>. Wrap your app inside BrowserRouter.");
  }

  const isActivePath = (itemPath) => {
    if (itemPath.includes('localhost:5173')) {
      // Remove localhost:5173 from the path for comparison
      const cleanPath = itemPath.replace('http://localhost:5173', '');
      return window.location.pathname === cleanPath;
    }
    // For AI-Mock Interviews path ("/dashboard")
    return window.location.pathname.startsWith(itemPath);
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "http://localhost:5173/student/dashboard" },
    { name: "Roadmaps", icon: <FaMap />, path: "http://localhost:5173/student/roadmaps" },
    { name: "Opportunities", icon: <FaBriefcase />, path: "http://localhost:5173/student/opportunities" },
    { name: "AI-Mock Interviews", icon: <FaUserGraduate />, path: "/dashboard" },
    { name: "Resume Generator", icon: <FaFileAlt />, path: "http://localhost:5173/student/resume-generator" },
    { name: "Expert Mentorship", icon: <FaChalkboardTeacher />, path: "http://localhost:5173/student/mentorship" },
  ];

  return (
    <Router> {/* Ensures Router context */}
      <div className="flex">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-[#F8FAFC] shadow-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center">
            <img src={elevateaiLogo} alt="ElevateAI" className="h-8" />
            <span className="text-xl font-semibold ml-2">ElevateAI</span>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-6">
            <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
            <a href="http://localhost:5173/student/profile">
              <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600" />
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="h-[calc(100vh-4rem)] w-64 bg-[#F8FAFC] shadow-lg flex flex-col fixed top-16">
          <nav className="flex-1">
          {menuItems.map((item) => (
              item.path.includes('localhost:5173') ? (
                <a 
                  key={item.name} 
                  href={item.path} 
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    isActivePath(item.path) ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition ${
                    isActivePath(item.path) ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 mt-16 flex-1">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </Router>
  );
}

export default DashboardLayout;
