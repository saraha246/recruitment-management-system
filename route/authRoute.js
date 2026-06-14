//auth related routes

const router = require('express').Router();
const { signup } = require('../controller/authController');

router.route('/signup').post(signup);

module.exports = router;
