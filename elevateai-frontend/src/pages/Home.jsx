import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaSearch, FaMapMarkerAlt, FaCheck, FaStar } from 'react-icons/fa';
import elevateAILogo from '../assets/elevateai-logo.svg';
import backgroundGrid from '../assets/home/background-grid.svg';
import image1 from '../assets/home/image1.svg';
import image2 from '../assets/home/image2.svg';
import image3 from '../assets/home/image3.svg';
import image4 from '../assets/home/image4.svg';
import gmailIcon from '../assets/home/gmail.svg';

const GridBackground = () => (
    <div className="absolute inset-0 z-0">
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="rgb(0 0 0 / 0.05)"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);


const HeroSection = () => {
    return (
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
            {/* Background Grid */}
            <GridBackground />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pt-4">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <img src={elevateAILogo} alt="ElevateAI" className="h-13" /> {/* Increased from h-10 to h-16 */}
                        <div className="ml-3 flex flex-col"> {/* Changed to flex-col for vertical stacking */}
                            <span className="text-2xl font-semibold">ElevateAI</span> {/* Increased size and added font weight */}
                            <span className="text-sm text-gray-600">Empower your career</span> {/* Reduced size and added color */}
                        </div>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-600">Features</a>
                        <a href="#jobs" className="text-gray-600">Find jobs</a>
                        <a href="#faq" className="text-gray-600">FAQ</a>
                        <a href="#contact" className="text-gray-600">Contact Us</a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600">Login</button>
                        <button className="bg-blue-50 text-blue-600 px-4 border-blue-600 border py-1 rounded-2xl">
                            Register Now
                        </button>
                    </div>
                </header>

                {/* Hero Content */}
                <div className="flex mt-12">
                    {/* Left Side */}
                    <div className="w-1/4">
                        <div className="relative">
                            <img src={image1} alt="Professional" className=" rounded-2xl mb-8" />

                            {/* Progress Card */}
                            <div className="bg-white p-4 rounded-xl shadow-lg w-[50%] ml-32">
                                <h4 className="text-sm text-gray-600 mb-2">Your Progress</h4>
                                <div className="bg-gray-100 h-2 rounded-full mb-2">
                                    <div className="bg-blue-500 h-full w-1/5 rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>2 of 10 Day</span>
                                    <FaCheck className="text-green-500" />
                                </div>
                                <p className="text-xs mt-2 text-gray-600">
                                    Great Start! You've Completed 2 Day
                                    <br />Keep Going
                                </p>
                            </div>

                            <img src={image3} alt="Professional" className="rounded-2xl mt-8" />
                        </div>
                    </div>

                    {/* Center Content */}
                    <div className="w-1/2 px-12 text-center">
                        {/* Top Banner */}
                        <div className="bg-blue-50 border text-blue-600 py-2 px-4 rounded-full inline-block mb-8">
                            <span className="flex items-center text-sm">
                                👋 Empowering Careers—Your Next Opportunity Awaits!
                            </span>
                        </div>

                        <h1 className="text-5xl text-[#353535] font-semibold mb-6">
                            Discover, Apply, and Launch
                            <br />
                            Your Dream Career
                        </h1>

                        <p className="text-[#8E8E8E] mb-8 max-w-lg mx-auto text-md">
                            Empower your career journey with AI-driven learning, personalized mentorship,
                            and direct industry connections. Transform education into opportunity.
                        </p>

                        {/* Search Box */}
                        <div className="max-w-3xl mx-auto p-3 bg-white shadow-lg rounded-2xl mt-16">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Find job here"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Mumbai, India"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-3xl hover:bg-blue-600 transition">
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="w-1/4">
                        <div className="relative">
                            <img src={image2} alt="Professional" className="rounded-2xl mb-8 w-32" />
                            <img src={image4} alt="Professional" className="rounded-2xl ml-20" />

                            {/* Job Card */}
                            <div className="bg-white p-4 rounded-xl shadow-lg max-w-xs mt-4">
                                <div className="flex items-start">
                                    <div className="bg-red-50 p-2 rounded">
                                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-medium">Product Designer</h4>
                                        <p className="text-sm text-gray-500">Google Inc</p>
                                        <div className="flex space-x-2 mt-2">
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                Design
                                            </span>
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                Full time
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsSection = () => {
    return (
        <div className="container mx-auto px-20 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-44 items-center">
                {/* Left Side - Text Content */}
                <div>
                    <a href="#" className="text-blue-500 flex items-center space-x-2 mb-3">
                        <span>🔗</span> <span className="underline">More about ElevateAI</span>
                    </a>
                    <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">
    Unlock Your True Potential And
    <br />
    Discover A World Of Opportunities
    <br />
    That Align With Your Skills, Interests,
    <br />
    And Aspirations
</h2>
                    
                </div>

                {/* Right Side - Stats */}
                <div className="grid grid-cols-2 gap-8 text-gray-700">
                    <div>
                        <h3 className="text-3xl font-bold">100K+</h3>
                        <p className="text-gray-500">Active Students</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">57K+</h3>
                        <p className="text-gray-500">People Hired</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">20K+</h3>
                        <p className="text-gray-500">Companies</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">250+</h3>
                        <p className="text-gray-500">Expert Mentors</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
        </div>
    );
};

export default Home;
