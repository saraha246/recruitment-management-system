const transporter = require("../config/mail");

const sendEmail = async ({ to, subject, html, text }) => {
    const mailOptions = {
        from: `"Recruitment Management System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };