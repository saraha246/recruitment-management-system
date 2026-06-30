// const express = require('express');
// const multer = require('multer');

// const app = express();

// const upload= multer({ dest: 'uploads/' });

// app.post('/', upload.single('pdf'), (req, res) => {
//     console.log(req.file)
//   res.send('Testing');
// })


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.post('/', upload.single('pdf'), (req, res) => {
    console.log('body:', req.body);
    console.log('file:', req.file);
    res.send('Testing');
});

app.listen(3000, () => {
    console.log('Test server running on port 3000');
});

