const jwt = require('jsonwebtoken');  //bcrypt and jwt
const { User } = require('../db/models');

const protect = async (req, res, next) => {
    try {
        // 1. Check if token exists in headers
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'You are not logged in. Please log in to get access.'
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check if user still exists
        const currentUser = await User.findByPk(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'error',
                message: 'The user belonging to this token no longer exists.'
            });
        }

        // 4. Attach user to request
        req.user = currentUser;
        next();

    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token. Please log in again.'
        });
    }
};

module.exports = { protect };