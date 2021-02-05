const http = require("http");
const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require('path');
const User = require("./modals/user.js");
const Trip = require("./modals/trips.js");


let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express();

app.use(express.static(__dirname + '/public'));
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
   
  });

  app.post('/', urlencodedParser,function(req,res){
    const user = req.body
    // console.log(user)
    u = new User()
    u.addUser(user);
    
    res.sendFile(path.join(__dirname+'/views/home.html'));
  });

  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/home.html'));
   
  });

  app.get('/trips', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/trips.html'));
   
  });

  app.post('/trips', urlencodedParser,function(req,res){
    const trip = req.body
    
    let t = new Trip()
    t.addTrip(trip);
    
    res.sendFile(path.join(__dirname+'/views/trips.html'));
  });


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})