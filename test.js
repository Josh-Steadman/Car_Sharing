const con = require("./connect.js")

con.connectToServer(function( err, client ) {
    if (err) console.log(err);
   
  } )
var db = con.getDb();
const col = db.collection("cars")
let personDocument = {
        "make": 'audi' ,
        "modal": "6series",                                                                                                                                
        "color": "black",
        "views": 5250000
    }

    const p = col.insertOne(personDocument);

// db.collection( 'users' ).find();
