import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../services/GlobalApi';

export const ResumeInfoContext = createContext({
  resumeInfo: {},
  setResumeInfo: () => {},
  clearResumeInfo: () => {}
});

export const ResumeInfoProvider = ({ children }) => {
  const { resumeId } = useParams() || { resumeId: 'new' };
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const getInitialState = useCallback(() => {
    const savedState = localStorage.getItem(`resumeInfo_${resumeId}`);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      },
      jobTitle: '',
      experience: [],
      education: [],
      skills: [],
      summary: '',
      themeColor: '#000000'
    };
  }, [resumeId]);

  const [resumeInfo, setResumeInfo] = useState(getInitialState);

  const clearResumeInfo = useCallback(() => {
    setResumeInfo(getInitialState());
  }, [getInitialState]);

  // Main fetch effect
  useEffect(() => {
    let mounted = true;

    const fetchResumeData = async () => {
      if (!resumeId || resumeId === 'new' || isInitialized) return;

      setIsLoading(true);
      try {
        const response = await GlobalApi.getResume(resumeId);
        
        if (!mounted) return;

        if (response) {
          // Transform flat response to nested structure
          const transformedData = {
            personalInfo: {
              firstName: response.firstName || '',
              lastName: response.lastName || '',
              email: response.email || '',
              phone: response.phone || '',
              address: response.address || ''
            },
            jobTitle: response.jobTitle || '',
            experience: response.experience || [],
            education: response.education || [],
            skills: response.skills || [],
            summary: response.summary || '',
            themeColor: response.themeColor || '#000000'
          };

          console.log('Transformed Data:', transformedData);
          setResumeInfo(transformedData);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
        if (mounted) {
          setResumeInfo(getInitialState());
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };


    fetchResumeData();

    return () => {
      mounted = false;
    };
  }, [resumeId]);

  // Reset initialization on resumeId change
  useEffect(() => {
    setIsInitialized(false);
  }, [resumeId]);

  // Local storage sync
  useEffect(() => {
    if (resumeId && !isLoading) {
      localStorage.setItem(`resumeInfo_${resumeId}`, JSON.stringify(resumeInfo));
    }
  }, [resumeInfo, resumeId, isLoading]);

  const updateResumeInfo = useCallback((section, data) => {
    setResumeInfo(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  const contextValue = {
    resumeInfo,
    setResumeInfo,
    clearResumeInfo,
    updateResumeInfo,
    isLoading
  };

  return (
    <ResumeInfoContext.Provider value={contextValue}>
      {children}
    </ResumeInfoContext.Provider>
  );
};