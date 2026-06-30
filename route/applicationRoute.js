const router = require('express').Router();
const { applyForJob, getAllApplications, getApplication, updateApplicationStatus } = require('../controller/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleCheck');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, restrictTo('recruiter', 'admin'), getAllApplications)
    .post(protect, restrictTo('candidate'), upload.single('resume'), applyForJob);

router.route('/:id')
    .get(protect, getApplication)
    .patch(protect, restrictTo('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;