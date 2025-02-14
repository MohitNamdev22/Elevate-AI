import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlus,
  FaEllipsisH
} from 'react-icons/fa';

const RecruiterCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Technical Interview - John Doe",
      type: "interview",
      date: "2024-02-15",
      time: "10:00 AM - 11:00 AM",
      color: "bg-blue-100 text-blue-600"
    },
    // ... other sample events
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'interview',
    date: '',
    time: '',
    color: 'bg-blue-100 text-blue-600'
  });

  const [filters, setFilters] = useState({
    interviews: true,
    deadlines: true,
    followUps: true,
    reminders: true
  });

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Previous month days
    for (let i = firstDay.getDay() - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date.getDate(),
        month: 'prev',
        fullDate: date.toISOString().split('T')[0]
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date: i,
        month: 'current',
        fullDate: date.toISOString().split('T')[0]
      });
    }

    // Next month days
    const nextMonthDays = 42 - days.length; // Ensure 6 weeks
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date: i,
        month: 'next',
        fullDate: date.toISOString().split('T')[0]
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, {
        ...newEvent,
        id: events.length + 1,
        date: newEvent.date
      }]);
      setShowEventModal(false);
      setNewEvent({
        title: '',
        type: 'interview',
        date: '',
        time: '',
        color: 'bg-blue-100 text-blue-600'
      });
    }
  };

  const filteredEvents = events.filter(event => {
    if (event.type === 'interview' && !filters.interviews) return false;
    if (event.type === 'deadline' && !filters.deadlines) return false;
    if (event.type === 'follow-up' && !filters.followUps) return false;
    if (event.type === 'reminder' && !filters.reminders) return false;
    return true;
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Recruiter Calendar</h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg">
              <button className="px-4 py-2 text-sm text-blue-600 bg-white rounded-lg shadow-sm">Week</button>
              <button className="px-4 py-2 text-sm text-gray-600">Month</button>
              <button className="px-4 py-2 text-sm text-gray-600">Agenda</button>
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              onClick={() => setShowEventModal(true)}
            >
              <FaPlus /> Add Event
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Calendar Grid */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={handlePrevMonth}
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={handleNextMonth}
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-sm text-gray-600 text-center bg-white">
                  {day}
                </div>
              ))}

              {getDaysInMonth().map((day, index) => (
                <div 
                  key={index}
                  className={`min-h-24 p-2 bg-white ${
                    day.month !== 'current' ? 'text-gray-400' : ''
                  }`}
                >
                  <span className="text-sm">{day.date}</span>
                  {filteredEvents.map(event => (
                    event.date === day.fullDate && (
                      <div 
                        key={event.id}
                        className={`mt-1 p-1 text-xs rounded ${event.color} truncate`}
                      >
                        {event.title}
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Event Modal */}
          {showEventModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    className="w-full p-2 border rounded"
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={newEvent.type}
                    onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    <option value="interview">Interview</option>
                    <option value="deadline">Deadline</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="reminder">Reminder</option>
                  </select>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                  />
                  <input
                    type="time"
                    className="w-full p-2 border rounded"
                    value={newEvent.time}
                    onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 py-2 bg-blue-600 text-white rounded"
                      onClick={handleAddEvent}
                    >
                      Add Event
                    </button>
                    <button 
                      className="flex-1 py-2 bg-gray-200 rounded"
                      onClick={() => setShowEventModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="w-80">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <button><FaEllipsisH className="text-gray-400" /></button>
              </div>
              <div className="space-y-2">
                {Object.keys(filters).map(filter => (
                  <label key={filter} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                      checked={filters[filter]}
                      onChange={e => setFilters({
                        ...filters,
                        [filter]: e.target.checked
                      })}
                    />
                    <span className="text-sm capitalize">{filter.replace('followUps', 'Follow-ups')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Today's Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">Today's Highlights</h3>
              <div className="space-y-3">
                {filteredEvents.filter(event => 
                  event.date === new Date().toISOString().split('T')[0]
                ).map(event => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className={`w-1 h-1 rounded-full mt-2 ${event.color.replace('100', '500')}`} />
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                    <button className="ml-auto"><FaEllipsisH className="text-gray-400" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCalendar;