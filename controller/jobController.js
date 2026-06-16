const { Job } = require('../db/models');

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { status: 'open' },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            status: 'success',
            results: jobs.length,
            data: jobs
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get single job
const getJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }

        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Create job
const createJob = async (req, res) => {
    try {
        const { title, description, department, location, salaryRange, jobType } = req.body;

        const job = await Job.create({
            title,
            description,
            department,
            location,
            salaryRange,
            jobType,
            status: 'open',
            recruiterId: req.user.id
        });

        res.status(201).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Update job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }

        await job.update(req.body);

        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Delete job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }

        await job.destroy();

        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };