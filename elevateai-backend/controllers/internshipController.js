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

    async postInternship(req, res) {
        try {
            const {
                jobTitle,
                jobDescription,
                requiredSkills,
                experienceLevel,
                jobType,
                location,
                salaryRange,
                workLocation,
                benefits,
                recruiter,
                companyName

            } = req.body;

            const stipend = `$${salaryRange.min}-${salaryRange.max}`;
            console.log(req.body)

            const newInternship = new Internship({
                title: jobTitle,
                company: companyName, // Assuming jobDescription is used as company name
                active: true,
                category: requiredSkills, // Only adding one category as a string
                link: "No link", // Default value as per the model
                location: workLocation || "Online",
                posted_time: new Date().toISOString(),
                source: "manual",
                stipend,
                recruiter
            });

            await newInternship.save();

            res.status(201).json({ message: 'Internship posted successfully', internship: newInternship });
        } catch (error) {
            console.error('Error posting internship:', error);
            res.status(500).json({ message: 'Server error posting internship' });
        }
    }
            
   
}

module.exports = new InternshipController();