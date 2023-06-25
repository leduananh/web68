module.exports = {
    SERVICE_CONFIG: {
        SERVICE_PORT: process.env.SERVICE_PORT || 3000
    },

    SESSION_CONFIG: {
        SESSION_SECRET: process.env.SESSION_SECRET || 'mysecretkey',
        SESSION_RE_SAVE: process.env.SESSION_RE_SAVE || false,
        SESSION_SAVE_UNINITIALIZED: process.env.SESSION_SAVE_UNINITIALIZED || false,
        USER_INFO_KEY: 'userInfo',
    },

    EJS_CONFIG: {
        DEFAULT_VIEW_DIR: process.env.DEFAULT_VIEW_DIR || 'views'
    }
};
