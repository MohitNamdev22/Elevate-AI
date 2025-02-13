import Sidebar from "./Sidebar";
import { 
    Chart as ChartJS, 
    ArcElement, 
    CategoryScale,
    LinearScale,
    BarElement
  } from 'chart.js';
  import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

const RecruiterDashboard = () => {
  // Sample data for charts
  const doughnutData = {
    datasets: [{
      data: [70, 30],
      backgroundColor: ['#3B82F6', '#EFF6FF'],
      borderWidth: 0
    }]
  };

  const barData = {
    labels: ['Applied', 'Shortlisted', 'Interview', 'Hired'],
    datasets: [{
      data: [40, 25, 15, 10],
      backgroundColor: '#3B82F6',
      borderRadius: 8,
    }]
  };

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

    return (
        <div className="flex bg-[#F8FAFC]">

            <Sidebar />
            <div className=" mt-16 p-8 w-full min-h-screen">
                {/* Welcome Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold">Hello, Hitika!</h1>
                        <p className="text-gray-600">Find your ideal talent today</p>
                    </div>
                    <div className="space-x-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Post New Job
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Schedule Interview
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {['Active Job Posts', 'Total Applications', 'Total Applications'].map((title, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-600">{title}</p>
                                    <h3 className="text-2xl font-bold">{index === 0 ? '5' : '120'}</h3>
                                </div>
                                <span className="text-green-500 text-sm">
                                    {index === 0 ? '+2' : '+45'} this week
                                </span>
                            </div>
                        </div>
                    ))}
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
                        <h3 className="font-semibold mb-4">Skills Distribution</h3>
                        <div className="h-64 flex justify-center">
                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                </div>

                {/* Active Job Listings */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Active Job Listings</h3>
                        <button className="text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50">
                            + Post New Job
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Senior Frontend Developer',
                                applications: 45,
                                days: 7
                            },
                            {
                                title: 'Product Manager',
                                applications: 32,
                                days: 5
                            },
                            {
                                title: 'UX Designer',
                                applications: 28,
                                days: 3
                            }
                        ].map((job, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold mb-2">{job.title}</h4>
                                <div className="flex justify-between text-sm text-gray-600 mb-3">
                                    <span>Applications: {job.applications}</span>
                                    <span>Active for {job.days} day</span>
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
                                <th className="pb-4">POSITION</th>
                                <th className="pb-4">EXPERIENCE</th>
                                <th className="pb-4">SKILLS</th>
                                <th className="pb-4">STATUS</th>
                                <th className="pb-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    name: 'Alex Thompson',
                                    position: 'Frontend Developer',
                                    experience: '5 years',
                                    skills: ['React', 'TypeScript', 'Node.js'],
                                    status: 'Shortlisted'
                                },
                                {
                                    name: 'Sarah Wilson',
                                    position: 'Product Manager',
                                    experience: '7 years',
                                    skills: ['Product Strategy', 'Agile', 'Leadership'],
                                    status: 'In Review'
                                },
                                {
                                    name: 'Michee Chen',
                                    position: 'UX Designer',
                                    experience: '4 years',
                                    skills: ['UI Design', 'User Research', 'Figma'],
                                    status: 'New'
                                }
                            ].map((candidate, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-4">{candidate.name}</td>
                                    <td>{candidate.position}</td>
                                    <td>{candidate.experience}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            {candidate.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-sm ${candidate.status === 'Shortlisted'
                                                ? 'bg-green-50 text-green-600'
                                                : candidate.status === 'In Review'
                                                    ? 'bg-yellow-50 text-yellow-600'
                                                    : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {candidate.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="text-blue-600 hover:underline">
                                            View more
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default RecruiterDashboard;
