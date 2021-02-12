const http = require("http");
const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const con = require("./connect.js")
const User = require("./modals/user.js");
const Trip = require("./modals/trips.js");


let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express();

app.use(session({
  key: 'user_js',
  secret: 'strawhat',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_js) {
      res.redirect('/home');
  } else {
      next();
  }    
};

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
const port = 3000

app.get('/', sessionChecker, (req, res) => {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});



  app.post('/', urlencodedParser,function(req,res){
    const user = req.body
  
    u = new User()
    u.addUser(user);
    req.session.user = user
    
    res.redirect('/home');
  });

  // create log in route
  app.post('/login', urlencodedParser,function(req,res){
    const email = req.body.email
    
    con.connectToServer(async (err) => {
      if (err) throw err
      const db = con.getDb()
       let users = db.collection("users");
       users.findOne({  email: email }).then(function (user) {
        if (!user) {
            console.log("user dose not exist")
            res.redirect('/');
        } else {
            req.session.user = user
            res.redirect('/home');
        }
    });;
   
      
  })
    
  
  });


  app.get('/home', (req, res) => {
    if(req.session.user) {
      let tp = []
      res.render("home", {'trips': tp})
    } else {
      res.redirect('/')
    }
   
   
  });

  app.post('/home', urlencodedParser,function(req,res){
    let tp = []
    const search = req.body
    let dest = search.destination.split(',')[0].toLowerCase()
    let dep = search.departure.split(',')[0].toLowerCase()
    con.connectToServer(async (err) => {
      if (err) throw err
      const db = con.getDb()
       let trips = db.collection("trips");
      let t = trips.find({'destination': dest, 'departure': dep});
      
      t.forEach(element => {
        tp.push(element)
        
      }).then(function() {
        console.log(tp)
        res.render("home", {'trips': tp, 'search': search})
      })
      
  })
 
    
  
  });

  app.get('/trips', (req, res) => {
    if(req.session.user && req.cookies.user_js) {
      let tp = []
      con.connectToServer(async (err) => {
        if (err) throw err
        const db = con.getDb()
         let trips = db.collection("trips");
        let t = trips.find({userEmail: req.session.user.email});
        
        t.forEach(element => {
          tp.push(element)
          
        }).then(function() {
          // console.log(tp)
          res.render("trips", {'trips': tp})
        })
        
    })
    } else {
      res.redirect('/')
    }
 
     
  });

  app.post('/trips', urlencodedParser,function(req,res){
    const trip = req.body
    trip.userEmail = req.session.user.email
    let t = new Trip()
    t.addTrip(trip);
    
    res.redirect('/trips');
  });

  app.post('/trips/edit', urlencodedParser,function(req,res){
    const trip = req.body
    
    let t = new Trip()
    t.editTrip(trip);
    
    res.redirect('/trips');
  });

  app.post('/trips/delete', urlencodedParser,function(req,res){
    const trip = req.body
    console.log(trip)
    let t = new Trip()
    t.deleteTrip(trip);
    
    
    res.redirect('/trips');
  });

  app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_js) {
        res.clearCookie('user_js');
        res.redirect('/');
    } else {
        res.redirect('/home');
    }
});

app.get('/profile', urlencodedParser,function(req,res){
  
  user = req.session.user
  res.render('profile', {'user': user});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})