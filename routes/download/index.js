const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const destPath = path.resolve(process.cwd(), 'files', id);
  const indexJsonPath = path.resolve(destPath, 'index.json');

  const fileData = fs.readFileSync(indexJsonPath);

  const filename = JSON.parse(fileData).filename;

  res.download(path.resolve(destPath, filename));
});

module.exports = router;
