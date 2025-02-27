import React, { useContext, useRef } from 'react';
import { ResumeInfoContext } from '../contexts/ResumeInfoContext';
import ResumeDownload from './ResumeDownloadPage';

export const PersonalDetailPreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  console.log('personal preview', resumeInfo.personalInfo);

  return (
    <header 
      style={{ color: resumeInfo.themeColor }} 
      className="text-center pb-4 print:pb-2"
    >
      <h1 className="text-3xl font-bold">
        {resumeInfo.personalInfo?.firstName} {resumeInfo.personalInfo?.lastName}
      </h1>
      <h2 className="text-xl mt-1">{resumeInfo.jobTitle}</h2>
      <p className="mt-2 text-sm">
        {resumeInfo.personalInfo?.address} | {resumeInfo.personalInfo?.phone} | {resumeInfo.personalInfo?.email}
      </p>
    </header>
  );
};

const SummaryPreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  console.log('summary preview', resumeInfo.summary);
  return (
    <section className="mt-4">
      <h3 className="border-b-2 pb-1 font-semibold" style={{ borderBottomColor: resumeInfo.themeColor }}>
        Summary
      </h3>
      <p className="mt-2">{resumeInfo.summary}</p>
    </section>
  );
};

const ExperiencePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <section className="mt-4">
      <h3 className="border-b-2 pb-1 font-semibold" style={{ borderBottomColor: resumeInfo.themeColor }}>
        Experience
      </h3>
      {resumeInfo.experience && resumeInfo.experience.map((exp, index) => (
        <div key={index} className="mt-3">
          <h4 className="font-semibold">{exp.title} - {exp.companyName}</h4>
          <p className="text-sm">
            {exp.city}, {exp.state} ({exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate})
          </p>
          <p className="mt-1">{exp.workSummary}</p>
        </div>
      ))}
    </section>
  );
};

const EducationalPreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <section className="mt-4">
      <h3 className="border-b-2 pb-1 font-semibold" style={{ borderBottomColor: resumeInfo.themeColor }}>
        Education
      </h3>
      {resumeInfo.education && resumeInfo.education.map((edu, index) => (
        <div key={index} className="mt-3">
          <h4 className="font-semibold">{edu.universityName}</h4>
          <p>{edu.degree} in {edu.major} ({edu.startDate} - {edu.endDate})</p>
          <p className="mt-1">{edu.description}</p>
        </div>
      ))}
    </section>
  );
};

const SkillsPreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <section className="mt-4">
      <h3 className="border-b-2 pb-1 font-semibold" style={{ borderBottomColor: resumeInfo.themeColor }}>
        Skills
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {resumeInfo.skills && resumeInfo.skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1 border rounded-full"
            style={{ 
              color: resumeInfo.themeColor,
              borderColor: resumeInfo.themeColor
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
};

const ResumePreview = ({ forPrint = false }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const containerClasses = forPrint 
    ? "w-full max-w-[21cm] mx-auto bg-white p-8" 
    : "bg-white shadow-md w-full max-w-2xl p-6 rounded-xl";

  return (
    <div 
      className={containerClasses}
      style={{
        border: forPrint ? 'none' : `2px solid ${resumeInfo.themeColor || '#000'}`,
      }}
    >
      { resumeInfo.personalInfo && <PersonalDetailPreview />}
      {resumeInfo.summary && <SummaryPreview />}
      {resumeInfo.experience?.length > 0 && <ExperiencePreview />}
      {resumeInfo.education?.length > 0 && <EducationalPreview />}
      {resumeInfo.skills?.length > 0 && <SkillsPreview />}
    </div>
  );
};

export default ResumePreview;