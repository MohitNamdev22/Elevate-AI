import Sidebar from "./Sidebar";
import { 
    Chart as ChartJS, 
    ArcElement, 
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,     // Add this
    Legend  
  } from 'chart.js';
import { useEffect, useState } from "react";
  import { Doughnut, Bar } from 'react-chartjs-2';
  import { Link } from "react-router-dom";
  import { format, differenceInDays } from 'date-fns';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';

  ChartJS.register(
    ArcElement, 
    CategoryScale, 
    LinearScale, 
    BarElement,
    Tooltip,
    Legend
);


const RecruiterDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplicants, setTotalApplicants] = useState(0);
    const [averageApplications, setAverageApplications] = useState(0);
    const [applicants, setApplicants] = useState([]);
    const [recentApplicants, setRecentApplicants] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState([{
    "candidates": [
      {
        "jobTitle": "Great Job",
        "jobId": "67b10f63a4ed11bb3f5efb5e",
        "applicants": [
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "vkj dn",
                "leetcode": "djfknbg"
              },
              "skills": [
                "rfe",
                "aefwrg",
                "wrgerg"
              ],
              "collegeName": "rkjf r",
              "yearOfStudy": "2",
              "certificates": [
                "rfnergejrng"
              ],
              "achievements": "fdsvkjnfvdjq",
              "experience": []
            },
            "fullName": "Yash Bajaj",
            "email": "y1@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "Yashh-Bajaj",
                "leetcode": "namdevmohit0"
              },
              "skills": [
                "web dev",
                "c++",
                "reactjs"
              ],
              "collegeName": "Medicaps",
              "yearOfStudy": "3",
              "certificates": [
                "aws certificate"
              ],
              "achievements": "sih hackathon",
              "experience": [
                {
                  "company": "TCL",
                  "title": "Frontend Developer",
                  "description": "machine building",
                  "duration": ""
                }
              ]
            },
            "fullName": "Rohan Verma",
            "email": "rohan@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "Yashh-Bajaj",
                "leetcode": "namdevmohit0"
              },
              "skills": [
                "web dev",
                "c++",
                "reactjs"
              ],
              "collegeName": "Medicaps",
              "yearOfStudy": "3",
              "certificates": [
                "aws certificate"
              ],
              "achievements": "sih hackathon",
              "experience": [
                {
                  "company": "TCL",
                  "title": "Frontend Developer",
                  "description": "modules building",
                  "duration": ""
                }
              ]
            },
            "fullName": "Rahul Namdev",
            "email": "yashdev@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "john_doe",
                "leetcode": "jd123"
              },
              "skills": [
                "java",
                "python",
                "django"
              ],
              "collegeName": "IIT Bombay",
              "yearOfStudy": "4",
              "certificates": [
                "Google Cloud Certification"
              ],
              "achievements": "GSoC Participant",
              "experience": [
                {
                  "company": "Google",
                  "title": "Backend Developer Intern",
                  "description": "API development",
                  "duration": "3 months"
                }
              ]
            },
            "fullName": "John Doe",
            "email": "john.doe@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "jane_smith",
                "leetcode": "jsmith123"
              },
              "skills": [
                "javascript",
                "nodejs",
                "react"
              ],
              "collegeName": "NIT Trichy",
              "yearOfStudy": "3",
              "certificates": [
                "AWS Solutions Architect"
              ],
              "achievements": "Won Hackathon at NIT",
              "experience": [
                {
                  "company": "Amazon",
                  "title": "Full Stack Developer Intern",
                  "description": "Developed scalable web apps",
                  "duration": "2 months"
                }
              ]
            },
            "fullName": "Jane Smith",
            "email": "jane.smith@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "emily_jones",
                "leetcode": "ejones789"
              },
              "skills": [
                "machine learning",
                "python",
                "tensorflow"
              ],
              "collegeName": "IIIT Hyderabad",
              "yearOfStudy": "4",
              "certificates": [
                "Deep Learning Specialization"
              ],
              "achievements": "Published Research on CNNs",
              "experience": [
                {
                  "company": "Facebook",
                  "title": "ML Engineer Intern",
                  "description": "Developed recommendation models",
                  "duration": "6 months"
                }
              ]
            },
            "fullName": "Emily Jones",
            "email": "emily.jones@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "rohit_mehta",
                "leetcode": "rmehta999"
              },
              "skills": [
                "C",
                "C++",
                "algorithms"
              ],
              "collegeName": "BITS Pilani",
              "yearOfStudy": "3",
              "certificates": [
                "Data Structures and Algorithms"
              ],
              "achievements": "ACM ICPC Finalist",
              "experience": [
                {
                  "company": "Microsoft",
                  "title": "Software Engineer Intern",
                  "description": "Worked on core algorithms",
                  "duration": "3 months"
                }
              ]
            },
            "fullName": "Rohit Mehta",
            "email": "rohit.mehta@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "maria_kumar",
                "leetcode": "mkumar567"
              },
              "skills": [
                "html",
                "css",
                "javascript"
              ],
              "collegeName": "VIT Vellore",
              "yearOfStudy": "2",
              "certificates": [
                "Frontend Web Development"
              ],
              "achievements": "Runner-up in SIH",
              "experience": [
                {
                  "company": "Zoho",
                  "title": "Frontend Developer Intern",
                  "description": "Worked on UI/UX",
                  "duration": "2 months"
                }
              ]
            },
            "fullName": "Maria Kumar",
            "email": "maria.kumar@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "sam_verma",
                "leetcode": "sverma654"
              },
              "skills": [
                "kotlin",
                "android development",
                "java"
              ],
              "collegeName": "SRM University",
              "yearOfStudy": "4",
              "certificates": [
                "Android Developer Certification"
              ],
              "achievements": "Built Android apps with 10k+ downloads",
              "experience": [
                {
                  "company": "Flipkart",
                  "title": "Android Developer Intern",
                  "description": "Built customer-facing apps",
                  "duration": "4 months"
                }
              ]
            },
            "fullName": "Sam Verma",
            "email": "sam.verma@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "priya_agarwal",
                "leetcode": "pagarwal321"
              },
              "skills": [
                "php",
                "mysql",
                "laravel"
              ],
              "collegeName": "Amity University",
              "yearOfStudy": "3",
              "certificates": [
                "Full Stack Web Development"
              ],
              "achievements": "Developed e-commerce website",
              "experience": [
                {
                  "company": "Paytm",
                  "title": "Backend Developer Intern",
                  "description": "Worked on payment gateways",
                  "duration": "5 months"
                }
              ]
            },
            "fullName": "Priya Agarwal",
            "email": "priya.agarwal@gmail.com"
          },
          {
            "studentDetails": {
              "socialProfiles": {
                "github": "emily_jones",
                "leetcode": "ejones789"
              },
              "skills": [
                "machine learning",
                "python",
                "tensorflow"
              ],
              "collegeName": "IIIT Hyderabad",
              "yearOfStudy": "4",
              "certificates": [
                "Deep Learning Specialization"
              ],
              "achievements": "Published Research on CNNs",
              "experience": [
                {
                  "company": "Facebook",
                  "title": "ML Engineer Intern",
                  "description": "Developed recommendation models",
                  "duration": "6 months"
                }
              ]
            },
            "fullName": "Ram Kapoor",
            "email": "emily.jones@gmail.com"
          }
        ]
      }
    ],
    "job_description": "Machine Learning and hard working"
  }]);

  const [rankingResults, setRankingResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                
                // Fetch user data
                const userResponse = await fetch(`${API_BASE_URL}/api/users/user/${userId}`);
                const userData = await userResponse.json();
                setUserData(userData);

                // Fetch jobs and applicants data
                const jobsResponse = await fetch(`${API_BASE_URL}/api/internships/recruiter/${userId}`);
                const jobsData = await jobsResponse.json();
                setJobs(jobsData);
                setTotalJobs(jobsData.length);

                // Fetch applicants data
                const applicantsResponse = await fetch(`${API_BASE_URL}/api/internships/${userId}/applicants1`);
                const applicantsData = await applicantsResponse.json();
                setRecentApplicants(applicantsData);

                // Calculate stats
                const totalApplicantsCount = applicantsData.reduce(
                    (acc, job) => acc + job.applicants.length, 
                    0
                );
                setTotalApplicants(totalApplicantsCount);
                setAverageApplications(
                    jobsData.length ? totalApplicantsCount / jobsData.length : 0
                );

                // Calculate application status distribution
                const statusData = calculateApplicationStatus(applicantsData);
                setBarData({
                    labels: Object.keys(statusData),
                    datasets: [{
                        data: Object.values(statusData),
                        backgroundColor: '#3B82F6',
                        borderRadius: 8,
                    }]
                });

                // Calculate job categories distribution
                const categoriesData = calculateJobCategories(jobsData);
                setDoughnutData({
                    labels: Object.keys(categoriesData),
                    datasets: [{
                        data: Object.values(categoriesData),
                        backgroundColor: [
                            '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1'
                        ],
                        borderWidth: 0
                    }]
                });

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateApplicationStatus = (applicantsData) => {
        const statuses = {
            'Pending': 0,
            'Reviewing': 0,
            'Shortlisted': 0,
            'Hired': 0
        };

        applicantsData.forEach(job => {
            job.applicants.forEach(applicant => {
                const status = applicant.status || 'Pending';
                statuses[status] = (statuses[status] || 0) + 1;
            });
        });

        return statuses;
    };

    const calculateJobCategories = (jobsData) => {
        return jobsData.reduce((acc, job) => {
            const category = job.category || 'Other';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
    };

    const [barData, setBarData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: '#3B82F6',
            borderRadius: 8,
        }]
    });

    const [doughnutData, setDoughnutData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderWidth: 0
        }]
    });

    const fetchApplicants = (jobId) => {
        fetch(`${API_BASE_URL}/api/internships/${jobId}/applicants`)
            .then(response => response.json())
            .then(data => setApplicants(data))
            .catch(error => console.error('Error fetching applicants:', error));
    };

  
  // Sample data for charts

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

   // Open modal with selected job details
   const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setRankingResults([]);
  };

  // Handle ranking API call
  const handleRankCandidates = async () => {
    if (!selectedJob) return;

    // Hardcoded payload based on the provided JSON structure.
    

    const payload = {
        "candidates": [
          {
            "jobTitle": "Great Job",
            "jobId": "67b10f63a4ed11bb3f5efb5e",
            "applicants": [
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "vkj dn",
                    "leetcode": "djfknbg"
                  },
                  "skills": [
                    "rfe",
                    "aefwrg",
                    "wrgerg"
                  ],
                  "collegeName": "rkjf r",
                  "yearOfStudy": "2",
                  "certificates": [
                    "rfnergejrng"
                  ],
                  "achievements": "fdsvkjnfvdjq",
                  "experience": []
                },
                "fullName": "Yash Bajaj",
                "email": "y1@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "Yashh-Bajaj",
                    "leetcode": "namdevmohit0"
                  },
                  "skills": [
                    "web dev",
                    "c++",
                    "reactjs"
                  ],
                  "collegeName": "Medicaps",
                  "yearOfStudy": "3",
                  "certificates": [
                    "aws certificate"
                  ],
                  "achievements": "sih hackathon",
                  "experience": [
                    {
                      "company": "TCL",
                      "title": "Frontend Developer",
                      "description": "machine building",
                      "duration": ""
                    }
                  ]
                },
                "fullName": "Rohan Verma",
                "email": "rohan@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "Yashh-Bajaj",
                    "leetcode": "namdevmohit0"
                  },
                  "skills": [
                    "web dev",
                    "c++",
                    "reactjs"
                  ],
                  "collegeName": "Medicaps",
                  "yearOfStudy": "3",
                  "certificates": [
                    "aws certificate"
                  ],
                  "achievements": "sih hackathon",
                  "experience": [
                    {
                      "company": "TCL",
                      "title": "Frontend Developer",
                      "description": "modules building",
                      "duration": ""
                    }
                  ]
                },
                "fullName": "Rahul Namdev",
                "email": "yashdev@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "john_doe",
                    "leetcode": "jd123"
                  },
                  "skills": [
                    "java",
                    "python",
                    "django"
                  ],
                  "collegeName": "IIT Bombay",
                  "yearOfStudy": "4",
                  "certificates": [
                    "Google Cloud Certification"
                  ],
                  "achievements": "GSoC Participant",
                  "experience": [
                    {
                      "company": "Google",
                      "title": "Backend Developer Intern",
                      "description": "API development",
                      "duration": "3 months"
                    }
                  ]
                },
                "fullName": "John Doe",
                "email": "john.doe@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "jane_smith",
                    "leetcode": "jsmith123"
                  },
                  "skills": [
                    "javascript",
                    "nodejs",
                    "react"
                  ],
                  "collegeName": "NIT Trichy",
                  "yearOfStudy": "3",
                  "certificates": [
                    "AWS Solutions Architect"
                  ],
                  "achievements": "Won Hackathon at NIT",
                  "experience": [
                    {
                      "company": "Amazon",
                      "title": "Full Stack Developer Intern",
                      "description": "Developed scalable web apps",
                      "duration": "2 months"
                    }
                  ]
                },
                "fullName": "Jane Smith",
                "email": "jane.smith@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "emily_jones",
                    "leetcode": "ejones789"
                  },
                  "skills": [
                    "machine learning",
                    "python",
                    "tensorflow"
                  ],
                  "collegeName": "IIIT Hyderabad",
                  "yearOfStudy": "4",
                  "certificates": [
                    "Deep Learning Specialization"
                  ],
                  "achievements": "Published Research on CNNs",
                  "experience": [
                    {
                      "company": "Facebook",
                      "title": "ML Engineer Intern",
                      "description": "Developed recommendation models",
                      "duration": "6 months"
                    }
                  ]
                },
                "fullName": "Emily Jones",
                "email": "emily.jones@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "rohit_mehta",
                    "leetcode": "rmehta999"
                  },
                  "skills": [
                    "C",
                    "C++",
                    "algorithms"
                  ],
                  "collegeName": "BITS Pilani",
                  "yearOfStudy": "3",
                  "certificates": [
                    "Data Structures and Algorithms"
                  ],
                  "achievements": "ACM ICPC Finalist",
                  "experience": [
                    {
                      "company": "Microsoft",
                      "title": "Software Engineer Intern",
                      "description": "Worked on core algorithms",
                      "duration": "3 months"
                    }
                  ]
                },
                "fullName": "Rohit Mehta",
                "email": "rohit.mehta@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "maria_kumar",
                    "leetcode": "mkumar567"
                  },
                  "skills": [
                    "html",
                    "css",
                    "javascript"
                  ],
                  "collegeName": "VIT Vellore",
                  "yearOfStudy": "2",
                  "certificates": [
                    "Frontend Web Development"
                  ],
                  "achievements": "Runner-up in SIH",
                  "experience": [
                    {
                      "company": "Zoho",
                      "title": "Frontend Developer Intern",
                      "description": "Worked on UI/UX",
                      "duration": "2 months"
                    }
                  ]
                },
                "fullName": "Maria Kumar",
                "email": "maria.kumar@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "sam_verma",
                    "leetcode": "sverma654"
                  },
                  "skills": [
                    "kotlin",
                    "android development",
                    "java"
                  ],
                  "collegeName": "SRM University",
                  "yearOfStudy": "4",
                  "certificates": [
                    "Android Developer Certification"
                  ],
                  "achievements": "Built Android apps with 10k+ downloads",
                  "experience": [
                    {
                      "company": "Flipkart",
                      "title": "Android Developer Intern",
                      "description": "Built customer-facing apps",
                      "duration": "4 months"
                    }
                  ]
                },
                "fullName": "Sam Verma",
                "email": "sam.verma@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "priya_agarwal",
                    "leetcode": "pagarwal321"
                  },
                  "skills": [
                    "php",
                    "mysql",
                    "laravel"
                  ],
                  "collegeName": "Amity University",
                  "yearOfStudy": "3",
                  "certificates": [
                    "Full Stack Web Development"
                  ],
                  "achievements": "Developed e-commerce website",
                  "experience": [
                    {
                      "company": "Paytm",
                      "title": "Backend Developer Intern",
                      "description": "Worked on payment gateways",
                      "duration": "5 months"
                    }
                  ]
                },
                "fullName": "Priya Agarwal",
                "email": "priya.agarwal@gmail.com"
              },
              {
                "studentDetails": {
                  "socialProfiles": {
                    "github": "emily_jones",
                    "leetcode": "ejones789"
                  },
                  "skills": [
                    "machine learning",
                    "python",
                    "tensorflow"
                  ],
                  "collegeName": "IIIT Hyderabad",
                  "yearOfStudy": "4",
                  "certificates": [
                    "Deep Learning Specialization"
                  ],
                  "achievements": "Published Research on CNNs",
                  "experience": [
                    {
                      "company": "Facebook",
                      "title": "ML Engineer Intern",
                      "description": "Developed recommendation models",
                      "duration": "6 months"
                    }
                  ]
                },
                "fullName": "Ram Kapoor",
                "email": "emily.jones@gmail.com"
              }
            ]
          }
        ],
        "job_description": "We are looking for a skilled Software Engineer with at least 2 years of experience in software development. The ideal candidate should have hands-on experience in designing, developing, and maintaining scalable applications. You will collaborate with cross-functional teams to develop high-quality software solutions and contribute to the overall success of our projects."
      };

    try {
      const res = await fetch("https://sort-a527.onrender.com/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setRankingResults(data);
    } catch (err) {
      console.error("Error ranking candidates:", err);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
}

if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
    </div>;
}


    return (
        <div className="flex bg-[#F8FAFC]">

            <Sidebar />
            <div className=" mt-16 p-8 w-full min-h-screen">
                {/* Welcome Section */}
                <div className="flex justify-between items-center mb-8">
                <div>
                        <h1 className="text-2xl font-semibold">Hello, {userData?.fullName}!</h1>
                        <p className="text-gray-600">{userData?.recruiterDetails?.jobTitle} at {userData?.recruiterDetails?.companyName}</p>
                    </div>
                    <div className="space-x-3">
        <Link to="/recruiter/opportunity-listing/jobpost">

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Post New Job
                        </button>
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Schedule Interview
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">Active Job Posts</p>
                                <h3 className="text-2xl font-bold">{totalJobs}</h3>
                            </div>
                            <span className="text-green-500 text-sm">
                                +{totalJobs} this week
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">Total Applications</p>
                                <h3 className="text-2xl font-bold">{totalApplicants}</h3>
                            </div>
                            <span className="text-green-500 text-sm">
                                +{totalApplicants} this week
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">Average Applications per Job</p>
                                <h3 className="text-2xl font-bold">{averageApplications.toFixed(2)}</h3>
                            </div>
                            <span className="text-green-500 text-sm">
                                +{averageApplications.toFixed(2)} this week
                            </span>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-4">Application Status</h3>
                        <div className="h-64">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-4">Job Categories Distribution</h3>
                        <div className="h-64 flex justify-center">
                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                </div>

                   {/* Active Job Listings */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Active Job Listings</h3>
                        <Link to="/recruiter/opportunity-listing" className="text-blue-600 text-sm">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {jobs.slice(0, 6).map((job) => (
                            <div key={job._id} className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold mb-2">{job.title}</h4>
                                <div className="flex justify-between text-sm text-gray-600 mb-3">
                                    <span>Applications: {job.applicants?.length || 0}</span>
                                    <span>
                                        {job.posted_time ? 
                                            `Active for ${differenceInDays(new Date(), new Date(job.posted_time))} days` :
                                            'Recently posted'
                                        }
                                    </span>
                                </div>
                                <button 
                  onClick={() => openModal(job)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Details
                </button>
                            </div>
                        ))}
                    </div>
                </div>

                  {/* Recent Applications Table */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Recent Applications</h3>
                        <Link to="/recruiter/candidates" className="text-blue-600 text-sm">
                            View All Applications
                        </Link>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-600 text-sm">
                                <th className="pb-4">NAME</th>
                                <th className="pb-4">EMAIL</th>
                                <th className="pb-4">JOB TITLE</th>
                                <th className="pb-4">UNIVERSITY</th>
                                <th className="pb-4">GRADUATION YEAR</th>
                                <th className="pb-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplicants.slice(0, 5).map((job) => 
                                job.applicants.map((applicant) => (
                                    <tr key={applicant._id} className="border-t">
                                        <td className="py-4">{applicant.fullName}</td>
                                        <td>{applicant.email}</td>
                                        <td>{job.jobTitle}</td>
                                        <td>{applicant.studentDetails?.collegeName}</td>
                                        <td>{applicant.studentDetails?.yearOfStudy}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 text-sm hover:underline">
                                                    View Profile
                                                </button>
                                                <button className="text-green-600 text-sm hover:underline">
                                                    Contact
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {modalOpen && selectedJob && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg relative">
      <button 
        onClick={closeModal} 
        className="absolute top-2 right-2 text-2xl font-bold text-gray-600"
      >
        &times;
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Details</h2>
        <button 
          onClick={handleRankCandidates}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Rank with AI
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Job description and Candidate count */}
        <div className="md:w-1/2">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p>
            {"We are looking for a skilled Software Engineer with at least 2 years of experience in software development. The ideal candidate should have hands-on experience in designing, developing, and maintaining scalable applications. You will collaborate with cross-functional teams to develop high-quality software solutions and contribute to the overall success of our projects."}
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Candidates Applied</h3>
            <p className="text-3xl text-center">
              10
            </p>
          </div>
        </div>
        {/* Right Column: Ranking results table */}
        <div className="md:w-1/2">
          <h3 className="font-semibold mb-2 text-center">Ranking Results</h3>
          {rankingResults.length > 0 ? (
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">ATS Score</th>
                </tr>
              </thead>
              <tbody>
                {rankingResults.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">{item.ats_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center">No ranking data yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
)}
            </div>
        </div>
    )
};

export default RecruiterDashboard;
