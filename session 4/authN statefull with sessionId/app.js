const express = require('express');

const app = express();

const morgan = require('morgan')

const configureSession = require('./config/session')

const configureEjs = require('./config/ejs')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))

configureSession(app)

configureEjs(app)

const rootRoutes = require('./routes');

app.use(rootRoutes);

const { SERVICE_CONFIG } = require('./config/constants')

app.listen(SERVICE_CONFIG.SERVICE_PORT, () => {
    console.log(`Server is listening on port ${SERVICE_CONFIG.SERVICE_PORT}`);
});
