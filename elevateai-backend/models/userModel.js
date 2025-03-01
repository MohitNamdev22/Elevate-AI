const { default: mongoose } = require("mongoose");



const userSchema = new mongoose.Schema({
    fullName: { type: String, },
    email: { type: String, required:true, unique: true },
    role: { 
      type: String, 
       
      enum: ['Student', 'Recruiter', 'Mentor'] 
    },
    

    phoneNumber: String,
    location: String,
    profileImage: String,

    
    studentDetails: {
      skills: [String],
      collegeName: String,
      yearOfStudy: String,
      certificates: [String],
      achievements: String,
      experience: [
        {
          company: String,
          title: String,
          description: String,
          duration: String
        }
      ],
      socialProfiles: {
        github: String,
        leetcode: String
      }
    },
    
    recruiterDetails: {
      companyName: String,
      companyWebsite: String,
      industryFocus: [String],
      jobTitle: String,
      linkedinUrl: String,
      twitterUrl: String,
      professionalSummary: String,
      workModel: String,
      yearsOfExperience: String,
      githubUrl: String
    },
    
    mentorDetails: {
      aboutMe: String,
      availableSlots: String,
      degree: String,
      experienceLevel: String,
      hourlyRate: String,
      jobTitle: String,
      linkedinUrl: String,
      organization: String,
      responseTime: String,
      technicalSkills: [String],
      university: String,
      year: String,
      professionalLinks: {
        linkedin: String,
        github: String,
        personalWebsite: String
      }
    }
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;