const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// Route to get all internships
router.get('/', internshipController.getAllInternships);
router.get('/categories', internshipController.getAllCategories);
router.get('/category/:category', internshipController.getInternshipsByCategory);

module.exports = router;