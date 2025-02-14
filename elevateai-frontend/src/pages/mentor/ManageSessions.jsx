import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

const ManageSessions = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    sessionType: 'one-on-one',
    recurrence: 'none'
  });
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleCreateSlot = () => {
    if (editingIndex === -1) {
      setSlots([...slots, newSlot]);
    } else {
      const updatedSlots = [...slots];
      updatedSlots[editingIndex] = newSlot;
      setSlots(updatedSlots);
      setEditingIndex(-1);
    }
    setShowForm(false);
    setNewSlot({
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      sessionType: 'one-on-one',
      recurrence: 'none'
    });
  };

  return (
    <div className="flex bg-[#F8FAFC]">
      <Sidebar />
      <div className="mt-16 p-8 w-full min-h-screen">
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
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <DatePicker
                  selected={newSlot.date}
                  onChange={(date) => setNewSlot({ ...newSlot, date })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <DatePicker
                    selected={newSlot.startTime}
                    onChange={(time) => setNewSlot({ ...newSlot, startTime: time })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <DatePicker
                    selected={newSlot.endTime}
                    onChange={(time) => setNewSlot({ ...newSlot, endTime: time })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type
                </label>
                <select
                  value={newSlot.sessionType}
                  onChange={(e) => setNewSlot({ ...newSlot, sessionType: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="one-on-one">One-on-One</option>
                  <option value="group">Group Session</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recurrence
                </label>
                <select
                  value={newSlot.recurrence}
                  onChange={(e) => setNewSlot({ ...newSlot, recurrence: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="none">No Recurrence</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSlot}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
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
            {slots.map((slot, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {slot.date.toLocaleDateString()} |{' '}
                      {slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </h4>
                    <p className="text-gray-600 text-sm capitalize">
                      {slot.sessionType} • {slot.recurrence !== 'none' && `Repeats ${slot.recurrence}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNewSlot(slot);
                      setEditingIndex(index);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setSlots(slots.filter((_, i) => i !== index))}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
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