const { v4: uuidv4 } = require('uuid');
const session = require('express-session');

const { SESSION_CONFIG } = require('./constants');

const configureSession = app => {
    app.use(session({
        genid: req => {
            return uuidv4(); // use UUIDs for session IDs
        },
        secret: SESSION_CONFIG.SESSION_SECRET,
        resave: SESSION_CONFIG.SESSION_RE_SAVE,
        saveUninitialized: SESSION_CONFIG.SESSION_SAVE_UNINITIALIZED,
    }));
}

module.exports = configureSession;
