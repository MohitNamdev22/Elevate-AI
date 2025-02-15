const MentorshipSession = require('../models/mentorshipSessionModel');

class MentorController {
    async createSession(req, res) {
        console.log("I am here");
        console.log("Request Body:", req.body);
        try {
            const session = new MentorshipSession({
                mentorId: req.body.mentorId,
                ...req.body
            });
            console.log(session)
            await session.save();
            res.status(201).json(session);
        } catch (error) {
            console.error("Error creating session:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async getSessions(req, res) {
        try {
            const sessions = await MentorshipSession.find({ mentorId: req.body.mentorId });
            res.status(200).json(sessions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async registerForSession(req, res) {
        try {
            const session = await MentorshipSession.findById(req.params.sessionId);
            if (!session) {
                return res.status(404).json({ message: 'Session not found' });
            }
            if (session.registeredStudents.length >= session.maxParticipants) {
                return res.status(400).json({ message: 'Session is full' });
            }
            session.registeredStudents.push(req.body.userId);
            await session.save();
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAvailableSessions(req, res) {
        const { userId } = req.query;
        try {
            const sessions = await MentorshipSession.find({
                $expr: { $lt: [{ $size: "$registeredStudents" }, "$maxParticipants"] }
            }).populate({
                path: 'mentorId',
                select: 'fullName email mentorDetails.jobTitle mentorDetails.university mentorDetails.linkedinUrl mentorDetails.githubUrl'
            });

            const sessionsWithRegistrationStatus = sessions.map(session => ({
                ...session.toObject(),
                isRegistered: session.registeredStudents.includes(userId)
            }));

            res.status(200).json(sessionsWithRegistrationStatus);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MentorController();