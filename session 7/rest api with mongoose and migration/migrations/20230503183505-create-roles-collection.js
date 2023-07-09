const { DB_CONFIG } = require("../config/constants")
const roles = [
  { "name": "ADMIN" },
  { "name": "USER" },
]
module.exports = {
  async up(db, client) {
    const rolesCollection = await db.createCollection(DB_CONFIG.COLLECTION_ROLE);
    await rolesCollection.insertMany(roles);
  },

  async down(db, client) {
    await db.collection(DB_CONFIG.COLLECTION_ROLE).drop();
  }
};
