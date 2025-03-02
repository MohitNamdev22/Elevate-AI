# ElevateAI

🚀 **Live Demo:** [ElevateAI on Vercel](https://elevate-ai-xi.vercel.app/)

ElevateAI brings together three key stakeholders—students, recruiters, and mentors—on a single AI-powered platform designed to enhance learning, hiring, and mentorship.

## For Students  
- **Interactive Dashboard** – A user-friendly interface for tracking progress and opportunities.  
- **AI-powered Job Recommendations** – Smart job suggestions based on skills and interests.  
- **Seamless Integration with Coding Platforms** – Connects with GitHub, LeetCode, and more.  
- **Personalized Skill Development Roadmaps** – AI-generated learning paths for career growth.  
- **AI-powered Mock Interviews with Proctoring** – Simulated interview experiences for better preparation.  
- **ATS-friendly Resume Builder** – Creates optimized resumes that pass Applicant Tracking Systems (ATS).  
- **Resume-Job Matcher & Chat with Resume** – Matches resumes with jobs, provides instant insights, and allows users to chat with their resume to identify skill gaps and receive improvement suggestions.  
- **Easy Mentor Booking** – Streamlined access to industry mentors for guidance.  
- **Easy Job Apply** – Seamless one-click job application process.

## For Recruiters  
- **Interactive Dashboard** – A centralized view of job postings, applications, and analytics.  
- **Seamless Job Posting** – Effortlessly create and manage job listings.  
- **Organizing Hiring Challenges** – Create hackathons and hiring challenges to identify and recruit top talent.
- **Centralized Calendar** – Integrated with all the upcoming events, meetings, interviews, calls.
- **AI-powered Candidate Ranking** – Identifies and ranks the best-suited candidates.  

## For Mentors  
- **Interactive Dashboard** – A comprehensive interface to manage mentorship sessions.  
- **Easy Session Management** – Hassle-free scheduling and mentorship tracking.  

## Tech Stack

- **Frontend:** React.js, TailwindCSS, Axios  
- **Backend:** Express.js, PostgreSQL, MongoDB, NeonDB, DrizzleORM  
- **AI & ML:** TensorFlow.js, Gemini, LangChain, Face-api.js  
- **Authentication:** Clerk  

## Getting Started  

Follow these steps to set up ElevateAI on your local machine.  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js (>= 16.x.x)**  
- **npm or yarn**  
- **PostgreSQL & MongoDB** (for database operations)  

### Installation  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/MohitNamdev22/Elevate-AI.git
   cd ElevateAI
   ```  

2. **Set up the frontend:**  
   ```sh
   cd elevateai-frontend
   npm install
   ```  

3. **Set up the backend:**  
   ```sh
   cd elevateai-backend
   npm install
   ```  

4. **Set up the AI mock interview service:**  
   ```sh
   cd ai_mock_interview
   npm install
   ```  

5. **Configure environment variables:**  
   - Create a `.env` file in each service directory (`elevateai-frontend`, `elevateai-backend`, `ai_mock_interview`).  
   - Add the required environment variables (e.g., API keys, database URLs, authentication credentials).  

6. **Start the development servers:**  
   - **Frontend:**  
     ```sh
     cd elevateai-frontend
     npm run dev
     ```  
   - **Backend:**  
     ```sh
     cd elevateai-backend
     npm run dev
     ```  
   - **AI Mock Interview Service:**  
     ```sh
     cd ai_mock_interview
     npm run dev
     ```  

Your ElevateAI platform should now be running! 🚀  

## What's Next  

ElevateAI is evolving! Here are the upcoming features:

- **AI-powered Soft Skills Assessment** – Evaluating communication, leadership, and problem-solving skills using NLP and sentiment analysis.
- **AI-powered Coding Platform** – Integrating Monaco Editor and AI-driven coding tests.
- **Gamified Learning Experience** – Introducing skill challenges, leaderboards, and AI-powered learning plans.
- **Mobile App Development** – Bringing ElevateAI to mobile platforms.
- **Integration with More Platforms** – Expanding support for LinkedIn, Coursera, and Kaggle.

## License  

This project is licensed under the [MIT License](LICENSE).
