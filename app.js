const http = require("http");
const express = require('express');
const fs = require("fs")
const path = require('path');



const app = express();

app.use(express.static(__dirname + '/public'));
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
   
  });

  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'));
   
  });

  app.get('/trips', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/trips.html'));
   
  });

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})