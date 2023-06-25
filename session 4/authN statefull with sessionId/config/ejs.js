const path = require('path');

const { EJS_CONFIG } = require('./constants');

const configureEjs = app => {
    try {
        require('ejs')
    } catch (err) {
        return console.error("view engine ejs is not setting up")
    }

    const rootDir = path.join(__dirname, '..');

    // Set the views directory
    app.set('views', path.join(rootDir, EJS_CONFIG.DEFAULT_VIEW_DIR));

    // Set the view engine
    app.set('view engine', 'ejs');
}

module.exports = configureEjs;

