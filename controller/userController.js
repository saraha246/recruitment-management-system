const { User } = require('../db/models');

const saveFcmToken = async (req, res) => {
    try {
        const { fcmToken } = req.body;

        await req.user.update({ fcmToken });

        res.status(200).json({ status: 'success', message: 'FCM token saved' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { saveFcmToken };