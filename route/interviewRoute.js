const router = require('express').Router();
const { scheduleInterview, getInterviews, updateInterview } = require('../controller/interviewController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleCheck');

router.route('/')
    .post(protect, restrictTo('recruiter', 'admin'), scheduleInterview);

router.route('/:applicationId')
    .get(protect, getInterviews);

router.route('/:id/feedback')
    .patch(protect, restrictTo('recruiter', 'admin'), updateInterview);

module.exports = router;