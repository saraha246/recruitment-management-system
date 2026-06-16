//sign up/login/reset pwd

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already in use'
            });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 3. Create the user in DB
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType
        });

        // 4. Generate JWT
        const token = jwt.sign(
            { id: newUser.id, userType: newUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 5. Return response
        res.status(201).json({
            status: 'success',
            token,
            data: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                userType: newUser.userType
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

module.exports = { signup };