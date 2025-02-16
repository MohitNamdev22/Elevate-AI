const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// Route to get all internships
//router.get('/', internshipController.getAllInternships);
router.get('/categories', internshipController.getAllCategories);
router.get('/category/:category', internshipController.getInternshipsByCategory);
router.post('/post-job', internshipController.postInternship);
router.get('/', internshipController.getAllJobs);
router.post('/apply', internshipController.applyForJob);
router.get('/recruiter/:recruiterId', internshipController.getJobsByRecruiter);
router.get('/:jobId/applicants', internshipController.getApplicantsByJob);

// Route to get applicants for all jobs posted by a specific recruiter
router.get('/:recruiterId/applicants', internshipController.getApplicantsByRecruiter);

module.exports = router;