import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';


const Resume = () => {
  const templates = [
    {
      name: 'Professional',
      description: 'Classic layout with a clean design',
      status: 'ATS-Friendly',
      image: '/api/placeholder/240/320'
    },
    {
      name: 'Modern',
      description: 'Contemporary design with bold elements',
      status: 'ATS-Friendly',
      image: '/api/placeholder/240/320'
    },
    {
      name: 'Minimalist',
      description: 'Simple and elegant presentation',
      status: 'ATS-Friendly',
      image: '/api/placeholder/240/320'
    }
  ];

  const profileData = {
    education: 'Computer Science, MI',
    experience: '2 Internships',
    skills: '12 Key Skills',
    social: {
      linkedin: 'Connected',
      github: 'Connected'
    }
  };

  // Simple SVG icons as components
  const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="flex bg-[#F8FAFC]">
            <Sidebar />
    <div className="mt-16 w-full min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Craft Your Perfect Resume</h1>
        <p className="text-gray-600">
          Leverage AI or customize manually. Choose from ATS-friendly templates and stand out!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
          🤖 Generate Resume Using AI
        </button>
        <Link to="/student/resume-generator/manual-resume">
    <button className="border border-gray-300 px-6 py-3 rounded-lg flex items-center gap-2">
      ✍️ Build Manually
    </button>
  </Link>
      </div>

      {/* Quick Preview Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Quick Preview</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex gap-8">
            <div className="flex-1 border p-4 rounded-md">
              <img
                src="/api/placeholder/400/300"
                alt="Resume Preview"
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-4 flex gap-4">
                <button className="flex items-center gap-2 text-gray-600">
                  <DownloadIcon /> Download
                </button>
                <button className="flex items-center gap-2 text-gray-600">
                  <ShareIcon /> Share
                </button>
              </div>
            </div>
            <div className="flex-1 border p-4 rounded-md">
              <h3 className="font-bold mb-4">Profile Data</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    🎓
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <p className="font-medium">{profileData.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    💼
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{profileData.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    ⭐
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Skills</p>
                    <p className="font-medium">{profileData.skills}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">ATS-Friendly Templates</h2>
        <div className="grid grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{template.name}</h3>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    {template.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Resume;