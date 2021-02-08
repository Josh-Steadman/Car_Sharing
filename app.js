const http = require("http");
const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const con = require("./connect.js")
const User = require("./modals/user.js");
const Trip = require("./modals/trips.js");


let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express();


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
    let tp = []
    con.connectToServer(async (err) => {
      if (err) throw err
      const db = con.getDb()
       let trips = db.collection("trips");
      let t = trips.find({'destination': 'bristol'});
      
      t.forEach(element => {
        tp.push(element)
        
      }).then(function() {
        console.log(tp)
        res.render("trips", {'trips': tp})
      })
      
  })
  
    // res.sendFile(path.join(__dirname+'/views/trips.html'));
      //  res.render("trips", {'trips': t})
     
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