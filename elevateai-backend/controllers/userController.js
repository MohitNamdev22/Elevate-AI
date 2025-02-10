const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

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
        console.log(error.message)
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
}

module.exports = new UserController();