//auth related routes

const router = require('express').Router();
const { signup, login, googleLogin, verifyOTP } = require('../controller/authController');


router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/google-login').post(googleLogin);
router.post("/verify-otp", verifyOTP);

module.exports = router;


