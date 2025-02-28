import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {useEffect} from 'react';
import { 
  FaRegCalendarAlt,
  FaPlus,
  FaClock,
  FaTrash,
  FaEdit,
  FaRegSave
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from './Sidebar';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://elevate-ai.onrender.com';





const ManageSessions = () => {
  const [slots, setSlots] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [studentDetails, setStudentDetails] = useState({});


  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/user/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student details for ${studentId}:`, error);
      return null;
    }
  };
  
  const fetchAvailableSlots = async () => {
    try {
      const mentorId = localStorage.getItem('userId');
      if (!mentorId) {
        console.error('Mentor ID not found');
        return;
      }
  
      const response = await axios.post(`${API_BASE_URL}/api/mentors/created-sessions`, {
        mentorId: mentorId
      });
  
      // Fetch student details for all registered students
      const allStudentIds = new Set();
      response.data.forEach(slot => {
        slot.registeredStudents.forEach(studentId => {
          if (studentId) allStudentIds.add(studentId);
        });
      });

      const studentDetailsPromises = Array.from(allStudentIds).map(fetchStudentDetails);
    const studentDetailsResults = await Promise.all(studentDetailsPromises);

    const studentDetailsMap = {};
    Array.from(allStudentIds).forEach((id, index) => {
      if (studentDetailsResults[index]) {
        studentDetailsMap[id] = studentDetailsResults[index];
      }
    });

    setStudentDetails(studentDetailsMap);
    setSlots(response.data);
  } catch (error) {
    console.error('Error fetching available slots:', error);
  }
};

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  

  const [newSlot, setNewSlot] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    sessionType: 'One-on-One',
    recurrence: 'none',
    description: '',
    maxParticipants: 4
  });

  const formatSlotDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };
  
  const [description, setDescription] = useState('');

  const handleCreateSlot = async () => {
    try {
      
      const mentorId = localStorage.getItem('userId'); // Get mentorId from localStorage
      
      // Format the date and time
      const formattedDate = newSlot.date.toISOString().split('T')[0];
      const formattedStartTime = newSlot.startTime.toLocaleTimeString([], { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      const formattedEndTime = newSlot.endTime.toLocaleTimeString([], { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
  
      const sessionData = {
        mentorId,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        sessionType: newSlot.sessionType,
        recurrence: newSlot.recurrence,
        description: newSlot.description,
        maxParticipants: newSlot.maxParticipants
      };
  
      const response = await axios.post(`${API_BASE_URL}/api/mentors/sessions`, sessionData);
  
      if (response.data) {
        // Update local state with new slot
        fetchAvailableSlots();
  
  setSuccessMessage('Session created successfully!');
        if (editingIndex === -1) {
          setSlots([...slots, response.data]);
        } else {
          const updatedSlots = [...slots];
          updatedSlots[editingIndex] = response.data;
          setSlots(updatedSlots);
          setEditingIndex(-1);
        }
  
        // Reset form
        setShowForm(false);
        setNewSlot({
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          sessionType: 'One-on-One',
          recurrence: 'none',
          description: '',
          maxParticipants: 4
        });
        
        // Show success message (you'll need to add this state and UI element)
        alert('Session created successfully!');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    }
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        Alumni Mentorship 
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Manage Availability</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Create New Slot
          </motion.button>
        </div>

        {/* Create Slot Form */}
        {showForm && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8"
  >
    <h2 className="text-xl font-semibold mb-6">Create New Availability Slot</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <DatePicker
            selected={newSlot.date}
            onChange={(date) => setNewSlot({ ...newSlot, date })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            minDate={new Date()}
            placeholderText="Select date"
          />
          <FaRegCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
        </div>
      </div>

      {/* Time Pickers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={newSlot.startTime}
            onChange={(time) => setNewSlot({ ...newSlot, startTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={newSlot.endTime}
            onChange={(time) => setNewSlot({ ...newSlot, endTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Session Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Session Type <span className="text-red-500">*</span>
        </label>
        <select
          value={newSlot.sessionType}
          onChange={(e) => setNewSlot({ ...newSlot, sessionType: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="One-on-One">One-on-One</option>
          <option value="Group Session">Group Session</option>
          <option value="Workshop">Workshop</option>
        </select>
      </div>

      {/* Recurrence */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Recurrence
        </label>
        <select
          value={newSlot.recurrence}
          onChange={(e) => setNewSlot({ ...newSlot, recurrence: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="None">No Recurrence</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Description */}
      <div className="col-span-2 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={newSlot.description}
          onChange={(e) => setNewSlot({ ...newSlot, description: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Enter session description..."
        />
      </div>

      {/* Max Participants */}
      {newSlot.sessionType !== 'One-on-One' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Participants
          </label>
          <input
            type="number"
            value={newSlot.maxParticipants}
            onChange={(e) => setNewSlot({ ...newSlot, maxParticipants: parseInt(e.target.value) })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="2"
            max="20"
          />
        </div>
      )}
    </div>

    {/* Buttons */}
    <div className="mt-8 flex justify-end gap-4">
      <button
        onClick={() => setShowForm(false)}
        className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        onClick={handleCreateSlot}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
      >
        <FaRegSave /> {editingIndex === -1 ? 'Create Slot' : 'Update Slot'}
      </button>
    </div>
  </motion.div>
)}

        {/* Existing Slots */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-semibold text-lg mb-6">Available Time Slots</h3>
  <div className="space-y-4">
  {slots.map((slot) => (
  <motion.div
    key={slot._id}
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
  >
    <div className="flex-1">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <FaClock className="text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium">
            {new Date(slot.date).toLocaleDateString()} |{' '}
            {slot.startTime} - {slot.endTime}
          </h4>
          <p className="text-gray-600 text-sm">
            {slot.sessionType} • {slot.recurrence !== 'None' && `Repeats ${slot.recurrence}`}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {slot.description}
          </p>
        </div>
      </div>

      {/* Registered Students Section */}
      {slot.registeredStudents.length > 0 && (
        <div className="mt-4 ml-14">
          <h5 className="text-sm font-medium text-gray-700 mb-2">
            Registered Students ({slot.registeredStudents.length}/{slot.maxParticipants})
          </h5>
          <div className="space-y-2">
            {slot.registeredStudents.map((studentId, index) => {
              const student = studentDetails[studentId];
              return student ? (
                <div key={index} className="flex items-center gap-3 bg-white p-2 rounded-lg">
                  {student.profileImage ? (
                    <img
                      src={student.profileImage}
                      alt={student.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {student.fullName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{student.fullName}</p>
                    <p className="text-xs text-gray-500">{student.email}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>

    {/* Existing action buttons */}
    <div className="flex gap-2 ml-4">
      <button
        onClick={() => {/* ...existing edit handler... */}}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <FaEdit size={18} />
      </button>
      <button
        onClick={() => handleDeleteSlot(slot._id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <FaTrash size={18} />
      </button>
    </div>
  </motion.div>
))}
    {slots.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        No availability slots created yet
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default ManageSessions;