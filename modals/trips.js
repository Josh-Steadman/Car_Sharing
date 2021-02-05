const con = require("../connect.js")

class Trip {

 
      async addTrip(trip) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
            db.collection("trips").insertOne(trip);
        })
      }
    }
    module.exports = Trip;