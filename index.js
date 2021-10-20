const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('destination');
    console.log(file);
    const id = uuidv4();

    fs.mkdirSync(path.resolve(__dirname, 'files', id));

    cb(null, path.resolve('files', id));
  },
  filename: function (req, file, cb) {
    console.log('filename');
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/', express.static('static'));
app.use('/filepond', express.static('node_modules/filepond/dist'));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/upload', upload.single('filepond'), (req, res) => {
  res.send('upload');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
