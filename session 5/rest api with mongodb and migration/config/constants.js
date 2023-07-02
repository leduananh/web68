module.exports = {
    SERVICE_CONFIG: {
        TOKEN_EXPIRED_TIME: process.env.TOKEN_EXPIRED_TIME || 60 * 60,
        SECRET_KEY: process.env.JWT_KEY || 'xzcvzxczxzxczasdasd',
        SERVICE_PORT: process.env.SERVICE_PORT || 3000
    },

    DB_CONFIG: {
        DB_USERNAME: process.env.DB_USERNAME || 'leduananh96',
        DB_PASSWORD: process.env.DB_PASSWORD || 'qweasdzxc',
        CLUSTER: process.env.CLUSTER || 'web67.zqxklre.mongodb.net',
        DB_NAME: process.env.DB_NAME || 'web67Demo',
        COLLECTION_USER: process.env.COLLECTION_USER || 'users',
        COLLECTION_ROLE: process.env.COLLECTION_ROLE || 'roles'
    }
};
