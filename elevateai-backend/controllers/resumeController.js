const Resume = require('../models/resumeModel');
const { generateSummary } = require('../utils/aiUtils');

class ResumeController {
    async createResume(req, res) {
        try {
            const resume = await Resume.create({
                ...req.body,
                userId: req.body.userId // Ensure userId is included in creation
            });
            res.status(201).json(resume);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    async getResumes(req, res) {
        try {
            const { userId } = req.query; // Get userId from query parameters
            if (!userId) {
                return res.status(400).json({ error: 'userId is required' });
            }
            const resumes = await Resume.find({ userId });
            res.json(resumes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateResume(req, res) {
        try {
            const resume = await Resume.findOneAndUpdate(
                { _id: req.params.id, userId: req.body.userId }, // Only update if userId matches
                req.body,
                { new: true, runValidators: true }
            );
            if (!resume) {
                return res.status(404).json({ error: 'Resume not found' });
            }
            res.json(resume);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async generateAISummary(req, res) {
        try {
            const { jobTitle, experience, skills } = req.body;
            const summary = await generateSummary(jobTitle, experience, skills);
            res.json({ summaries: summary });
        } catch (error) {
            res.status(500).json({ error: 'AI Summary generation failed' });
        }
    }
}

module.exports = new ResumeController();