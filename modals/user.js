
class User {
    
    constructor(db) {
        this.collection = db.collection('users');
      }
      async addUser(user) {
        const newUser = await this.collection.insertOne(user);
        return newUser;
      }
    }
    module.exports = User;