import { useState, useEffect } from "react";
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
  FaFileCode,
  FaUser,
  FaUsers,
  FaCalendar,
  FaChartBar,
  FaCode
} from "react-icons/fa";
import elevateaiLogo from '../../assets/elevateai-logo.svg';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

const Sidebar = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${API_BASE_URL}/api/users/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/recruiter/dashboard" },
    { name: "Opportunity Listing", icon: <FaBriefcase />, path: "/recruiter/opportunity-listing" },
    { name: "Candidates Analytics", icon: <FaUsers />, path: "/recruiter/candidates" },
    { name: "Calendar", icon: <FaCalendar />, path: "/recruiter/calendar" },
    { name: "Challenges", icon: <FaCode />, path: "/recruiter/challenges" },
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
          <Link to="/recruiter/profile" className="flex items-center">
            {userData?.profileImage ? (
              <img 
                src={userData.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {userData?.fullName?.[0] || 'R'}
                </span>
              </div>
            )}
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