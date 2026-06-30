const router = require('express').Router();
const { saveFcmToken } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/fcm-token').post(protect, saveFcmToken);

module.exports = router;