const { DB_CONFIG } = require("../config/constants")

const users = [
  {
    "email": "admin@mail.com",
    "username": "admin",
    "password": "123",
  },
  {
    "email": "user1@mail.com",
    "username": "user1",
    "password": "123",
  },
  {
    "email": "user2@mail.com",
    "username": "user2",
    "password": "123",
  }
]

module.exports = {
  async up(db, client) {
    const usersCollection = await db.createCollection(DB_CONFIG.COLLECTION_USER);
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.insertMany(users);
  },

  async down(db, client) {
    await db.collection(DB_CONFIG.COLLECTION_USER).drop();
  }
};
