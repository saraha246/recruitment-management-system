//sign up/login/reset pwd

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { admin } = require('../config/firebase');
const { sendEmail } = require("../services/emailService");

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;

        //checking if the user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already in use'
            });
        }

        //hashes the pwd
        const hashedPassword = await bcrypt.hash(password, 12);

        // create a user in the db
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType
        });

        // generates jwt
        const token = jwt.sign(
            { id: newUser.id, userType: newUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Send welcome email
try {
    await sendEmail({
        to: newUser.email,
        subject: "Welcome to Recruitment Management System!",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome, ${newUser.firstName}! 🎉</h2>

                <p>Your account has been successfully created.</p>

                <p>We're excited to have you on the Recruitment Management System.</p>

                <p>You can now log in and start exploring opportunities.</p>

                <br>

                <p>Best Regards,</p>
                <strong>Recruitment Management System Team</strong>
            </div>
        `
    });

    console.log("✅ Welcome email sent");
} catch (emailError) {
    console.error("❌ Failed to send welcome email:", emailError);
}

        //response
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking if email and pwd exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password'
            });
        }

        // finds the user by email id
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            });
        }

        // compares the pwd
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            });
        }

        //generate jwt
        const token = jwt.sign(
            { id: user.id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        //return response
        res.status(200).json({
            status: 'success',
            token,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};


const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        // 1. Verify the Firebase ID token
        const decodedToken = await admin.verifyIdToken(idToken);
        const { email, name } = decodedToken;

        // 2. Check if user exists in our DB
        let user = await User.findOne({ where: { email } });


        // 3. If not, create a new user
if (!user) {
    const [firstName, ...rest] = (name || 'Google User').split(' ');
    const lastName = rest.join(' ') || 'User';

    user = await User.create({
        firstName,
        lastName,
        email,
        password: 'google-sso-no-password',
        userType: 'candidate'
    });

    // Send welcome email ONLY for new Google users

// Send welcome email ONLY for new Google users
try {
    await sendEmail({
        to: user.email,
        subject: "Welcome to Recruitment Management System!",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome, ${user.firstName}! 🎉</h2>

                <p>Your account has been successfully created.</p>

                <p>We're excited to have you on the Recruitment Management System.</p>

                <p>You can now log in and start exploring opportunities.</p>

                <br>

                <p>Best Regards,</p>
                <strong>Recruitment Management System Team</strong>
            </div>
        `
    });

    console.log("✅ Welcome email sent (Google signup)");
} catch (emailError) {
    console.error("❌ Failed to send welcome email:", emailError);
}

} 
        // 4. Generate our own JWT
        const token = jwt.sign(
            { id: user.id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );


        // Response
        res.status(200).json({
            status: 'success',
            token,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType
            }
        });

    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: 'Google authentication failed'
        });
    }
};

module.exports = { signup, login, googleLogin };
