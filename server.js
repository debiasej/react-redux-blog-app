const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

app.use(express.static(__dirname));

// Fake API
app.get('/api/posts', (req, res) => {
  res.send([{name: 'mario'}]);
});

app.get('*', (req, res) => {
  console.log('Loading index.html...');
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started!');
