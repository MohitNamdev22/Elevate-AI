import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaRegBookmark, FaMapMarkerAlt, FaRegClock, FaMoneyBillWave, FaLink } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const [hackathons, setHackathons] = useState([]);
  const [internships, setInternships] = useState([]);
  const [visibleHackathons, setVisibleHackathons] = useState(6);
  const [visibleInternships, setVisibleInternships] = useState(6);
  const [internshipFilters, setInternshipFilters] = useState({
    location: 'all',
    category: 'all',
    searchQuery: ''
  });
  
  const [hackathonFilters, setHackathonFilters] = useState({
    location: 'all',
    searchQuery: ''
  })

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hackResponse, internResponse] = await Promise.all([
          fetch('http://localhost:3000/api/hackathon'),
          fetch('http://localhost:3000/api/internships')
        ]);
        
        const hackData = await hackResponse.json();
        const internData = await internResponse.json();

        setHackathons(hackData.filter(h => 
            h.title && h.title !== 'Applications open' && h.status_tags
          ).map(h => ({
            ...h,
            image: getRandomHackathonImage()
          })));
        
        setInternships(internData.filter(i => 
          i.title !== 'N/A' && i.company !== 'N/A' && i.location
        ));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Update the filteredInternships const
const filteredInternships = internships.filter(intern => {
    const matchesLocation = internshipFilters.location === 'all' || 
      intern.location.toLowerCase() === internshipFilters.location.toLowerCase();
    const matchesCategory = internshipFilters.category === 'all' || 
      intern.category === internshipFilters.category;
    const matchesSearch = intern.title.toLowerCase().includes(internshipFilters.searchQuery.toLowerCase()) ||
      intern.company.toLowerCase().includes(internshipFilters.searchQuery.toLowerCase());
  
    return matchesLocation && matchesCategory && matchesSearch;
  });
  
  // Update the filteredHackathons const
  const filteredHackathons = hackathons.filter(hack => {
    const isOnline = hack.status_tags?.some(tag => tag.toLowerCase() === 'online');
    const matchesLocation = hackathonFilters.location === 'all' || 
      (isOnline ? 'online' : 'offline') === hackathonFilters.location.toLowerCase();
    const matchesSearch = hack.title.toLowerCase().includes(hackathonFilters.searchQuery.toLowerCase());
  
    return matchesLocation && matchesSearch;
  });

const getRandomHackathonImage = () => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    return `/hackathon/pic${randomNum}.jpg`;
  };

  const getHackathonDate = (statusTags) => {
    const dateTag = statusTags?.find(tag => tag.startsWith('Starts '));
    return dateTag ? dateTag.replace('Starts ', '') : 'Date not specified';
  };

  const categoryOptions = [
    { value: '3d-printing', label: '3D Printing' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'ai-ml', label: 'AI/ML' }
  ];

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-16 w-full min-h-screen p-6"
      >
        {/* Header and Search - Same as before */}

        {/* Filters */}
        {/* <div className="flex gap-4 mt-4">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="internship">Internships</option>
            <option value="hackathon">Hackathons</option>
          </select>

          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="all">All Locations</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {filters.type === 'internship' && (
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          )}
        </div> */}

        {/* Internship Filters */}
<div className="mb-8">
<h2 className="text-xl font-bold my-6">Internship Opportunities</h2>

  <div className="flex gap-4">
    <select 
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
      value={internshipFilters.location}
      onChange={(e) => setInternshipFilters({...internshipFilters, location: e.target.value})}
    >
      <option value="all">All Locations</option>
      <option value="online">Online</option>
      <option value="offline">Offline</option>
    </select>

    <select 
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
      value={internshipFilters.category}
      onChange={(e) => setInternshipFilters({...internshipFilters, category: e.target.value})}
    >
      <option value="all">All Categories</option>
      {categoryOptions.map((cat) => (
        <option key={cat.value} value={cat.value}>{cat.label}</option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Search internships..."
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
      value={internshipFilters.searchQuery}
      onChange={(e) => setInternshipFilters({...internshipFilters, searchQuery: e.target.value})}
    />
  </div>
</div>



        {/* Internships Section */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 gap-4">
            {filteredInternships.slice(0, visibleInternships).map((intern) => (
              <motion.div
                key={intern._id}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg border border-gray-200 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{intern.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      {intern.location}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <FaRegClock className="mr-1" />
                      {intern.posted_time}
                    </span>
                    {intern.stipend !== 'N/A' && (
                      <span className="flex items-center text-sm text-green-600">
                        <FaMoneyBillWave className="mr-1" />
                        {intern.stipend}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {intern.category?.replace('-', ' ') || 'General'}
                    </span>
                  </div>
                </div>
                <a
                  href={intern.link}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ml-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply
                </a>
              </motion.div>
            ))}
          </div>
          {visibleInternships < filteredInternships.length && (
            <button
              onClick={() => setVisibleInternships(prev => prev + 6)}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
            >
              Show More Internships
            </button>
          )}
        </motion.div>

        {/* Hackathon Filters */}
<div className="mb-8">
<h2 className="text-xl font-bold my-6">Upcoming Hackathons</h2>
  <div className="flex gap-4">
    <select 
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
      value={hackathonFilters.location}
      onChange={(e) => setHackathonFilters({...hackathonFilters, location: e.target.value})}
    >
      <option value="all">All Locations</option>
      <option value="online">Online</option>
      <option value="offline">Offline</option>
    </select>

    <input
      type="text"
      placeholder="Search hackathons..."
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
      value={hackathonFilters.searchQuery}
      onChange={(e) => setHackathonFilters({...hackathonFilters, searchQuery: e.target.value})}
    />
  </div>
</div>

        {/* Hackathons Section */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.slice(0, visibleHackathons).map((hack) => (
              <motion.div
                key={hack._id}
                variants={itemVariants}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
  <img 
    src={hack.image} 
    alt={hack.title}
    className="w-full h-full object-cover"
  />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
    <h3 className="text-white font-semibold text-lg">{hack.title}</h3>
  </div>
</div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hack.status_tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <FaRegClock />
                    <span>Starts: {getHackathonDate(hack.status_tags)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <FaLink />
                    <Link to={hack.social_links.twitter} target="_blank" rel="noopener noreferrer">
                    <span>: {hack.social_links.twitter}</span>
                    </Link>
                  </div>
                  <a
                    href={hack.link}
                    className="w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleHackathons < filteredHackathons.length && (
            <button
              onClick={() => setVisibleHackathons(prev => prev + 6)}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
            >
              Show More Hackathons
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Opportunities;