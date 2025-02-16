import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCalendar, FaChartPie, FaCheck, FaClock } from 'react-icons/fa';
import Sidebar from './Sidebar';

// ---------------- React Flow Imports ----------------
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
// -----------------------------------------------------

/**
 * Truncates text to a specified length and appends "..."
 */
function shortenText(str, maxLength = 60) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * parseMilestones:
 * Extract everything between "MILESTONES:" and "KEY SKILLS TO ACQUIRE:".
 * Then parse lines for Month X, Weeks, Resources, Projects, etc.
 */
function parseMilestones(fullText) {
  const milestonesRegex = /MILESTONES:\s*([\s\S]*?)(?=KEY SKILLS TO ACQUIRE:)/i;
  const match = milestonesRegex.exec(fullText);
  if (!match) return [];

  const milestoneSection = match[1].trim();
  const lines = milestoneSection.split('\n').map((l) => l.trim()).filter(Boolean);

  const monthRegex = /^Month\s+(\d+):\s*(.*)/i;
  const weekRegex = /^\*\*Week\s*(\d+)\:\*\*\s*(.*)/i;
  const resourcesRegex = /^\*\*Resources:\*\*\s*(.*)/i;
  const projectsRegex = /^\*\*Projects:\*\*\s*(.*)/i;

  const months = [];
  let currentMonth = null;
  let currentWeek = null;

  lines.forEach((line) => {
    const monthMatch = line.match(monthRegex);
    if (monthMatch) {
      currentMonth = {
        monthNumber: monthMatch[1],
        monthTitle: monthMatch[2] || '',
        weeks: [],
      };
      months.push(currentMonth);
      currentWeek = null;
      return;
    }

    if (!currentMonth) return;

    const weekMatch = line.match(weekRegex);
    if (weekMatch) {
      currentWeek = {
        weekNumber: weekMatch[1],
        title: weekMatch[2] || '',
        resources: [],
        projects: [],
        lines: [],
      };
      currentMonth.weeks.push(currentWeek);
      return;
    }

    const resourcesMatch = line.match(resourcesRegex);
    if (resourcesMatch && currentWeek) {
      currentWeek.resources.push(resourcesMatch[1]);
      return;
    }

    const projectsMatch = line.match(projectsRegex);
    if (projectsMatch && currentWeek) {
      currentWeek.projects.push(projectsMatch[1]);
      return;
    }

    if (currentWeek) {
      currentWeek.lines.push(line);
    }
  });

  return months;
}

// Color palettes
const MONTH_COLORS = ['#FFEDD5', '#E0F2FE', '#FCE7F3', '#E2FBE6', '#FDF2E9'];
const WEEK_COLORS = ['#FEF9C3', '#E9D5FF', '#CFFAFE', '#FBCFE8', '#FDE68A'];

/**
 * MilestonesFlow:
 * Displays each Month in a column (side by side horizontally)
 * and each Week stacked vertically beneath the Month.
 */
function MilestonesFlow({ months }) {
  // Layout parameters
  const columnSpacing = 300; // distance between months (x)
  const rowSpacing = 140;    // distance between weeks (y)
  const monthY = 0;          // top Y for each month
  const weekOffsetY = 1;     // weeks start at row 1 (below the month node)

  const nodes = [];
  const edges = [];

  months.forEach((month, mIndex) => {
    const monthId = `month-${mIndex}`;
    const bgMonthColor = MONTH_COLORS[mIndex % MONTH_COLORS.length];

    // Create the Month node
    nodes.push({
      id: monthId,
      type: 'default',
      position: { x: mIndex * columnSpacing, y: monthY },
      data: {
        label: (
          <div
            style={{
              backgroundColor: bgMonthColor,
              width: '140px',
              maxHeight: '100px',
              overflowY: 'auto',
              borderRadius: '6px',
              padding: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3 className="font-bold text-blue-600 text-base mb-1">
              Month {month.monthNumber}
            </h3>
            <p className="text-gray-700 text-xs">
              {shortenText(month.monthTitle, 50)}
            </p>
          </div>
        ),
      },
    });

    // Create each Week node below the Month
    month.weeks.forEach((week, wIndex) => {
      const weekId = `month-${mIndex}-week-${wIndex}`;
      const bgWeekColor = WEEK_COLORS[wIndex % WEEK_COLORS.length];

      // Truncate lines, resources, projects
      const truncatedLines = week.lines.map((l) => shortenText(l, 60));
      const truncatedResources = week.resources.map((r) => shortenText(r, 60));
      const truncatedProjects = week.projects.map((p) => shortenText(p, 60));

      nodes.push({
        id: weekId,
        type: 'default',
        position: {
          x: mIndex * columnSpacing,
          y: (wIndex + weekOffsetY) * rowSpacing,
        },
        data: {
          label: (
            <div
              style={{
                backgroundColor: bgWeekColor,
                width: '180px',
                maxHeight: '120px',
                overflowY: 'auto',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h4 className="font-semibold mb-1 text-sm">
                Week {week.weekNumber}: {shortenText(week.title, 40)}
              </h4>

              {truncatedLines.map((l, i) => (
                <p key={i} className="text-xs text-gray-700 mb-1">
                  {l}
                </p>
              ))}

              {truncatedResources.length > 0 && (
                <p className="text-xs text-gray-700 mb-1">
                  <strong>Res:</strong> {truncatedResources.join(', ')}
                </p>
              )}
              {truncatedProjects.length > 0 && (
                <p className="text-xs text-gray-700">
                  <strong>Proj:</strong> {truncatedProjects.join(', ')}
                </p>
              )}
            </div>
          ),
        },
      });

      // Connect Month -> Week
      edges.push({
        id: `edge-${monthId}-${weekId}`,
        source: monthId,
        target: weekId,
        type: 'smoothstep',
      });
    });

    // (Optional) Connect weeks in a chain: Week0 -> Week1 -> ...
    for (let w = 0; w < month.weeks.length - 1; w++) {
      edges.push({
        id: `edge-week-${mIndex}-${w}`,
        source: `month-${mIndex}-week-${w}`,
        target: `month-${mIndex}-week-${w + 1}`,
        type: 'smoothstep',
      });
    }
  });

  // React Flow state
  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, , onEdgesChange] = useEdgesState(edges);
  const onConnect = (params) => addEdge(params, rfEdges);

  return (
    <div style={{ width: '100%', height: 600 }} className="border rounded-lg">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant="lines" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

/**
 * The main Roadmap component:
 * - Renders your form, analytics
 * - Calls the AI API
 * - Parses the text
 * - Displays months in columns and weeks in vertical stacks
 */
const Roadmap = () => {
  const [careerGoal, setCareerGoal] = useState('');
  const [timeframe, setTimeframe] = useState('3');
  const [currentSkills, setCurrentSkills] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapResult, setRoadmapResult] = useState('');

  // Sample analytics
  const progressData = [
    { skill: 'HTML', progress: 90 },
    { skill: 'CSS', progress: 85 },
    { skill: 'JavaScript', progress: 70 },
    { skill: 'React', progress: 65 },
    { skill: 'Node.js', progress: 40 }
  ];

  const stats = [
    { icon: FaChartPie, value: '40%', label: 'Overall Progress' },
    { icon: FaClock, value: '45h', label: 'Time Spent' },
    { icon: FaCheck, value: '12', label: 'Completed Roadmaps' },
    { icon: FaCalendar, value: '8', label: 'Days Remaining' }
  ];

  // Generate roadmap from AI
  const generateRoadmap = async () => {
    if (!careerGoal || !timeframe || !currentSkills) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);

    try {
      const prompt = `
        You are an AI career counselor specialized in creating learning roadmaps.
        Create a detailed learning roadmap based on the following information:

        Career Goal: ${careerGoal}
        Timeframe: ${timeframe} months
        Current Skills: ${currentSkills}

        Provide the roadmap in the following format:

        OVERVIEW:
        (brief summary)

        MILESTONES:
        Month 1: Title
        **Week1:** ...
        **Resources:** ...
        **Projects:** ...

        Month 2: Title
        **Week2:** ...
        **Resources:** ...
        **Projects:** ...

        KEY SKILLS TO ACQUIRE:
        - skill1
        - skill2

        PRACTICE PROJECTS:
        - project1
        - project2

        ADDITIONAL RESOURCES:
        - resource1
        - resource2
      `;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
        }
      );

      const roadmapText = response.data.candidates[0]?.content?.parts[0]?.text || 'No roadmap available';
      setRoadmapResult(roadmapText);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Error generating roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render text minus MILESTONES
  const renderRoadmapResult = (text) => {
    const textWithoutMilestones = text.replace(
      /MILESTONES:\s*([\s\S]*?)(?=KEY SKILLS TO ACQUIRE:)/i,
      'MILESTONES:\n[Displayed in Flow Below]\n\n'
    );
    return textWithoutMilestones.split('\n').map((line, index) => {
      if (/^OVERVIEW:/i.test(line)) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">{line.trim()}</h3>;
      } else if (/^MILESTONES:/i.test(line)) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">{line.trim()}</h3>;
      } else if (/^KEY SKILLS TO ACQUIRE:/i.test(line)) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">{line.trim()}</h3>;
      } else if (/^PRACTICE PROJECTS:/i.test(line)) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">{line.trim()}</h3>;
      } else if (/^ADDITIONAL RESOURCES:/i.test(line)) {
        return <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-blue-600">{line.trim()}</h3>;
      } else if (line.startsWith('-')) {
        return <li key={index} className="ml-6 mb-2 text-gray-600">{line.substring(1).trim()}</li>;
      } else if (line.startsWith('**')) {
        return <p key={index} className="mb-2 text-gray-600">{line.replace(/\*\*/g, '')}</p>;
      } else {
        return <p key={index} className="mb-2 text-gray-600">{line}</p>;
      }
    });
  };

  // Parse milestones for display
  const milestonesData = parseMilestones(roadmapResult);

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 w-full min-h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Your Learning Roadmap</h1>
            <p className="text-gray-500 mt-2">
              Create a personalized learning path to achieve your career goals
            </p>
          </div>
          <div className="w-24">
            <CircularProgressbar
              value={40}
              text="40%"
              styles={buildStyles({
                pathColor: '#3b82f6',
                textColor: '#3b82f6',
                trailColor: '#e5e7eb'
              })}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap Generator Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your career goal?
              </label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g., Become a Full-Stack Developer"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe (in months)
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your current skills?
              </label>
              <textarea
                rows="4"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="List your current technical skills, experience level, etc."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={generateRoadmap}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>

        

        {/* Generated Roadmap Result (minus milestones) */}
        {roadmapResult && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Personalized Learning Roadmap</h2>
            <div className="prose max-w-none">
              {renderRoadmapResult(roadmapResult)}
            </div>
          </div>
        )}

        {/* Milestones Flow (months horizontally, weeks vertically) */}
        {milestonesData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Milestones</h2>
            <MilestonesFlow months={milestonesData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
