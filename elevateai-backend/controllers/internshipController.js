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
        
    async getAllJobs(req, res) {
        const { userId } = req.query;
    
        try {
            const internships = await Internship.find({ recruiter: { $exists: true, $ne: null } }).populate('recruiter', 'fullName email');
    
            const internshipsWithRegistrationStatus = internships.map(internship => ({
                ...internship.toObject(),
                isRegistered: internship.applicants.includes(userId),
                jobPosterName: internship.recruiter ? internship.recruiter.fullName : 'N/A'
            }));
    
            res.status(200).json(internshipsWithRegistrationStatus);
        } catch (error) {
            console.error('Error fetching internships:', error);
            res.status(500).json({ message: 'Server error fetching internships' });
        }
    }

   

    async applyForJob(req, res) {
        const { userId, jobId } = req.body;

        try {
            const internship = await Internship.findById(jobId);
            if (!internship) {
                return res.status(404).json({ message: 'Job not found' });
            }

            // Check if the user has already applied
            if (internship.applicants.includes(userId)) {
                return res.status(400).json({ message: 'User has already applied for this job' });
            }

            internship.applicants.push(userId);
            await internship.save();

            res.status(200).json({ message: 'Applied successfully', internship });
        } catch (error) {
            console.error('Error applying for job:', error);
            res.status(500).json({ message: 'Server error applying for job' });
        }
    }

    async getJobsByRecruiter(req, res) {
        const { recruiterId } = req.params;

        try {
            const internships = await Internship.find({ recruiter: recruiterId }).populate('recruiter', 'fullName email');

            res.status(200).json(internships);
        } catch (error) {
            console.error('Error fetching internships by recruiter:', error);
            res.status(500).json({ message: 'Server error fetching internships by recruiter' });
        }
    }
    async getApplicantsByJob(req, res) {
        const { jobId } = req.params;

        try {
            const internship = await Internship.findById(jobId).populate('applicants', 'fullName email studentDetails');
            if (!internship) {
                return res.status(404).json({ message: 'Job not found' });
            }

            res.status(200).json(internship.applicants);
        } catch (error) {
            console.error('Error fetching applicants:', error);
            res.status(500).json({ message: 'Server error fetching applicants' });
        }
    }

    async getApplicantsByRecruiter(req, res) {
        console.log("I am here")
        const { recruiterId } = req.params;
        console.log(recruiterId)
        try {
            const internships = await Internship.find({ recruiter: recruiterId }).populate('applicants', 'fullName email studentDetails');
            if (!internships.length) {
                return res.status(404).json({ message: 'No jobs found for this recruiter' });
            }

            const applicantsByJob = internships.map(internship => ({
                jobTitle: internship.title,
                jobId: internship._id,
                applicants: internship.applicants
            }));

            res.status(200).json(applicantsByJob);
        } catch (error) {
            console.error('Error fetching applicants by recruiter:', error);
            res.status(500).json({ message: 'Server error fetching applicants by recruiter' });
        }
    }
}

module.exports = new InternshipController();