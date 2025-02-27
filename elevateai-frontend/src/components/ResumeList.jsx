import React, { useEffect, useState } from 'react';
import GlobalApi from '../services/GlobalApi';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeInfoContext } from '../contexts/ResumeInfoContext';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../pages/student/Sidebar';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();
  const { clearResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('user',userId);
    if (!userId) {
      // Handle case where user is not logged in
      navigate('/login');
      return;
    }
    GlobalApi.getResumes(userId).then(data => setResumes(data));
    clearResumeInfo();
  }, []);


  const createResume = async () => {
    if (!newTitle.trim()) return;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    const data = { title: newTitle, userId: userId, data: {} };
    const newResume = await GlobalApi.createResume(data);
    navigate(`/student/resume-generator/edit/${newResume._id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 min-h-screen mt-16">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Resumes</h1>
            <p className="text-neutral-500 mt-1">Manage your professional documents</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPopup(true)}
            className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white rounded-lg transition-all duration-200"
          >
            <FaPlus className="text-sm" />
            <span>New Resume</span>
          </motion.button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">{resume.title}</h3>
                    <p className="text-sm text-neutral-500">
                      Created {new Date(resume.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/student/resume-generator/edit/${resume._id}`);
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <FaEdit className="text-neutral-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal with Framer Motion */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                variants={modalVariants}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">New Resume</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPopup(false)}
                      className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      <FaTimes className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Resume Title
                      </label>
                      <input
                        type="text"
                        autoFocus
                        placeholder="e.g. Software Engineer Resume"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 outline-none transition-all"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPopup(false)}
                        className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={createResume}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded-lg transition-colors"
                      >
                        Create Resume
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ResumeList;