const mongoose = require("mongoose");

const MentorshipSessionSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    sessionType: { type: String, enum: ['One-on-One', 'Group Session', 'Workshop'], required: true },
    recurrence: { type: String, enum: ['None','Daily', 'Weekly', 'Monthly'], required: true },
    description: { type: String, default: '' },
    maxParticipants: { type: Number, default: 1 },
    registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("MentorshipSession", MentorshipSessionSchema);