import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResumeInfoContext } from '../contexts/ResumeInfoContext';
import { FaDownload, FaShare, FaArrowLeft, FaHome } from 'react-icons/fa';
import ResumePreview from './ResumePreview';
import { toast } from 'sonner';
import Sidebar from '../pages/student/Sidebar';

const ResumeDownloadPage = () => {
  const { resumeId } = useParams();
  const { resumeInfo } = useContext(ResumeInfoContext);
  const navigate = useNavigate();

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${resumeInfo.firstName}'s Resume`;
    window.print();
    document.title = originalTitle;
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resumeInfo.firstName}'s Resume`,
          text: 'Check out my resume',
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    
    <div className="flex bg-[#F8FAFC]">
    <Sidebar />
    <div className="flex-1 min-h-screen relative">
    {/* Action Bar */}
    <div className="fixed top-0 right-0 bg-white shadow-sm z-10 print:hidden mt-16" 
             style={{ width: 'calc(100% - 258px)' }}> {/* 280px is sidebar width */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/student/resume-generator/edit/${resumeId}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm font-medium">Back to Edit</span>
              </button>
              <button
                onClick={() => navigate('/student/resume-generator')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors"
              >
                <FaHome className="text-sm" />
                <span className="text-sm font-medium">Home</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaShare className="text-sm" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 print:p-0 print:pt-0">
          <ResumePreview forPrint={true} />
        </div>
    </div>
  </div>
  );
};

export default ResumeDownloadPage;