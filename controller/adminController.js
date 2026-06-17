const { User, Department } = require('../db/models');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'userType', 'isActive']
        });

        res.status(200).json({ status: 'success', results: users.length, data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Deactivate a user
const deactivateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        await user.update({ isActive: false });

        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Create a department
const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        const department = await Department.create({ name });

        res.status(201).json({ status: 'success', data: department });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();

        res.status(200).json({ status: 'success', results: departments.length, data: departments });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { getAllUsers, deactivateUser, createDepartment, getAllDepartments };