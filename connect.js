// const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority"
// const client = new MongoClient(url);
// async function run() {
//     const url = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority"
//     const client = new MongoClient(url);
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
        // const db = client.db("CarSharing");
        // // Use the collection "people"
        // const col = db.collection("cars");
        // // Construct a document                                                                                                                                                              
        // let personDocument = {
        //     "make": 'audi' ,
        //     "modal": "6series",                                                                                                                                
        //     "color": "black",
        //     "views": 5250000
        // }
        // // Insert a single document, wait for promise so we can read it back
        // const p = await col.insertOne(personDocument);
        // // Find one document
        // const myDoc = await col.findOne();
        // // Print to the console
        // console.log(myDoc);
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
// module.exports = run
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('carSharing');
      return callback( err );
    } );
  },

  getDb: function() {
      
    return _db;
  }
};

