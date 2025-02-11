import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/LogIn'
import Signup from './pages/Signup'
import StudentDashboard from './pages/student/StudentDashboard'
import './App.css'
import Roadmap from './pages/student/Roadmap'
import Opportunities from './pages/student/Oppotunities'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/roadmaps" element={<Roadmap />} />
        <Route path="/student/opportunities" element={<Opportunities />} />
      </Routes>
    </Router>
  )
}

export default App