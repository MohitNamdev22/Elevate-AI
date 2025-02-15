const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const GitHubAPI = require('../utils/githubApi');
const leetCodeApi = require('../utils/leetCodeApi');

class UserController {
  async addUser(req, res) {
    try {
      const { 
        fullName, 
        email, 
        password, 
        role,
        phoneNumber,
        location,
        profileImage,
        studentDetails,
        recruiterDetails,
        mentorDetails
      } = req.body;

      console.log(role, recruiterDetails);

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        location,
        profileImage,
        studentDetails: role === 'Student' ? studentDetails : undefined,
        recruiterDetails: role === 'Recruiter' ? recruiterDetails : undefined,
        mentorDetails: role === 'Mentor' ? mentorDetails : undefined
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
}

module.exports = new UserController();