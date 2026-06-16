require('dotenv').config();

const express = require('express');
const authRouter = require('./route/authRoute');

//create express app
const app = express();
app.use(express.json());

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
