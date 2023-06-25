const express = require('express');

const app = express();

const morgan = require('morgan')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'))

const rootRoutes = require('./routes');

app.use(rootRoutes);

const { SERVICE_CONFIG } = require('./config/constants')

app.listen(SERVICE_CONFIG.SERVICE_PORT, () => {
    console.log(`Server is listening on port ${SERVICE_CONFIG.SERVICE_PORT}`);
});
