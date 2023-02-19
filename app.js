const http = require('http');

const express = require('express');

const app = express();

// adding middleware
app.use('/', (req, res, next) => {
  console.log('Middleware always running!');
  // sending response from here
  res.send('<h2>hello</h2>');
});

app.use('/add-users', (req, res, next) => {
  console.log('In the middlware-add-users');
  // sending response from here
  res.send('<h1>These are the users!</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In the middlware-root');
  // sending response from here
  res.send('<h1>Hello from Express JS!</h1>');
});

app.listen(3000);
