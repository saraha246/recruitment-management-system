require('dotenv').config();

const express = require('express');
const authRouter = require('./route/authRoute');
const jobRouter = require('./route/jobRoute');
const applicationRouter = require('./route/applicationRoute');
const interviewRouter= require('./route/interviewRoute')
const adminRouter = require('./route/adminRoute')

//create express app
const app = express();
app.use(express.json());
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/interviews', interviewRouter);
app.use('/api/v1/admin', adminRouter);
//create a route 
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'APIs workinggg'
    });
});

//all routes will be here

app.use('/api/v1/auth', authRouter);

//if route not found/non existent/json format
app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    });
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running', PORT);
});
