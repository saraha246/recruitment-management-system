require('dotenv').config();

const express = require('express');
const authRouter = require('./route/authRoute');
const jobRouter = require('./route/jobRoute');
const applicationRouter = require('./route/applicationRoute');
const interviewRouter= require('./route/interviewRoute')
const adminRouter = require('./route/adminRoute')
const cors = require('cors');
const userRouter = require('./route/userRoute');
const transporter = require('./config/mail');


//create express app
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/interviews', interviewRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/users', userRouter);

//route creation
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'APIs working'
    });
});


app.use('/api/v1/auth', authRouter);

//if route not found
app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    });
});

const PORT = process.env.APP_PORT || 3000;

// app.listen(PORT, () => {
//     console.log('Server is running', PORT);
// });

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await transporter.verify();
        console.log("✅ SMTP server is ready to send emails");
    } catch (error) {
        console.error("❌ SMTP connection failed:");
        console.error(error);
    }
});