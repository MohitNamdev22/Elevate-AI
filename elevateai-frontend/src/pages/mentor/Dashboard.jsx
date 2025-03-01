import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import axios from 'axios';
import { format } from 'date-fns';
import 'react-toastify/dist/ReactToastify.css';


import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaClock, FaCheckCircle, FaStar, FaRegCalendarAlt, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="text-white text-lg" />
      </div>
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">{value}</h3>
      <span className={`text-sm ${trend.value > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend.value > 0 ? '+' : ''}{trend.percentage}%
      </span>
    </div>
  </motion.div>
);

const MentorDashboard = () => {
  const [timeRange, setTimeRange] = React.useState('monthly');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [mentorStats, setMentorStats] = useState({
    totalStudents: 0,
    hoursSpent: 0,
    sessionsCompleted: 0,
    averageRating: 0
  });

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/user/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student details:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        // Fetch user data
        const userResponse = await axios.get(`${API_BASE_URL}/api/users/user/${userId}`);
        setUserData(userResponse.data);
  
        // Fetch mentor's sessions
        const sessionsResponse = await axios.post(`${API_BASE_URL}/api/mentors/created-sessions`, {
          mentorId: userId
        });
  
        const sessionsData = sessionsResponse.data;
        setSessions(sessionsData);
  
        // Calculate total registered students
        const totalStudents = new Set(
          sessionsData.flatMap(session => session.registeredStudents)
        ).size;
  
        // Calculate total hours spent (assuming each session is 1 hour)
        const completedSessions = sessionsData.filter(session => 
          new Date(session.date) < new Date()
        );
  
        // Calculate mentor statistics
        setMentorStats({
          totalStudents,
          hoursSpent: completedSessions.length,
          sessionsCompleted: completedSessions.length,
          averageRating: userResponse.data.mentorDetails?.rating || 4.5
        });

        const uniqueStudentIds = [...new Set(
          sessionsData.flatMap(session => session.registeredStudents)
        )];
  
        // Fetch details for each student
        const studentPromises = uniqueStudentIds.map(fetchStudentDetails);
        const studentDetails = (await Promise.all(studentPromises)).filter(Boolean);
  
        const matchedStudentsData = studentDetails.map(student => {
          const mentorSkills = new Set(userData?.mentorDetails?.technicalSkills || []);
          const studentSkills = new Set(student?.studentDetails?.skills || []);
          const commonSkills = new Set(
            [...mentorSkills].filter(skill => studentSkills.has(skill))
          );
          
          const matchPercentage = Math.round(
            (commonSkills.size / Math.max(mentorSkills.size, 1)) * 100
          );
  
          return {
            ...student,
            matchPercentage,
            commonSkills: Array.from(commonSkills)
          };
        });

        setMatchedStudents(
          matchedStudentsData
            .sort((a, b) => b.matchPercentage - a.matchPercentage)
            .slice(0, 3)
        );
  
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch dashboard data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const renderUpcomingSessions = () => {
    const upcomingSessions = sessions
      .filter(session => new Date(session.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  
    return (
      <div className="space-y-4">
        {upcomingSessions.map((session) => (
          <motion.div 
            key={session._id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-medium">
              {session.sessionType[0]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{session.title || 'Mentorship Session'}</h4>
                <span className="text-gray-500 text-sm">
                  {format(new Date(session.date), 'MMM d')} | {session.startTime}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{session.description || 'No description provided'}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-600 font-medium">
                  {session.registeredStudents.length}/{session.maxParticipants} participants
                </span>
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span className="text-gray-500">{session.sessionType}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {upcomingSessions.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No upcoming sessions scheduled
          </div>
        )}
      </div>
    );
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

  
 // Update the impact data based on sessions
 const calculateImpactData = () => {
  const monthlyData = Array(6).fill(0);
  const now = new Date();
  
  sessions.forEach(session => {
    const sessionDate = new Date(session.date);
    const monthDiff = now.getMonth() - sessionDate.getMonth();
    if (monthDiff >= 0 && monthDiff < 6) {
      monthlyData[5 - monthDiff] += session.registeredStudents.length;
    }
  });

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(-6),
    datasets: [{
      label: 'Students Mentored',
      data: monthlyData,
      backgroundColor: '#3B82F6',
      borderRadius: 8,
      hoverBackgroundColor: '#2563EB',
    }]
  };
};

  const impactOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' }
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        padding: 12,
        cornerRadius: 8
      },
      legend: { display: false }
    }
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />

      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Stats Cards */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Welcome back, {userData?.fullName}!
          </h1>
          <p className="text-gray-600">
            {userData?.mentorDetails?.technicalSkills?.join(', ')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <StatCard 
    icon={FaCheckCircle}
    label="Total Students"
    value={mentorStats.totalStudents}
    trend={{ 
      value: mentorStats.totalStudents - (mentorStats.totalStudents * 0.9),
      percentage: Math.round((mentorStats.totalStudents * 0.1))
    }}
    color="bg-green-500"
  />
  <StatCard 
    icon={FaClock}
    label="Hours Mentored"
    value={mentorStats.hoursSpent}
    trend={{ 
      value: 8, 
      percentage: Math.round((mentorStats.hoursSpent / 40) * 100)
    }}
    color="bg-blue-500"
  />
  <StatCard 
    icon={FaCheckCircle}
    label="Sessions Completed"
    value={mentorStats.sessionsCompleted}
    trend={{ 
      value: mentorStats.sessionsCompleted - (mentorStats.sessionsCompleted * 0.85),
      percentage: 15 
    }}
    color="bg-purple-500"
  />
  <StatCard 
    icon={FaStar}
    label="Average Rating"
    value={mentorStats.averageRating.toFixed(1)}
    trend={{ 
      value: 0.2, 
      percentage: 4 
    }}
    color="bg-yellow-500"
  />
</div>

        {/* Upcoming Sessions & Student Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Sessions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Upcoming Sessions</h3>
              <button className="text-blue-600 text-sm flex items-center gap-2 hover:bg-blue-50 px-3 py-1 rounded-lg">
                <FaRegCalendarAlt /> View All
              </button>
            </div>
            {renderUpcomingSessions()}
          </div>

          {/* Student Matches */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-6">
    <h3 className="font-semibold text-lg">Student Matches</h3>
    <button className="text-gray-600 text-sm flex items-center gap-2 hover:bg-gray-50 px-3 py-1 rounded-lg">
      <FaFilter /> Filter
    </button>
  </div>
  <div className="space-y-4">
    {matchedStudents.length > 0 ? (
      matchedStudents.map((student, i) => (
        <motion.div 
          key={student._id}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-medium">
                {student.fullName[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                {student.matchPercentage}%
              </div>
            </div>
            <div>
              <h4 className="font-medium">{student.fullName}</h4>
              <p className="text-gray-600 text-sm">
                {student.studentDetails?.collegeName || 'College not specified'}
              </p>
              <p className="text-gray-500 text-sm">
                {student.commonSkills.join(', ')}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button className="text-blue-600 text-sm px-3 py-1 rounded-lg hover:bg-blue-50">
              Connect
            </button>
            <span className="text-xs text-gray-500">
              Year: {student.studentDetails?.yearOfStudy || 'N/A'}
            </span>
          </div>
        </motion.div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        No student matches found
      </div>
    )}
  </div>
</div>
        </div>

        {/* Mentorship Impact Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Mentorship Impact</h3>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              {['monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1 rounded-md text-sm ${
                    timeRange === range 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
          <Bar data={calculateImpactData()} options={impactOptions} />
        </div>
        </div>

          {/* Profile Completion Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Complete Your Profile</h3>
          <div className="space-y-4">
            {[
              { 
                text: 'Technical Skills', 
                completed: userData?.mentorDetails?.technicalSkills?.length > 0 
              },
              { 
                text: 'Set availability', 
                completed: userData?.mentorDetails?.availability 
              },
              { 
                text: 'Professional Summary', 
                completed: userData?.mentorDetails?.professionalSummary 
              },
              { 
                text: 'Link Social Accounts', 
                completed: userData?.mentorDetails?.socialProfiles?.github || 
                          userData?.mentorDetails?.socialProfiles?.linkedin 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {item.completed && '✓'}
                  </div>
                  <span className={`text-gray-600 ${item.completed ? 'line-through' : ''}`}>
                    {item.text}
                  </span>
                </div>
                {!item.completed && (
                  <button className="text-blue-600 text-sm px-3 py-1 rounded-lg hover:bg-blue-50">
                    Complete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;