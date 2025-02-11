import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Mentorship = () => {
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
                    <h1 className="text-2xl font-bold mb-2">Empower Your Journey with Expert Guidance</h1>
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

                {/* Mentor Grid */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{mentor.name}</h3>
                                    <p className="text-sm text-gray-600">{mentor.role}</p>
                                    <p className="text-sm text-gray-600">{mentor.company}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {mentor.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <FaMapMarkerAlt />
                                <span>{mentor.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <FaClock />
                                <span>{mentor.availability}</span>
                            </div>

                            <div className="flex items-center mb-4">
                                {renderStars(mentor.rating, mentor.reviews)}
                            </div>

                            <div className="flex gap-2 mb-4">
                                {mentor.social.includes('linkedin') && (
                                    <FaLinkedin className="text-gray-600" />
                                )}
                                {mentor.social.includes('github') && (
                                    <FaGithub className="text-gray-600" />
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                                    Book Session
                                </button>
                                <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="bg-blue-600 text-white p-8 rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Ready to accelerate your growth?</h2>
                        <p>Get personalized mentor recommendations based on your goals.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg">
                            Quick Connect
                        </button>
                        <button className="border border-white text-white px-6 py-2 rounded-lg">
                            Get Recommendations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;