const express = require('express');

const app = express();

const morgan = require('morgan')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'))

const rootRoutes = require('./routes');

app.use(rootRoutes);

const { connectToDb } = require('./mongooseDb')

connectToDb(app)


