const express = require('express');
const pug = require('pug');

const upload = require('./routes/upload');
const download = require('./routes/download');

const app = express();
const port = 3000;

app.use('/static', express.static('static'));
app.use('/filepond', express.static('node_modules/filepond/dist'));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/upload', upload);
app.use('/d', download);


app.get('/', (req, res) => {
  const indexFunction = pug.compileFile('templates/index.pug');

  const indexHtml = indexFunction();

  res.send(indexHtml);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
