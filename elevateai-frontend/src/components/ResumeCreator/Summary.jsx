import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../contexts/ResumeInfoContext';
import GlobalApi from '../../services/GlobalApi';
import { FaSave, FaMagic } from 'react-icons/fa';

const Summary = ({ onNext, resumeId }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo.summary || '');  // Changed from summery
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  console.log('Initial ResumeInfo:', resumeInfo);
  console.log('Initial Summary:', resumeInfo.summary);
  

  
  useEffect(() => {
    console.log('ResumeInfo changed:', resumeInfo);
    if (resumeInfo && resumeInfo.summary) {
      console.log('Setting summary from resumeInfo:', resumeInfo.summary);
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiData = {
        userId: localStorage.getItem('userId'),
        summary: summary
      };
      
      console.log('Saving data:', apiData);
      const response = await GlobalApi.updateResume(resumeId, apiData);
      console.log('Save response:', response);
      
      // Update context after successful save
      setResumeInfo(prev => ({
        ...prev,
        summary: summary
      }));
      
      setLoading(false);
      onNext();
    } catch (error) {
      console.error('Error saving summary:', error);
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const payload = {
        jobTitle: resumeInfo.jobTitle || '',
      };
      console.log('Generate Payload:', payload);
  
      const response = await GlobalApi.generateSummary(payload);
      console.log('Generate Response:', response);
      
      if (response && response.summaries) {
        console.log('Raw Summaries:', response.summaries);
        const cleanJson = response.summaries
          .replace(/```json\n/, '')
          .replace(/\n```$/, '');
        console.log('Cleaned JSON:', cleanJson);
        
        const parsedSummaries = JSON.parse(cleanJson);
        console.log('Parsed Summaries:', parsedSummaries);
        
        const summaryArray = parsedSummaries.map(item => item.summary);
        console.log('Final Summary Array:', summaryArray);
        setSuggestions(summaryArray);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error in handleGenerate:', error);
      setLoading(false);
    }
  };

  console.log('Current State:', {
    summary,
    loading,
    suggestionsCount: suggestions.length,
    resumeInfoSummary: resumeInfo.summary
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Summary</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2">
          <textarea
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your professional summary here..."
            required
          />
        </div>

        {/* AI Generation Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Generating...
              </span>
            ) : (
              <>
                <FaMagic /> Generate with AI
              </>
            )}
          </button>
        </div>

        {/* AI Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-gray-700">Select a suggestion:</h4>
            <div className="space-y-3">
              {suggestions.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setSummary(s)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <p className="text-gray-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <FaSave /> Save
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Summary;