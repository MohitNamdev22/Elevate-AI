import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import Sidebar from './Sidebar';
import { FaTimes, FaPaperPlane, FaComments, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Set the worker source for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const parseAnalysisResult = (text) => {
    const result = {
      matchScore: 0,
      matchingSkills: [],
      missingSkills: [],
      recommendations: []
    };

    // Extract match score
    const scoreMatch = text.match(/\*\*MATCH SCORE:\*\*\s*(\d+)%/i);
    if (scoreMatch && scoreMatch[1]) {
      result.matchScore = parseInt(scoreMatch[1], 10);
    }

    // Extract sections using more robust regex
    const sectionRegex = /\*\*(MATCHING SKILLS|MISSING SKILLS|RECOMMENDATIONS):\*\*/gi;
  const sections = text.split(sectionRegex);

  for (let i = 1; i < sections.length; i += 2) {
    const sectionName = sections[i]?.toUpperCase();
    const content = sections[i + 1];

    if (!content || !sectionName) continue;

    const items = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('*') || line.startsWith('-'))
      .map(line => line.replace(/^[-*]\s*/, '').trim());

    switch (sectionName) {
      case 'MATCHING SKILLS':
        result.matchingSkills = items;
        break;
      case 'MISSING SKILLS':
        result.missingSkills = items;
        break;
      case 'RECOMMENDATIONS':
        result.recommendations = items;
        break;
    }
  }

  return result;
};

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ');
      }
      return text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw error;
    }
  };

  const AnalysisDisplay = ({ text }) => {
    const analysis = parseAnalysisResult(text);
    
    return (
      <div className="mt-8 space-y-8">
        {/* Score Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">ATS Score</h2>
          <div className="w-48 mx-auto">
            <CircularProgressbar
              value={analysis.matchScore}
              text={`${analysis.matchScore}`}
              styles={buildStyles({
                pathColor: `rgba(37, 99, 235, ${analysis.matchScore / 100})`,
                textColor: '#1f2937',
                trailColor: '#e5e7eb',
                textSize: '24px',
              })}
            />
          </div>
        </div>

        {/* Matching Skills */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600">
            <FaCheck /> Matching Skills
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.matchingSkills.map((skill, index) => (
              <li key={index} className="bg-green-50 p-3 rounded-md flex items-center gap-2">
                <FaCheck className="text-green-500" /> {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Skills */}
        {analysis.missingSkills.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <FaExclamationTriangle /> Missing Skills
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.missingSkills.map((skill, index) => (
                <li key={index} className="bg-red-50 p-3 rounded-md flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" /> {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <ul className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
                <div className="text-blue-500 mt-1">•</div>
                <div>{rec}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const ChatPanel = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSend = async () => {
      if (!input.trim()) return;
  
      const userMessage = input.trim();
      setInput('');
      setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
      setIsLoading(true);
  
      try {
        const response = await axios.post('https://analysis-api-hp51.onrender.com/chat', {
          query: userMessage
        });
  
        setMessages(prev => [...prev, { type: 'ai', content: response.data.answer }]);
      } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, { 
          type: 'error', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
          >
            <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white sticky top-0 z-50">
              <h3 className="font-semibold">Chat with Resume</h3>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200 flex items-center justify-center"
                aria-label="Close chat"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-4 mt-16">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-blue-100 ml-auto' 
                      : message.type === 'error'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-bounce">⌛</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
  
            <div className="fixed bottom-0 right-0 w-96 p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your resume..."
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    setIsLoading(true);

    try {
      const resumeText = await extractTextFromPDF(resumeFile);

      const prompt = `
        Analyze the given resume and compare it with the job description.
        Provide analysis in this exact format:

        **MATCH SCORE:** [percentage]%
        
        **MATCHING SKILLS:**
        - Skill 1
        - Skill 2
        
        **MISSING SKILLS:**
        - Skill 1
        - Skill 2
        
        **RECOMMENDATIONS:**
        - Recommendation 1
        - Recommendation 2

        Resume: ${resumeText}
        Job Description: ${jobDescription}
      `;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: API_KEY },
        }
      );

      const analysisText = response.data.candidates[0]?.content?.parts[0]?.text || '';
      setAnalysisResult(analysisText);

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDescription);
      formData.append('analysis', analysisText);

      await axios.post(
        'https://analysis-api-hp51.onrender.com/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSuccessMessage('Analysis completed successfully!');
    } catch (error) {
      setSuccessMessage('');
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 w-full min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Resume Analyzer</h1>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <div className="border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              rows="5"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}

          <button
            onClick={analyzeResume}
            disabled={isLoading || !resumeFile || !jobDescription}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Resume'}
          </button>

          {analysisResult && (
            <>
              <AnalysisDisplay text={analysisResult} />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                    flex items-center gap-2"
                >
                  <FaComments /> Chat with Resume
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default ResumeAnalyzer;