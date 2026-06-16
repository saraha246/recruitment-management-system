const router = require('express').Router();
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controller/jobController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleCheck');

router.route('/')
    .get(getAllJobs)
    .post(protect, restrictTo('recruiter', 'admin'), createJob);

router.route('/:id')
    .get(getJob)
    .put(protect, restrictTo('recruiter', 'admin'), updateJob)
    .delete(protect, restrictTo('recruiter', 'admin'), deleteJob);

module.exports = router;