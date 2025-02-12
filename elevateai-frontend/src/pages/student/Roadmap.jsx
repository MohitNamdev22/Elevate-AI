import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { FaCalendar, FaChartPie, FaCheck, FaClock } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Roadmap = () => {
  const [careerGoal, setCareerGoal] = useState('');
  const [timeframe, setTimeframe] = useState('3');
  const [currentSkills, setCurrentSkills] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapResult, setRoadmapResult] = useState('');

  const progressData = [
    { skill: 'HTML', progress: 90 },
    { skill: 'CSS', progress: 85 },
    { skill: 'JavaScript', progress: 70 },
    { skill: 'React', progress: 65 },
    { skill: 'Node.js', progress: 40 }
  ];

  const stats = [
    { icon: FaChartPie, value: '40%', label: 'Overall Progress' },
    { icon: FaClock, value: '45h', label: 'Time Spent' },
    { icon: FaCheck, value: '12', label: 'Completed Roadmaps' },
    { icon: FaCalendar, value: '8', label: 'Days Remaining' }
  ];

  const generateRoadmap = async () => {
    if (!careerGoal || !timeframe || !currentSkills) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `
        You are an AI career counselor specialized in creating learning roadmaps.
        Create a detailed learning roadmap based on the following information:

        Career Goal: ${careerGoal}
        Timeframe: ${timeframe} months
        Current Skills: ${currentSkills}

        Provide the roadmap in the following format:

        **OVERVIEW:**
        - Brief summary of the learning journey

        **MILESTONES:**
        *Month 1:*
        - Detailed weekly learning objectives
        - Recommended resources
        - Projects to complete

        *Month 2:*
        [Continue for each month]

        **KEY SKILLS TO ACQUIRE:**
        - List of crucial skills to develop

        **PRACTICE PROJECTS:**
        - Real-world project suggestions

        **ADDITIONAL RESOURCES:**
        - Books
        - Online Courses
        - Communities to join
      `;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
        }
      );

      const roadmapText = response.data.candidates[0]?.content?.parts[0]?.text || 'No roadmap available';
      setRoadmapResult(roadmapText);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Error generating roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoadmapResult = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**')) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">
          {line.replace(/\*\*/g, '')}
        </h3>;
      } else if (line.startsWith('*')) {
        return <h4 key={index} className="font-semibold text-lg mt-4 mb-2 text-gray-700">
          {line.replace(/\*/g, '')}
        </h4>;
      } else if (line.startsWith('-')) {
        return <li key={index} className="ml-6 mb-2 text-gray-600">
          {line.substring(1)}
        </li>;
      } else {
        return <p key={index} className="mb-2 text-gray-600">{line}</p>;
      }
    });
  };

  return (


    <div className="flex bg-[#F8FAFC]">
        <Sidebar />
      <div className="mt-16 w-full min-h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Your Learning Roadmap</h1>
            <p className="text-gray-500 mt-2">Create a personalized learning path to achieve your career goals</p>
          </div>
          <div className="w-24">
            <CircularProgressbar
              value={40}
              text={`40%`}
              styles={buildStyles({
                pathColor: '#3b82f6',
                textColor: '#3b82f6',
                trailColor: '#e5e7eb'
              })}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap Generator Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your career goal?
              </label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g., Become a Full-Stack Developer"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe (in months)
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your current skills?
              </label>
              <textarea
                rows="4"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="List your current technical skills, experience level, etc."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={generateRoadmap}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>

        {/* Progress Analytics */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Skills Progress</h3>
            <div className="h-[300px]">
              <LineChart
                width={500}
                height={300}
                data={progressData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
            <div className="space-y-6">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Roadmap Result */}
        {roadmapResult && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Personalized Learning Roadmap</h2>
            <div className="prose max-w-none">
              {renderRoadmapResult(roadmapResult)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;