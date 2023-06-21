const express = require('express');

const app = express();

const {SERVICE_CONFIG} = require('./config/service')

const rootRoutes = require('./routes');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rootRoutes);

app.listen(SERVICE_CONFIG.SERVICE_PORT, () => {
    console.log(`Server is listening on port ${SERVICE_CONFIG.SERVICE_PORT}`);
});
