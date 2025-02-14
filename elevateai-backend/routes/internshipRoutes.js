const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// Route to get all internships
router.get('/', internshipController.getAllInternships);

module.exports = router;