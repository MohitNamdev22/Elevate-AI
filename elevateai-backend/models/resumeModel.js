const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: String,
    companyName: String,
    city: String,
    state: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    workSummary: String
});

const educationSchema = new mongoose.Schema({
    universityName: String,
    startDate: String,
    endDate: String,
    degree: String,
    major: String,
    description: String
});

const skillSchema = new mongoose.Schema({
    name: String,
    rating: Number
});

const resumeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true  // Made userId required
    },
    title: { 
        type: String, 
        required: true 
    },
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    summary: String,
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema]
}, {
    timestamps: true
});

// Add an index for faster queries by userId
resumeSchema.index({ userId: 1 });

module.exports = mongoose.model('Resume', resumeSchema);