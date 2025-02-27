import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/LogIn'
import Signup from './pages/Signup'
import StudentDashboard from './pages/student/StudentDashboard'
import './App.css'
import Roadmap from './pages/student/Roadmap'
import Opportunities from './pages/student/Oppotunities'
import Mentorship from './pages/student/Mentorship'
import Resume from './pages/student/Resume'
import ManualResume from './pages/student/ManualResume'
import StudentProfile from './pages/student/StudentProfile'
import ResumeAnalyzer from './pages/student/ResumeAnalyzer'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import OpportunityListings from './pages/recruiter/OpportunityListing'
import JobPostingForm from './pages/recruiter/JobPostingForm'
import CandidatesAnalytics from './pages/recruiter/Candidates'
import RecruiterCalendar from './pages/recruiter/Calendar'
import { HiringChallenges, CreateChallenge } from './pages/recruiter/Challenges'
import RecruiterProfile from './pages/recruiter/Profile'
import MentorDashboard from './pages/mentor/Dashboard'
import ManageSessions from './pages/mentor/ManageSessions'
import MentorProfile from './pages/mentor/Profile'
import ResumeBuilder from './pages/student/ResumeGenerator'
import ResumeList from './components/ResumeList'
import ResumeEditor from './components/ResumeEditor';
import { ResumeInfoProvider } from './contexts/ResumeInfoContext';
import ResumeDownloadPage from './components/ResumeDownloadPage';



function App() {
  return (
    <ResumeInfoProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/roadmaps" element={<Roadmap />} />
        <Route path="/student/opportunities" element={<Opportunities />} />
        <Route path="/student/mentorship" element={<Mentorship />} />
        <Route path="/student/resume-generator" element={<ResumeList />} />
        <Route path="/student/resume-generator/edit/:resumeId" element={<ResumeEditor />} />
          <Route path="/student/resume-generator/resume/:resumeId/download" element={<ResumeDownloadPage />} />
        {/* <Route path="/student/resume-generator/manual-resume" element={<ManualResume />} /> */}
        <Route path="/student/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/opportunity-listing" element={<OpportunityListings />} />
        <Route path="/recruiter/opportunity-listing/jobpost" element={<JobPostingForm />} />
        <Route path="/recruiter/candidates" element={<CandidatesAnalytics />} />
        <Route path="/recruiter/calendar" element={<RecruiterCalendar />} />
        <Route path="/recruiter/challenges" element={<HiringChallenges />} />
        <Route path="/recruiter/challenges/create-challenge" element={<CreateChallenge />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/manage-sessions" element={<ManageSessions />} />
        <Route path="/mentor/profile" element={<MentorProfile />} />
        <Route path="/student/resumegenerator" element={<ResumeBuilder />} />

      </Routes>
    </Router>
    </ResumeInfoProvider>
  )
}

export default App