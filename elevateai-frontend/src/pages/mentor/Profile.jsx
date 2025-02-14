import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaLinkedin, FaTwitter, FaGithub, FaRegSave } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import Sidebar from './Sidebar';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc',
    experience: '8+ years',
    bio: 'Full-stack developer specializing in React, Node.js, and cloud technologies. Passionate about mentoring junior developers and sharing industry best practices.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'Mentoring'],
    education: 'M.Sc. Computer Science - Stanford University',
    rate: '$120/hour',
    social: {
      linkedin: 'sarah-johnson',
      twitter: '@techmentor_sarah',
      github: 'sarah-dev'
    }
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            onClick={() => setIsEditing(!isEditing)}
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
                  <p className="text-gray-600">{profile.experience} in software development</p>
                </div>
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-gray-600">{profile.education}</p>
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
                  <p className="font-medium">8 slots/week</p>
                </div>
                <div>
                  <span className="text-gray-600">Response Time</span>
                  <p className="font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-blue-600">
                  <FaLinkedin />
                  <span>linkedin.com/in/{profile.social.linkedin}</span>
                </div>
                <div className="flex items-center gap-3 text-blue-600">
                  <FaTwitter />
                  <span>twitter.com/{profile.social.twitter}</span>
                </div>
                <div className="flex items-center gap-3 text-blue-600">
                  <FaGithub />
                  <span>github.com/{profile.social.github}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Mentorship Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-medium">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Mentored</span>
                  <span className="font-medium">48</span>
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