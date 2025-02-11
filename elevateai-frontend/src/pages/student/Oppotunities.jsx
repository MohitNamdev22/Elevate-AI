import React from 'react';
import { FaSearch, FaRegBookmark, FaBell, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Opportunities = () => {
    const topPicks = [
        {
            company: 'TechCorp Solutions',
            logo: '/api/placeholder/40/40',
            title: 'React Developer Internship',
            type: 'Internship',
            location: 'Remote',
            tags: ['internship', 'Remote']
        },
        {
            company: 'Innovation Hub',
            logo: '/api/placeholder/40/40',
            title: 'AI/ML Hackathon 2024',
            type: 'Hackathon',
            location: 'San Francisco',
            tags: ['hackathon', 'San Francisco']
        },
        {
            company: 'Global Tech Inc',
            logo: '/api/placeholder/40/40',
            title: 'Frontend Engineer',
            type: 'Full-time',
            location: 'New York',
            tags: ['full-time', 'New York']
        }
    ];

    const opportunities = [
        {
            title: 'Software Engineer',
            company: 'Tech Innovation',
            tags: ['React', 'NodeJs', 'TypeScript'],
            location: 'San Francisco',
            timeAgo: '2 days ago'
        },
        {
            title: 'Product Design Intern',
            company: 'Creative Solution',
            tags: ['Figma', 'UI/UX', 'Prototyping'],
            location: 'Remote',
            timeAgo: '1 day ago'
        },
        {
            title: 'Data Science Hackathon',
            company: 'AI Research Lab',
            tags: ['Python', 'ML', 'Data Analysis'],
            location: 'Boston',
            timeAgo: '5 days ago'
        },
        {
            title: 'Cloud Engineering Summit',
            company: 'Cloud Tech Co',
            tags: ['AWS', 'DevOps', 'Kubernetes'],
            location: 'Virtual',
            timeAgo: '5 days ago'
        }
    ];

    const events = [
        {
            title: 'Quasar 2024 Hackathon',
            organizer: 'Tech Community',
            date: 'Mar 15-17, 2024',
            deadline: 'Registration Deadline: Mar 1, 2024',
            image: '/api/placeholder/300/200'
        },
        {
            title: 'Web3 Developer Meetup',
            organizer: 'Blockchain Hub',
            date: 'Mar 20, 2024',
            deadline: 'Registration Deadline: Mar 19, 2024',
            image: '/api/placeholder/300/200'
        },
        {
            title: 'AI/ML Workshop Series',
            organizer: 'Data Science Club',
            date: 'Mar 25-27, 2024',
            deadline: 'Registration Deadline: Mar 20, 2024',
            image: '/api/placeholder/300/200'
        }
    ];

    return (
        <div className="flex bg-[#F8FAFC]">
            <Sidebar />
            <div className="mt-16 w-full min-h-screen p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Unlock Your Next Opportunity</h1>
                    <p className="text-gray-600">Discover jobs, internships, hackathons, and events tailored to your aspirations!</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by role, location, or event type..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mt-4">
                        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                            <option>Opportunity Type</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                            <option>Location</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                            <option>Category</option>
                        </select>
                    </div>
                </div>

                {/* Top Picks */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Top Picks for You</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {topPicks.map((pick, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between mb-4">
                                    <img src={pick.logo} alt={pick.company} className="w-10 h-10 rounded" />
                                    <FaRegBookmark className="text-gray-400" />
                                </div>
                                <h3 className="font-medium mb-2">{pick.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{pick.company}</p>
                                <div className="flex gap-2 mb-4">
                                    {pick.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="w-full bg-blue-600 text-white rounded-lg py-2">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-6 mb-8">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                        <span>Jobs</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <span>Internships</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <span>Hackathons</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <span>Technical Meetups</span>
                    </button>
                </div>

                {/* Opportunities List */}
                <div className="mb-12">
                    {opportunities.map((opp, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 mb-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-medium mb-2">{opp.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{opp.company}</p>
                                <div className="flex gap-2">
                                    {opp.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                    <FaMapMarkerAlt />
                                    <span>{opp.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                                    <FaRegClock />
                                    <span>{opp.timeAgo}</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Events */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Upcoming Events to Supercharge Your Skills</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="font-medium mb-2">{event.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{event.organizer}</p>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                        <FaRegClock />
                                        <span>{event.date}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{event.deadline}</p>
                                    <button className="w-full bg-blue-600 text-white rounded-lg py-2">
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opportunities;