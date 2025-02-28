import React from 'react';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { FaGithub, FaCode, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

const ProgressBar = ({ percentage }) => (
  <div className="w-48 h-2 bg-gray-200 rounded-full">
    <div 
      className="h-full bg-blue-500 rounded-full" 
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const StatCard = ({ icon, number, label }) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-lg">
    {icon}
    <span className="text-xl font-semibold mt-2">{number}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

const ConnectPlatform = ({ platform, isConnected }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      <img src="/api/placeholder/24/24" alt={platform} className="w-6 h-6" />
      <span>{platform}</span>
    </div>
    {isConnected ? (
      <span className="text-green-500 text-sm">✓ Connected</span>
    ) : (
      <button className="text-blue-500 text-sm">Connect</button>
    )}
  </div>
);

const StudentProfile = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${API_BASE_URL}/api/users/user/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data');
        }

        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const calculateProfileCompletion = () => {
    let completedFields = 0;
    const totalFields = 6; // Adjust based on required fields

    if (userData?.fullName) completedFields++;
    if (userData?.email) completedFields++;
    if (userData?.phoneNumber) completedFields++;
    if (userData?.studentDetails?.skills?.length > 0) completedFields++;
    if (userData?.studentDetails?.collegeName) completedFields++;
    if (userData?.studentDetails?.yearOfStudy) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const studentData = {
    name: "Mohit Namdev",
    education: "Final Year Student | Medicaps University",
    profileCompletion: 75,
    stats: {
      roadmapCompleted: 24,
      jobsApplied: 45,
      interviewsScheduled: 12
    },
    contact: {
      email: "namdevmohit0@gmail.com",
      phone: "+91 9889552549"
    },
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "MongoDB", "Git", "CICD"],
    experience: [
      {
        title: "Senior Software Intern",
        company: "Tech Corp",
        period: "2021 - Present",
        description: "Leading development of cloud-native applications and microservices architecture."
      },
      {
        title: "Frontend Developer Intern",
        company: "Innovation Labs",
        period: "2019 - 2021",
        description: "Developed and maintained multiple full-stack applications using modern technologies."
      }
    ],
    achievements: [
      { title: "Interview Pro", icon: "🎯" },
      { title: "Top Contributor", icon: "🏆" },
      { title: "Problem Solver", icon: "⭐" },
      { title: "Quick Learner", icon: "✨" }
    ]
  };

  return (
    <div className="flex bg-[#F8FAFC]">
    <Sidebar />
    <div className="mt-16 w-full min-h-screen p-6">
      {/* Header Section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex items-center gap-6">
          {userData?.profileImage ? (
            <img 
              src={userData.profileImage}
              alt={userData.fullName} 
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-500">
                {userData?.fullName?.[0]}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">{userData?.fullName}</h1>
                <p className="text-gray-600">
                  Year {userData?.studentDetails?.yearOfStudy} Student | {userData?.studentDetails?.collegeName}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Edit Profile
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <ProgressBar percentage={calculateProfileCompletion()} />
              <span className="text-gray-600">{calculateProfileCompletion()}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatCard 
          icon={<div className="text-blue-500">📋</div>}
          number={studentData.stats.roadmapCompleted}
          label="Roadmap Completed"
        />
        <StatCard 
          icon={<div className="text-blue-500">💼</div>}
          number={studentData.stats.jobsApplied}
          label="Jobs Applied"
        />
        <StatCard 
          icon={<div className="text-blue-500">📅</div>}
          number={studentData.stats.interviewsScheduled}
          label="Interviews Scheduled"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <button className="text-blue-500">✏️</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p>{userData?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p>{userData?.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Location</label>
                  <p>{userData?.location}</p>
                </div>
              </div>
            </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <button className="text-blue-500">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData?.studentDetails?.skills?.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          {/* Experience */}
          <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Experience</h2>
                <button className="text-blue-500">+</button>
              </div>
              <div className="space-y-4">
                {userData?.studentDetails?.experience?.map((exp, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Right Column */}
        <div className="space-y-6">
            {/* Connected Platforms */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
              <div className="space-y-2">
                <ConnectPlatform 
                  platform="GitHub" 
                  icon={<FaGithub />}
                  isConnected={!!userData?.studentDetails?.socialProfiles?.github} 
                  link={userData?.studentDetails?.socialProfiles?.github}
                />
                <ConnectPlatform 
                  platform="LeetCode"
                  icon={<SiLeetcode />}
                  isConnected={!!userData?.studentDetails?.socialProfiles?.leetcode}
                  link={userData?.studentDetails?.socialProfiles?.leetcode}
                />
              </div>
            </div>

          {/* Resume */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Resume</h2>
            <div className="border rounded-lg p-4">
              <img 
                src="/api/placeholder/240/320" 
                alt="Resume preview" 
                className="w-full mb-4"
              />
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg">
                Download
              </button>
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Certificates</h2>
              <div className="space-y-2">
                {userData?.studentDetails?.certificates?.map((cert, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">{userData?.studentDetails?.achievements}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentProfile;