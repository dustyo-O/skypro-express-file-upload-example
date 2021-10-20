const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('static'));
app.use('/filepond', express.static('node_modules/filepond/dist'));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
