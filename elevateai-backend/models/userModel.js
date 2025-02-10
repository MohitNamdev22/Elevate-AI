const { default: mongoose } = require("mongoose");



const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true, 
      enum: ['Student', 'Recruiter', 'Mentor'] 
    },
    

    phoneNumber: String,
    location: String,
    profileImage: String,

    
    studentDetails: {
      areaOfInterest: String,
      socialProfiles: {
        github: String,
        codeforces: String,
        leetcode: String
      }
    },
    
    recruiterDetails: {
      companyName: String,
      industry: String,
      companySize: String,
      companyWebsite: String,
      jobTitle: String,
      referralCode: String
    },
    
    mentorDetails: {
      jobTitle: String,
      organization: String,
      experienceLevel: String,
      weeklyTimeCommitment: String,
      professionalLinks: {
        linkedin: String,
        github: String,
        personalWebsite: String
      }
    }
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;