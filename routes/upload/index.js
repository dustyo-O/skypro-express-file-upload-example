const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let id;

    let destPath;

    do {
      id = uuidv4();
      destPath = path.resolve(process.cwd(), 'files', id);
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

router.post('/file', upload.single('filepond'), (req, res) => {
  res.send({ status: 'ok', id: req.uploadedFileId });
});

module.exports = router;
