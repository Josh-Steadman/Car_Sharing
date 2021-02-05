// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority"
// const client = new MongoClient(url);
// async function run() {
//     const url = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority"
//     const client = new MongoClient(url);
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db("CarSharing");
//         // Use the collection "people"
//         const col = db.collection("cars");
//         // Construct a document                                                                                                                                                              
//         let personDocument = {
//             "make": 'audi' ,
//             "modal": "6series",                                                                                                                                
//             "color": "black",
//             "views": 5250000
//         }
//         // Insert a single document, wait for promise so we can read it back
//         const p = await col.insertOne(personDocument);
//         // Find one document
//         const myDoc = await col.findOne();
//         // Print to the console
//         console.log(myDoc);
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);


const MongoClient = require("mongodb").MongoClient
const urlMongo = "mongodb+srv://dbJS:RjT81fHah4vv13Dh@carsharing.nzrpw.mongodb.net/CarSharing?retryWrites=true&w=majority"

var db;

function connectToServer( callback ) {
    MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
        db  = client.db('CarSharing');
        return callback( err );
    })
}

function getDb() {
    return db
}

module.exports = {connectToServer, getDb}
