module.exports = {
    SERVICE_CONFIG: {
        TOKEN_EXPIRED_TIME: process.env.TOKEN_EXPIRED_TIME || 60 * 60,
        SECRET_KEY: process.env.JWT_KEY || "xzcvzxczxzxczasdasd",
        SERVICE_PORT: process.env.SERVICE_PORT || 3000
    }

};
