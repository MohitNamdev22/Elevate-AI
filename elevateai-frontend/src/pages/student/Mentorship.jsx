import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub, FaUsers, FaCalendar } from 'react-icons/fa';
import axios from 'axios';
import Sidebar from './Sidebar';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';


const Mentorship = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mentorDetails, setMentorDetails] = useState({});

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/mentors/available-sessions`);
            setSessions(response.data);
            
            // Fetch mentor details for each unique mentor
            const uniqueMentorIds = [...new Set(response.data.map(session => session.mentorId._id))];
            const mentorPromises = uniqueMentorIds.map(fetchMentorDetails);
            const mentorData = await Promise.all(mentorPromises);
            
            const mentorMap = {};
            mentorData.forEach((mentor, index) => {
                mentorMap[uniqueMentorIds[index]] = mentor;
            });
            
            setMentorDetails(mentorMap);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            setError('Failed to load available sessions');
        } finally {
            setLoading(false);
        }
    };


    const fetchMentorDetails = async (mentorId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/user/${mentorId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching mentor details for ${mentorId}:`, error);
            return null;
        }
    };

    const handleRegistration = async (sessionId) => {
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            alert('Please login to register for sessions');
            return;
          }
      
          // Show loading state on the button
          const updatedSessions = sessions.map(s => 
            s._id === sessionId ? { ...s, isRegistering: true } : s
          );
          setSessions(updatedSessions);
      
          const response = await axios.post(
            `${API_BASE_URL}/api/mentors/sessions/${sessionId}/register`,
            { userId }
          );
      
          if (response.data) {
            // Update the sessions list to show registered status
            const newSessions = sessions.map(session => 
              session._id === sessionId 
                ? { 
                    ...session, 
                    isRegistered: true,
                    registeredStudents: [...session.registeredStudents, userId],
                    isRegistering: false
                  }
                : session
            );
            setSessions(newSessions);
            alert('Successfully registered for the session!');
          }
        } catch (error) {
          console.error('Error registering for session:', error);
          // Reset loading state and show error
          const updatedSessions = sessions.map(s => 
            s._id === sessionId ? { ...s, isRegistering: false } : s
          );
          setSessions(updatedSessions);
          alert('Failed to register for the session. Please try again.');
        }
      };



    const mentors = [
        {
            name: 'Samantha Tan',
            role: 'Senior Data Scientist',
            company: 'Google',
            image: '/api/placeholder/60/60',
            location: 'San Francisco, CA',
            availability: 'Available in 2 days',
            rating: 4.8,
            reviews: 124,
            skills: ['AI', 'Machine Learning', 'Python'],
            social: ['linkedin', 'github']
        },
        {
            name: 'Michael Chen',
            role: 'Staff Software Engineer',
            company: 'Meta',
            image: '/api/placeholder/60/60',
            location: 'New York, NY',
            availability: 'Available Now',
            rating: 4.9,
            reviews: 89,
            skills: ['System Design', 'Java', 'Cloud'],
            social: ['linkedin', 'github']
        },
        {
            name: 'Sarah Johnson',
            role: 'Product Design Lead',
            company: 'Apple',
            image: '/api/placeholder/60/60',
            location: 'Seattle, WA',
            availability: 'Available Next Week',
            rating: 5.0,
            reviews: 156,
            skills: ['UI/UX', 'Product Strategy', 'Design Systems'],
            social: ['linkedin', 'github']
        },
        {
            name: 'David Park',
            role: 'Engineering Manager',
            company: 'Amazon',
            image: '/api/placeholder/60/60',
            location: 'Austin, TX',
            availability: 'Available Tomorrow',
            rating: 4.7,
            reviews: 92,
            skills: ['Leadership', 'Backend', 'Scalability'],
            social: ['linkedin', 'github']
        },
        {
            name: 'Emily Zhang',
            role: 'ML Research Scientist',
            company: 'DeepMind',
            image: '/api/placeholder/60/60',
            location: 'London, UK',
            availability: 'Available in 3 days',
            rating: 4.9,
            reviews: 67,
            skills: ['Deep Learning', 'NLP', 'Research'],
            social: ['linkedin', 'github']
        },
        {
            name: 'James Wilson',
            role: 'Technical Architect',
            company: 'Microsoft',
            image: '/api/placeholder/60/60',
            location: 'Boston, MA',
            availability: 'Available Now',
            rating: 4.8,
            reviews: 143,
            skills: ['Architecture', 'Cloud', 'DevOps'],
            social: ['linkedin', 'github']
        }
    ];

    const renderStars = (rating, reviews) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-4 h-4 ${
                            index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-2 text-gray-600">
                    {rating} ({reviews} reviews)
                </span>
            </div>
        );
    };

    return (
        <div className="flex bg-[#F8FAFC]">
            <Sidebar />
            <div className="mt-16 w-full min-h-screen p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Connect with Alumni</h1>
                    <p className="text-gray-600">
                        Find mentors to guide you in achieving your career dreams. Filter by company, alumni network, or areas of expertise to start your journey today.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search mentors by name, company, or university..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                        <span>Filters</span>
                    </button>
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    {sessions.map((session) => {
                        const mentor = session.mentorId;
                        const mentorDetail = mentorDetails[mentor._id];
                        
                        return (
                            <div key={session._id} className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={mentorDetail?.profileImage || '/default-avatar.png'}
                                        alt={mentor.fullName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">{mentor.fullName}</h3>
                                        <p className="text-sm text-gray-600">{mentor.mentorDetails.jobTitle || 'Mentor'}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaCalendar className="text-gray-500" />
                                        <span>{new Date(session.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaClock className="text-gray-500" />
                                        <span>{session.startTime} - {session.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaUsers className="text-gray-500" />
                                        <span>{session.sessionType} ({session.registeredStudents.length}/{session.maxParticipants})</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">About Session</h4>
                                    <p className="text-sm text-gray-600">{session.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {mentorDetail?.mentorDetails?.technicalSkills?.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                <button 
    className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
        session.isRegistered 
            ? 'bg-green-100 text-green-600 cursor-not-allowed'
            : session.isRegistering
            ? 'bg-blue-400 text-white cursor-wait'
            : session.registeredStudents.length >= session.maxParticipants
            ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
    }`}
    onClick={() => handleRegistration(session._id)}
    disabled={
        session.isRegistered || 
        session.isRegistering || 
        session.registeredStudents.length >= session.maxParticipants
    }
>
    {session.isRegistered 
        ? 'Already Registered' 
        : session.isRegistering
        ? 'Registering...'
        : session.registeredStudents.length >= session.maxParticipants
        ? 'Session Full'
        : 'Register Now'
    }
</button>
                                    {mentorDetail?.mentorDetails?.linkedinUrl && (
                                        <a
                                            href={mentorDetail.mentorDetails.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                                        >
                                            <FaLinkedin className="text-[#0077b5]" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {loading && (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-600 p-4">
                        {error}
                    </div>
                )}

                {!loading && !error && sessions.length === 0 && (
                    <div className="text-center text-gray-600 p-4">
                        No sessions available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mentorship;