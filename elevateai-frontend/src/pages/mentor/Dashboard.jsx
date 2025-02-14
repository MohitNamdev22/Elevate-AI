import React from 'react';
import Sidebar from "./Sidebar";
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
  
  const impactData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Student Progress',
      data: [30, 35, 28, 45, 40, 55],
      backgroundColor: '#3B82F6',
      borderRadius: 8,
      hoverBackgroundColor: '#2563EB',
    }]
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={FaCheckCircle}
            label="Total Students"
            value="48"
            trend={{ value: 12, percentage: 12 }}
            color="bg-green-500"
          />
          <StatCard 
            icon={FaClock}
            label="Hours Mentored"
            value="365"
            trend={{ value: 8, percentage: 8 }}
            color="bg-blue-500"
          />
          <StatCard 
            icon={FaCheckCircle}
            label="Sessions Completed"
            value="156"
            trend={{ value: 15, percentage: 15 }}
            color="bg-purple-500"
          />
          <StatCard 
            icon={FaStar}
            label="Average Rating"
            value="4.9"
            trend={{ value: 0.2, percentage: 4 }}
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
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-medium">
                    {['S', 'M', 'E'][i]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Sarah Chen</h4>
                      <span className="text-gray-500 text-sm">Today, 2:45 PM</span>
                    </div>
                    <p className="text-gray-600 text-sm">Machine Learning Basics</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">45 mins</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-blue-600 font-medium">Join 10 mins early</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              {[95, 88, 85].map((match, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-medium">
                        {['S', 'M', 'E'][i]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                        {match}%
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{['Sarah Chen', 'Michael Park', 'Emma Wilson'][i]}</h4>
                      <p className="text-gray-600 text-sm">{['San Francisco', 'New York', 'London'][i]}</p>
                      <p className="text-gray-500 text-sm">{['ML, Python', 'Data Science', 'React'][i]}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm px-3 py-1 rounded-lg hover:bg-blue-50">
                    Connect
                  </button>
                </motion.div>
              ))}
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
            <Bar data={impactData} options={impactOptions} />
          </div>
        </div>

        {/* Complete Your Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Complete Your Profile</h3>
          <div className="space-y-4">
            {[
              { text: 'Upload certification', completed: true },
              { text: 'Set availability', completed: true },
              { text: 'Mentor bio', completed: true },
              { text: 'Link accounts', completed: false }
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