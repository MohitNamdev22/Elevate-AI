import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../pages/student/Sidebar';
import PersonalDetail from './ResumeCreator/PersonalDetail';
import Summary from './ResumeCreator/Summary';
import Experience from './ResumeCreator/Experience';
import Education from './ResumeCreator/Education';
import Skills from './ResumeCreator/Skills';
import ResumePreview from './ResumePreview';

const ResumeEditor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { component: PersonalDetail, label: 'Personal Details' },
    { component: Summary, label: 'Summary' },
    { component: Experience, label: 'Experience' },
    { component: Education, label: 'Education' },
    { component: Skills, label: 'Skills' },
  ];
  const navigate = useNavigate();
  const { resumeId } = useParams();

  const CurrentComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  
  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <div className="flex mt-16">
          {/* Left Side: Form */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Home Button */}
              <button
                onClick={() => navigate('/student/resume-generator')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
              >
                <FaHome className="text-lg" />
                <span className="text-sm font-medium">Home</span>
              </button>

              {/* Step Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {steps[currentStep].label}
              </h2>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <CurrentComponent onNext={handleNext} resumeId={resumeId} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                )}
                {currentStep < steps.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Preview */}
          <div className="flex-1 p-8 bg-white border-l border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;