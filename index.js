const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR;
console.log(cluster.schedulingPolicy);

if (cluster.isPrimary) {
  cluster.fork();
  //   cluster.fork();
  console.log(cluster.isMaster);
} else {
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
}
