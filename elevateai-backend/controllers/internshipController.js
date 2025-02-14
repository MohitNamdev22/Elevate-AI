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
}

module.exports = new InternshipController();