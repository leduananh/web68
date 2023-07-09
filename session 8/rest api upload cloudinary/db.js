const { MongoClient } = require('mongodb');
const { SERVICE_CONFIG, DB_CONFIG } = require('./config/constants');

const url = `mongodb+srv://${DB_CONFIG.DB_USERNAME}:${DB_CONFIG.DB_PASSWORD}@${DB_CONFIG.CLUSTER}`;

const mongoClient = new MongoClient(url);

let db;

const connectToDb = async (expressApp) => {
    try {

        // connect toi Server => xu ly bat dong bo
        await mongoClient.connect();

        // connect toi database thong qua databasename => xu ly bat dong bo
        db = mongoClient.db(DB_CONFIG.DB_NAME);

        console.log('Server connected successfully to db server');

        expressApp.listen(SERVICE_CONFIG.SERVICE_PORT, async () => {
            console.log(`Server is listening on port ${SERVICE_CONFIG.SERVICE_PORT}`);
        });

    } catch (err) {
        console.log(err.stack);
    }
}

const getCollection = (collectionName) => {
    return db.collection(collectionName); // Lấy collection từ biến db
};

module.exports = { getCollection, connectToDb };
