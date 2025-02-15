const Internship = require('../models/internshipModel');

class InternshipController {
    async getAllInternships(req, res) {
        try {
            const internships = await Internship.find();
            res.status(200).json(internships);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCategories(req, res) {
        try {
            const categories = await Internship.distinct('category');
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getInternshipsByCategory(req, res) {
        const { category } = req.params;
        try {
            const internships = await Internship.find({ category });
            res.status(200).json(internships);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new InternshipController();