const { ObjectId } = require("mongodb");
const con = require("../connect.js")

class Trip {

 
 
      async addTrip(trip) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
            
            db.collection("trips").insertOne(trip);
        })
      }

      async deleteTrip(trip) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
            
            db.collection("trips").deleteOne(trip);
        })
      }

      async editTrip(trip) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
           let collection = db.collection("trips")
           
           let id = trip.id
           console.log(id)
           
           
      
        // convert to id if possible!!
            const filter = { time: trip.time };
            
            const updateDocument = {
              $set: {
                  departure: trip.departure,
                  destination: trip.destination,
                  price: trip.price,
                  seats: trip.seats,
                  regular: trip.regular,
                  time: trip.time
              },
            };
            
            collection.updateOne(filter, updateDocument);
                    })
      }

   

      
    }
    module.exports = Trip;