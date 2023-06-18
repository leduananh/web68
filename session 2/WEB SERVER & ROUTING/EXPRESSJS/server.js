const express = require('express');
const app = express();
const fs = require('fs');

let a = []

app.get('/plainText', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('plain text content format');
});

app.get('/hello.html', (req, res) => {
  const htmlPageContent = fs.readFileSync('./hello.html');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send(htmlPageContent);
});

app.get('/style.css', (req, res) => {
  const style = fs.readFileSync('./style.css');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/css');
  res.send(style);
});

app.get('/image.jpg', (req, res) => {
  const jpgImage = fs.readFileSync('./image.jpg');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/jpg');
  res.send(jpgImage);
});

app.get('/data.json', (req, res) => {
  const data = require('./data.json');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

const port = 8080;
const hostname = 'localhost';

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
