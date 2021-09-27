//this uses PM2 Node Process Manager.
const express = require('express');
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  console.log(`worker ${process.pid} working`);
  doWork(5000);
  res.send('Hi there');
});

app.get('/fast', (req, res) => {
  res.send('here fast');
});

app.listen(3000);
