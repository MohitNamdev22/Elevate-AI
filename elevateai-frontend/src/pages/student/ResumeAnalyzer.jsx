import React, { useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import Sidebar from './Sidebar';

// Set the worker source for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY


const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(text);
      return text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw error;
    }
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
        You are an AI assistant specialized in resume analysis and recruitment. 
        Analyze the given resume and compare it with the job description.

        Resume: ${resumeText}
        Job Description: ${jobDescription}

        Provide analysis in the following format:

        MATCH SCORE:
        - Calculate overall match percentage

        MATCHING SKILLS:
        - List skills found in both resume and job description

        MISSING SKILLS:
        - List required skills from job description missing in resume

        RECOMMENDATIONS:
        - Specific suggestions for improving the resume
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

      console.log(response);
      const analysisText = response.data.candidates[0]?.content?.parts[0]?.text || 'No analysis available';
      setAnalysisResult(analysisText);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAnalysisResult = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**')) {
        // Handle headers
        return <h3 key={index} className="font-bold text-lg mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
      } else if (line.startsWith('*')) {
        // Handle bullet points
        return <li key={index} className="ml-4">{line.replace(/\*/g, '')}</li>;
      } else {
        // Handle regular text
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
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

        <button
          onClick={analyzeResume}
          disabled={isLoading || !resumeFile || !jobDescription}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resume'}
        </button>

        {analysisResult && (
      <div className="border rounded-lg p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
        <div className="prose max-w-none">
          {renderAnalysisResult(analysisResult)}
        </div>
      </div>
    )}
      </div>
    </div>
    </div>
  );
};

export default ResumeAnalyzer;