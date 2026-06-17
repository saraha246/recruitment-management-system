const { Interview, Application, User } = require('../db/models');

// Schedule an interview
const scheduleInterview = async (req, res) => {
    try {
        const { applicationId, round, scheduledAt } = req.body;

        // Check if application exists
        const application = await Application.findByPk(applicationId);
        if (!application) {
            return res.status(404).json({ status: 'error', message: 'Application not found' });
        }

        const interview = await Interview.create({
            applicationId,
            round,
            scheduledAt,
            status: 'scheduled'
        });

        // Update application status to interview
        await application.update({ status: 'interview' });

        res.status(201).json({ status: 'success', data: interview });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get all interviews for an application
const getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.findAll({
            where: { applicationId: req.params.applicationId },
            order: [['round', 'ASC']]
        });

        res.status(200).json({ status: 'success', results: interviews.length, data: interviews });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Add feedback after interview
const updateInterview = async (req, res) => {
    try {
        const { feedback, status } = req.body;

        const interview = await Interview.findByPk(req.params.id);
        if (!interview) {
            return res.status(404).json({ status: 'error', message: 'Interview not found' });
        }

        await interview.update({ feedback, status });

        res.status(200).json({ status: 'success', data: interview });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { scheduleInterview, getInterviews, updateInterview };