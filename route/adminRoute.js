const router = require('express').Router();
const { getAllUsers, deactivateUser, createDepartment, getAllDepartments } = require('../controller/adminController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleCheck');

router.use(protect, restrictTo('admin'));

router.route('/users').get(getAllUsers);
router.route('/users/:id/deactivate').patch(deactivateUser);

router.route('/departments')
    .get(getAllDepartments)
    .post(createDepartment);

module.exports = router;