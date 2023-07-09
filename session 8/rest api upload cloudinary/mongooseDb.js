const mongoose = require("mongoose")

const { SERVICE_CONFIG, DB_CONFIG } = require('./config/constants');

const url = `mongodb+srv://${DB_CONFIG.DB_USERNAME}:${DB_CONFIG.DB_PASSWORD}@${DB_CONFIG.CLUSTER}/${DB_CONFIG.DB_NAME}`;

const connectToDb = async (expressApp) => {
    try {
        // check Mtls
        await mongoose.connect(url, {
            ssl: true
        });

        console.log('Server connected successfully to db server');

        expressApp.listen(SERVICE_CONFIG.SERVICE_PORT, () => {
            console.log(`Server is listening on port ${SERVICE_CONFIG.SERVICE_PORT}`);
        });

    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = { connectToDb };
