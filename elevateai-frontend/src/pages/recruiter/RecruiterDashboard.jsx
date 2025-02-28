import Sidebar from "./Sidebar";
import { 
    Chart as ChartJS, 
    ArcElement, 
    CategoryScale,
    LinearScale,
    BarElement
  } from 'chart.js';
import { useEffect, useState } from "react";
  import { Doughnut, Bar } from 'react-chartjs-2';
  import { Link } from "react-router-dom";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';


ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

const RecruiterDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplicants, setTotalApplicants] = useState(0);
    const [averageApplications, setAverageApplications] = useState(0);
    const [applicants, setApplicants] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                
                // Fetch user data
                const userResponse = await fetch(`${API_BASE_URL}/api/users/user/${userId}`);
                const userData = await userResponse.json();
                setUserData(userData);

                // Fetch jobs by recruiter ID
                const jobsResponse = await fetch(`${API_BASE_URL}/api/internships/recruiter/${userId}`);
                const jobsData = await jobsResponse.json();
                setJobs(jobsData);
                setTotalJobs(jobsData.length);

                // Calculate stats
                const totalApplicantsCount = jobsData.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);
                setTotalApplicants(totalApplicantsCount);
                setAverageApplications(jobsData.length ? totalApplicantsCount / jobsData.length : 0);

                // Get application statuses for bar chart
                const applicationStatuses = jobsData.reduce((acc, job) => {
                    job.applicants?.forEach(applicant => {
                        acc[applicant.status] = (acc[applicant.status] || 0) + 1;
                    });
                    return acc;
                }, {});

                // Update bar chart data
                setBarData({
                    labels: Object.keys(applicationStatuses),
                    datasets: [{
                        data: Object.values(applicationStatuses),
                        backgroundColor: '#3B82F6',
                        borderRadius: 8,
                    }]
                });

                // Get skills distribution for doughnut chart
                const skillsDistribution = {};
                jobsData.forEach(job => {
                    const category = job.category;
                    skillsDistribution[category] = (skillsDistribution[category] || 0) + 1;
                });

                // Update doughnut chart data
                setDoughnutData({
                    labels: Object.keys(skillsDistribution),
                    datasets: [{
                        data: Object.values(skillsDistribution),
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
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {jobs.map((job, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold mb-2">{job.title}</h4>
                                <div className="flex justify-between text-sm text-gray-600 mb-3">
                                    <span>Applications: {job.applicants.length}</span>
                                    <span>Active for {Math.floor((new Date() - new Date(job.posted_time)) / (1000 * 60 * 60 * 24))} days</span>
                                </div>
                                <button className="text-blue-600 text-sm hover:underline">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                  {/* Recent Applications Table */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-600 text-sm">
                                <th className="pb-4">NAME</th>
                                <th className="pb-4">EMAIL</th>
                                <th className="pb-4">JOB TITLE</th>
                                <th className="pb-4">UNIVERSITY</th>
                                <th className="pb-4">GRADUATION YEAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants?.map((job, index) => (
                                job.applicants.map((applicant, applicantIndex) => (
                                    <tr key={`${index}-${applicantIndex}`} className="border-t">
                                        <td className="py-4">{applicant.fullName}</td>
                                        <td>{applicant.email}</td>
                                        <td>{job.jobTitle}</td>
                                        <td>{applicant.studentDetails.collegeName}</td>
                                        
                                        <td>{applicant.studentDetails.yearOfStudy}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default RecruiterDashboard;
