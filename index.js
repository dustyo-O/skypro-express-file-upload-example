const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let id;

    let destPath;

    do {
      id = uuidv4();
      destPath = path.resolve(__dirname, 'files', id);
    } while(fs.existsSync(destPath));

    req.uploadedFileId = id;

    fs.mkdirSync(destPath);

    const fileData = {
      filename: file.originalname,
      mimetype: file.mimetype,
    };

    fs.writeFileSync(path.resolve(destPath, 'index.json'), JSON.stringify(fileData, null, 4), 'utf8');

    cb(null, destPath);
  },
  filename: function (req, file, cb) {

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
  res.send({ status: 'ok', id: req.uploadedFileId });
});

app.get('/d/:id', (req, res) => {
  const id = req.params.id;

  const destPath = path.resolve(__dirname, 'files', id);
  const indexJsonPath = path.resolve(destPath, 'index.json');

  const fileData = fs.readFileSync(indexJsonPath);

  const filename = JSON.parse(fileData).filename;

  res.download(path.resolve(destPath, filename));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
