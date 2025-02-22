const express = require('express');
const router = express.Router();
const {createResume, 
    getResumes, 
    updateResume,
    generateAISummary } = require('../controllers/resumeController');

router.post('/', createResume);
router.get('/', getResumes);
router.put('/:id', updateResume);
router.post('/generate-summary', generateAISummary);

module.exports = router;
