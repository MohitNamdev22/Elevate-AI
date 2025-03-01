const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const GitHubAPI = require('../utils/githubApi');
const leetCodeApi = require('../utils/leetCodeApi');
const { getTopCategoriesAndJobs } = require('../utils/recommendation');

class UserController {
 
  async addUser(req, res) {
    try {
      const { 
        fullName, 
        email,  
        role,
        phoneNumber,
        location,
        profileImage,
        studentDetails,
        recruiterDetails,
        mentorDetails
      } = req.body;

      console.log(req.body);

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }


      // Create new user
      const newUser = new User({
        fullName,
        email,
        role,
        phoneNumber,
        location,
        profileImage,
        studentDetails: role === 'Student' ? {
          skills: studentDetails.skills.split(','),
          collegeName: studentDetails.university,
          yearOfStudy: studentDetails.yearOfStudy,
          certificates: studentDetails.certificates.split(','),
          achievements: studentDetails.achievements,
          experience: studentDetails.experience.map(exp => ({
            company: exp.company,
            title: exp.title,
            description: exp.description,
            duration: exp.duration
          })),
          socialProfiles: {
            github: studentDetails.githubUrl,
            leetcode: studentDetails.leetcodeUrl,
            codeforces: studentDetails.codeforcesUrl
          }
        } : undefined,
        recruiterDetails: role === 'Recruiter' ? {
          companyName: recruiterDetails.companyName,
          companyWebsite: recruiterDetails.companyWebsite,
          industryFocus: recruiterDetails.industryFocus.split(','),
          jobTitle: recruiterDetails.jobTitle,
          linkedinUrl: recruiterDetails.linkedinUrl,
          twitterUrl: recruiterDetails.twitterUrl,
          professionalSummary: recruiterDetails.professionalSummary,
          workModel: recruiterDetails.workModel,
          yearsOfExperience: recruiterDetails.yearsOfExperience,
          githubUrl: recruiterDetails.githubUrl
        } : undefined,
        mentorDetails: role === 'Mentor' ? {
          aboutMe: mentorDetails.aboutMe,
          availableSlots: mentorDetails.availableSlots,
          degree: mentorDetails.degree,
          experienceLevel: mentorDetails.experienceLevel,
          hourlyRate: mentorDetails.hourlyRate,
          jobTitle: mentorDetails.jobTitle,
          linkedinUrl: mentorDetails.linkedinUrl,
          organization: mentorDetails.organization,
          responseTime: mentorDetails.responseTime,
          technicalSkills: mentorDetails.technicalSkills.split(','),
          university: mentorDetails.university,
          year: mentorDetails.year,
          professionalLinks: {
            linkedin: mentorDetails.linkedinUrl,
            github: mentorDetails.githubUrl,
            personalWebsite: mentorDetails.personalWebsite
          }
        } : undefined
      });

      // Save user
      await newUser.save();

      res.status(201).json({ 
        message: 'User registered successfully', 
        userId: newUser._id 
      });

    } catch (error) {
      console.error('User registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error fetching user' });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error updating user' });
    }
  }

  async getGitHubDetails(req, res) {
    try {
      const user = await User.findById(req.params.id).select('studentDetails.githubUrl');
      if (!user || !user.studentDetails || !user.studentDetails.githubUrl) {
        return res.status(404).json({ message: 'GitHub URL not found for this user' });
      }

      const githubUrl = user.studentDetails.githubUrl;
      const username = githubUrl.split('/').pop();

      const userInfo = await GitHubAPI.getUserInfo(username);
      const userRepos = await GitHubAPI.listUserRepos(username);

      res.status(200).json({ userInfo, userRepos });
    } catch (error) {
      console.error('Error fetching GitHub details:', error);
      res.status(500).json({ message: 'Server error fetching GitHub details' });
    }
  }

  async getRepoCommits(req, res) {
    try {
      const { owner, repo } = req.params;
      const totalCommits = await GitHubAPI.getTotalCommits(owner, repo);
      const commitsLast7Days = await GitHubAPI.getCommitsLast7Days(owner, repo);

      res.status(200).json({ totalCommits, commitsLast7Days });
    } catch (error) {
      console.error('Error fetching repository commits:', error);
      res.status(500).json({ message: 'Server error fetching repository commits' });
    }
  }

  async getTotalCommitsForUser(req, res) {
    try {
      const user = await User.findById(req.params.id).select('studentDetails.socialProfiles.github');
      if (!user || !user.studentDetails || !user.studentDetails.socialProfiles.github) {
        return res.status(404).json({ message: 'GitHub URL not found for this user' });
      }

      const username = user.studentDetails.socialProfiles.github;

      const totalCommits = await GitHubAPI.getTotalCommitsForUser(username);

      res.status(200).json({ totalCommits });
    } catch (error) {
      console.error('Error fetching total commits for user:', error);
      res.status(500).json({ message: 'Server error fetching total commits for user' });
    }
  }

  async getCommitsLast7DaysForUser(req, res) {
    try {
      const user = await User.findById(req.params.id).select('studentDetails.socialProfiles.github');
      if (!user || !user.studentDetails || !user.studentDetails.socialProfiles.github) {
        return res.status(404).json({ message: 'GitHub URL not found for this user' });
      }

      const username = user.studentDetails.socialProfiles.github;

      const commitsLast7Days = await GitHubAPI.getCommitsLast7DaysForUser(username);

      res.status(200).json({ commitsLast7Days });
    } catch (error) {
      console.error('Error fetching commits in the last 7 days for user:', error);
      res.status(500).json({ message: 'Server error fetching commits in the last 7 days for user' });
    }
  }

  async getLeetCodeStats(req, res) {
    try {
      const user = await User.findById(req.params.id).select('studentDetails.socialProfiles.leetcode');
      if (!user || !user.studentDetails || !user.studentDetails.socialProfiles.leetcode) {
        return res.status(404).json({ message: 'LeetCode username not found for this user' });
      }

      const username = user.studentDetails.socialProfiles.leetcode;

      const leetCodeStats = await leetCodeApi.getUserStats(username);

      res.status(200).json(leetCodeStats);
    } catch (error) {
      console.error('Error fetching LeetCode stats:', error);
      res.status(500).json({ message: 'Server error fetching LeetCode stats' });
    }
  }


  async getTopCategories(req, res) {
    try {
      const { studentId, categories } = req.body;

      // Fetch student details using student ID
      const student = await User.findById(studentId).select('studentDetails');
      console.log('student info',student);
      if (!student || !student.studentDetails) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const studentProfile = student.studentDetails;


      // Get top categories based on the student's profile
      const topCategories = await getTopCategories(studentProfile, categories);
      console.log(topCategories);

      res.status(200).json({ topCategories });
    } catch (error) {
      console.error('Error fetching top categories:', error);
      res.status(500).json({ message: 'Server error fetching top categories' });
    }
  }

  async getTopCategoriesAndJobs(req, res) {
    try {
      const { studentId } = req.body;
      let categories = ["3d-printing", "net-development","web-development","backend-development","graphic-design","machine-learning"]
      console.log(categories)
      // Fetch student details using student ID
      const student = await User.findById(studentId).select('studentDetails');
      if (!student || !student.studentDetails) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const studentProfile = student.studentDetails;

      // Get top categories and jobs based on the student's profile
      const { topCategories, topJobs } = await getTopCategoriesAndJobs(studentProfile, categories);

      res.status(200).json({ topCategories, topJobs });
    } catch (error) {
      console.error('Error fetching top categories and jobs:', error);
      res.status(500).json({ message: 'Server error fetching top categories and jobs' });
    }
  }


  async getUserRegisteredOrNot(req, res) {
    try {
        const { email } = req.params;

        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ userId: user._id });
        } else {
            return res.status(200).json({ userId: null });
        }
    } catch (err) {
        console.error("Error checking user registration:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

}

module.exports = new UserController();