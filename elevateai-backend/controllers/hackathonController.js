const Hackathon = require('../models/hackathonModel');

class HackathonController {
    async getAllHackathons(req, res) {
        try {
            const internships = await Hackathon.find();
            res.status(200).json(internships);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new HackathonController();