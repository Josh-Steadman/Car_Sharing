const con = require("../connect.js")

class User {

    // constructor(db) {
    //     this.collection = db.collection('users');
    //   }
      async addUser(user) {
        con.connectToServer(async (err) => {
            if (err) throw err
            const db = con.getDb()
            db.collection("users").insertOne(user);
        })
      }
    }
    module.exports = User;