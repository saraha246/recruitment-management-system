const express = require('express');
const authRouter = require('./route/authRoute');

//create express app
const app = express();

//create a route 
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'APIs workinggg'
    });
});

//all routes will be here

app.use('/api/v1/auth', authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
