const con = require("../connect.js")

class User {

   
      async addUser(user) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
            db.collection("users").insertOne(user);
        })
      }
    }
    module.exports = User;