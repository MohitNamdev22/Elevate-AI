import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaLinkedin, FaTwitter, FaGithub, FaRegSave } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [stats, setStats] = useState({
    sessionsCompleted: 0,
    averageRating: 0,
    totalStudents: 0
  });

  useEffect(() => {
    fetchProfileData();
    fetchMentorStats();
  }, []);

  const fetchProfileData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/api/users/user/${userId}`);
      const userData = response.data;
  
      setProfile({
        name: userData.fullName,
        title: userData.mentorDetails?.jobTitle || 'Mentor',
        company: userData.mentorDetails?.organization || '',
        experience: userData.mentorDetails?.experienceLevel || '0',
        bio: userData.mentorDetails?.aboutMe || '',
        skills: userData.mentorDetails?.technicalSkills || [],
        education: {
          degree: userData.mentorDetails?.degree || '',
          university: userData.mentorDetails?.university || '',
          year: userData.mentorDetails?.year || ''
        },
        rate: `$${userData.mentorDetails?.hourlyRate || '0'}/hour`,
        availability: userData.mentorDetails?.availableSlots || '0',
        responseTime: userData.mentorDetails?.responseTime || 'within12',
        social: {
          linkedin: userData.mentorDetails?.professionalLinks?.linkedin || 
                   userData.mentorDetails?.linkedinUrl || '',
          twitter: userData.mentorDetails?.professionalLinks?.twitter || '',
          github: userData.mentorDetails?.professionalLinks?.github || ''
        }
      });
      
      if (userData.profileImage) {
        setProfileImage(userData.profileImage);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const fetchMentorStats = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`${API_BASE_URL}/api/mentors/created-sessions`, {
        mentorId: userId
      });

      const sessions = response.data;
      const completedSessions = sessions.filter(session => 
        new Date(session.date) < new Date()
      );

      setStats({
        sessionsCompleted: completedSessions.length,
        averageRating: calculateAverageRating(sessions),
        totalStudents: calculateTotalStudents(sessions)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const calculateAverageRating = (sessions) => {
    const completedSessions = sessions.filter(s => s.rating);
    if (completedSessions.length === 0) return 0;
    const totalRating = completedSessions.reduce((sum, s) => sum + s.rating, 0);
    return (totalRating / completedSessions.length).toFixed(1);
  };

  const calculateTotalStudents = (sessions) => {
    return new Set(sessions.flatMap(s => s.registeredStudents)).size;
  };

  const handleProfileUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const updateData = {
        mentorDetails: {
          jobTitle: profile.title,
          companyName: profile.company,
          yearsOfExperience: profile.experience,
          professionalSummary: profile.bio,
          technicalSkills: profile.skills,
          education: profile.education,
          hourlyRate: profile.rate,
          socialProfiles: profile.social
        }
      };

      await axios.put(`${API_BASE_URL}/api/users/${userId}`, updateData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Profile Header */}
        <div className="flex justify-between items-start mb-8">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-2xl">SJ</span>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm cursor-pointer">
                    <FiUpload className="text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{profile.name}</h1>
              <p className="text-gray-600">{profile.title} at {profile.company}</p>
              <p className="text-sm text-gray-500">{profile.experience} of experience</p>
            </div>
          </motion.div>
          <motion.button
  whileHover={{ scale: 1.05 }}
  onClick={isEditing ? handleProfileUpdate : () => setIsEditing(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
>
  {isEditing ? <FaRegSave /> : <FaEdit />}
  {isEditing ? 'Save Profile' : 'Edit Profile'}
</motion.button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-lg mb-4">Experience & Education</h3>
  <div className="space-y-4">
    <div>
      <h4 className="font-medium">Professional Experience</h4>
      <p className="text-gray-600">
        {profile.experience ? `${profile.experience} years` : 'Experience not specified'}
      </p>
    </div>
    <div>
      <h4 className="font-medium">Education</h4>
      <p className="text-gray-600">
        {profile.education.degree} 
        {profile.education.university && ` from ${profile.education.university}`}
        {profile.education.year && ` (${profile.education.year})`}
      </p>
    </div>
  </div>
</div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Rate & Availability */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-lg mb-4">Mentorship Details</h3>
  <div className="space-y-3">
    <div>
      <span className="text-gray-600">Hourly Rate</span>
      <p className="font-medium">{profile.rate}</p>
    </div>
    <div>
      <span className="text-gray-600">Availability</span>
      <p className="font-medium">{profile.availability} slots/week</p>
    </div>
    <div>
      <span className="text-gray-600">Response Time</span>
      <p className="font-medium">
        {profile.responseTime === 'within12' ? 'Within 12 hours' : 
         profile.responseTime === 'within24' ? 'Within 24 hours' : 
         'Response time not specified'}
      </p>
    </div>
  </div>
</div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
  <div className="space-y-3">
    {profile.social.linkedin && (
      <a 
        href={profile.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-blue-600 hover:underline"
      >
        <FaLinkedin />
        <span>LinkedIn Profile</span>
      </a>
    )}
    {profile.social.twitter && (
      <a 
        href={profile.social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-blue-600 hover:underline"
      >
        <FaTwitter />
        <span>Twitter Profile</span>
      </a>
    )}
    {profile.social.github && (
      <a 
        href={profile.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-blue-600 hover:underline"
      >
        <FaGithub />
        <span>GitHub Profile</span>
      </a>
    )}
  </div>
</div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-lg mb-4">Mentorship Stats</h3>
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-gray-600">Sessions Completed</span>
      <span className="font-medium">{stats.sessionsCompleted}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Average Rating</span>
      <span className="font-medium">{stats.averageRating}/5</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Students Mentored</span>
      <span className="font-medium">{stats.totalStudents}</span>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;