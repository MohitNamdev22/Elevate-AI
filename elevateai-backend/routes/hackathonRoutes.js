const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController')

// Route to get all internships
router.get('/', hackathonController.getAllHackathons);

module.exports = router;