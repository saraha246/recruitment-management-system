const { Application, Job, User } = require('../db/models');
const supabase = require('../config/supabase');

const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }

        const existingApplication = await Application.findOne({
            where: { candidateId: req.user.id, jobId }
        });
        if (existingApplication) {
            return res.status(400).json({ status: 'error', message: 'You have already applied for this job' });
        }

        let resumePath = null;

        if (req.file) {
            console.log('File received:', req.file.originalname, req.file.size);
            const fileName = `${req.user.id}-${Date.now()}-${req.file.originalname}`;

            console.log('Uploading to Supabase...');
            const { data, error } = await supabase.storage
                .from('resumes')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype
                });

            console.log('Supabase response:', { data, error });

            if (error) {
                return res.status(500).json({ status: 'error', message: 'Resume upload failed: ' + error.message });
            }

            resumePath = data.path;
        } else {
            console.log('No file received in req.file');
        }

        const application = await Application.create({
            candidateId: req.user.id,
            jobId,
            status: 'applied',
            resumePath
        });

        res.status(201).json({ status: 'success', data: application });
    } catch (err) {
        console.log('CATCH ERROR:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.findAll({
            include: [
                { model: User, as: 'candidate', attributes: ['id', 'firstName', 'lastName', 'email'] },
                { model: Job, attributes: ['id', 'title', 'department'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ status: 'success', results: applications.length, data: applications });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getApplication = async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id, {
            include: [
                { model: User, as: 'candidate', attributes: ['id', 'firstName', 'lastName', 'email'] },
                { model: Job, attributes: ['id', 'title', 'department'] }
            ]
        });

        if (!application) {
            return res.status(404).json({ status: 'error', message: 'Application not found' });
        }

        res.status(200).json({ status: 'success', data: application });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = ['applied', 'shortlisted', 'interview', 'offer', 'hired', 'rejected'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ status: 'error', message: 'Invalid status value' });
        }

        const application = await Application.findByPk(req.params.id);
        if (!application) {
            return res.status(404).json({ status: 'error', message: 'Application not found' });
        }

        await application.update({ status });

        res.status(200).json({ status: 'success', data: application });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { applyForJob, getAllApplications, getApplication, updateApplicationStatus };