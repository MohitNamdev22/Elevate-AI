const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

// Route to create a mentorship session
router.post('/sessions', mentorController.createSession);

// Route to get all sessions of a mentor
router.post('/created-sessions', mentorController.getSessions);

// Route for students to register for a session
router.post('/sessions/:sessionId/register', mentorController.registerForSession);


// Route to get available sessions for a student
router.get('/available-sessions', mentorController.getAvailableSessions);

module.exports = router;