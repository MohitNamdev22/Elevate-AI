import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import Sidebar from './Sidebar';
import { FaCalendar, FaChartPie, FaCheck, FaClock } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Roadmap = () => {
    const progressData = [
        { skill: 'HTML', progress: 90 },
        { skill: 'CSS', progress: 85 },
        { skill: 'JavaScript', progress: 70 },
        { skill: 'React', progress: 65 },
        { skill: 'Node.js', progress: 40 }
    ];

    const timeData = [
        { name: 'HTML', time: 100 },
        { name: 'CSS', time: 95 },
        { name: 'JavaScript', time: 80 },
        { name: 'React', time: 75 },
        { name: 'Node.js', time: 45 }
    ];

    const roadmapItems = [
        { title: 'HTML & CSS Fundamentals', duration: '2 weeks', status: 'completed' },
        { title: 'JavaScript Basics', duration: '3 weeks', status: 'completed' },
        { title: 'React Fundamentals', duration: '4 weeks', status: 'in-progress' },
        { title: 'Backend Development', duration: '4 weeks', status: 'not-started' }
    ];

    const recommendedRoadmaps = [
        {
            title: 'Data Science Fundamentals',
            duration: '12 weeks',
            level: 'Intermediate',
            image: '/api/placeholder/300/200'
        },
        {
            title: 'AI & Machine Learning',
            duration: '16 weeks',
            level: 'Advanced',
            image: '/api/placeholder/300/200'
        },
        {
            title: 'Cloud Computing',
            duration: '10 weeks',
            level: 'Intermediate',
            image: '/api/placeholder/300/200'
        }
    ];

    return (
        <div className="flex bg-[#F8FAFC]">

            <Sidebar />
            <div className="mt-16 w-full min-h-screen">
                {/* Header */}
                <div className="bg-white p-6 m-[3px]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Your Personalized Learning Roadmap</h1>
                            <p className="text-gray-600">Progressing toward your career goals, one step at a time</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-20 h-20">
                                <CircularProgressbar
                                    value={40}
                                    text={`40%`}
                                    strokeWidth={8}
                                    styles={buildStyles({
                                        textColor: "#2563eb",
                                        pathColor: "#2563eb",
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>
                            <p className="text-sm text-gray-600">Overall Progress</p>
                        </div>
                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-4 gap-8 mb-4">
                        <div className="flex flex-col items-start border border-gray-200 rounded-lg px-4 py-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1 rounded-lg">
                                    <FaChartPie className="text-blue-600 text-md m-[3px]" />
                                </div>
                                <span className="text-xl font-bold text-black">40%</span>
                            </div>
                            <span className="text-sm text-gray-600 mt-1">Overall Progress</span>
                        </div>
                        <div className="flex flex-col items-start border border-gray-200 rounded-lg px-4 py-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1 rounded-lg">
                                    <FaClock className="text-blue-600 text-md m-[3px]" />
                                </div>
                                <span className="text-xl font-bold text-black">45h</span>
                            </div>
                            <span className="text-sm text-gray-600 mt-1">Time Spent</span>
                        </div>
                        <div className="flex flex-col items-start border border-gray-200 rounded-lg px-4 py-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1 rounded-lg">
                                    <FaCheck className="text-blue-600 text-md m-[3px]" />
                                </div>
                                <span className="text-xl font-bold text-black">12</span>
                            </div>
                            <span className="text-sm text-gray-600 mt-1">Completed Roadmaps</span>
                        </div>
                        <div className="flex flex-col items-start border border-gray-200 rounded-lg px-4 py-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-1 rounded-lg">
                                    <FaCalendar className="text-blue-600 text-md m-[3px]" />
                                </div>
                                <span className="text-xl font-bold text-black">8</span>
                            </div>
                            <span className="text-sm text-gray-600 mt-1">Days Remaining</span>
                        </div>
                    </div>

                </div>

                {/* Active Roadmap */}
                <div className="mb-8 p-6">
                    <h2 className="text-xl font-bold mb-4">Active Roadmap: Full-Stack Developer</h2>
                    <div className="space-y-4">
                        {roadmapItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 bg-white rounded-lg p-6 flex justify-between items-center"
                            >
                                {/* Left Section: Title & Duration */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{item.title}</h3>
                                        {item.status === 'completed' && (
                                            <FaCheck className="text-green-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaClock className="text-gray-600 text-sm" />
                                        <span className="text-sm text-gray-600">{item.duration}</span>
                                    </div>
                                </div>
                                {/* Right Section: Progress Bar & Status Button */}
                                <div className="flex items-center gap-6">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width:
                                                    item.status === 'completed'
                                                        ? '100%'
                                                        : item.status === 'in-progress'
                                                            ? '75%'
                                                            : '0%',
                                                backgroundColor:
                                                    item.status === 'completed'
                                                        ? '#22c55e'
                                                        : item.status === 'in-progress'
                                                            ? '#2563eb'
                                                            : 'transparent'
                                            }}
                                        ></div>
                                    </div>
                                    <button
                                        className={`text-sm px-2 py-1 rounded ${item.status === 'in-progress'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 opacity-50'
                                            }`}
                                        disabled={item.status !== 'in-progress'}
                                    >
                                        {item.status === 'completed'
                                            ? 'Completed'
                                            : item.status === 'in-progress'
                                                ? 'Continue'
                                                : 'Start'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Analytics */}
                <div className="mb-8 p-6 bg-white m-6 border rounded-md">
                    <h2 className="text-xl font-bold mb-4">Progress Analytics</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className='border rounded-md p-4'>
                            <h3 className="font-medium mb-4">Skills Progress</h3>
                            <div className="h-64">
                                <LineChart width={400} height={250} data={progressData}>
                                    <XAxis dataKey="skill" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="progress" stroke="#2563eb" />
                                </LineChart>
                            </div>
                        </div>
                        <div className='border rounded-md p-4'>
                            <h3 className="font-medium mb-4">Time Distribution</h3>
                            <div className="space-y-4">
                                {timeData.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{item.name}</span>
                                            <span>{item.time}h</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${item.time}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Roadmaps */}
                <div className='p-6'>
                    <h2 className="text-xl font-bold mb-4">Recommended Roadmaps</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {recommendedRoadmaps.map((roadmap, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <img
                                    src={roadmap.image}
                                    alt={roadmap.title}
                                    className="w-full h-32 object-cover rounded mb-4"
                                />
                                <h3 className="font-medium mb-2">{roadmap.title}</h3>
                                <div className="flex justify-between text-sm text-gray-600 mb-4">
                                    <span>{roadmap.duration}</span>
                                    <span>• {roadmap.level}</span>
                                </div>
                                <button className="w-full bg-blue-600 text-white rounded py-2">
                                    Start Learning
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;