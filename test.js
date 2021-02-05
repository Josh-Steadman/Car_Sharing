const con = require("./connect.js")

con.connectToServer(async (err) => {
    if (err) throw err
    const db = con.getDb()
    console.log(db)
  
    let personDocument = {
        "make": 'audi' ,
        "modal": "6series",                                                                                                                                
        "color": "black",
        "views": 5250000
    }
    db.collection("cars").insertOne(personDocument);
  
    //             const p = await cars.insertOne(personDocument);
})