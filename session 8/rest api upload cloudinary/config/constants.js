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
    },

    UPLOAD_CONFIG: {
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || "dpifjrjmw",
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "865666371879334",
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "OXNzSsIwyG0EqGZz1uU7LJ2jk4U",
        CLOUDINARY_IMAGES_FOLDER: process.env.CLOUDINARY_IMAGES_FOLDER || "WEB67",
        INCLUDE_MIMETYPE: process.env.INCLUDE_MIMETYPE || ['jpg', 'jpeg', 'png'],
        MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || 1024 * 1024 * 2  // Giới hạn tệp tải lên đến 2 MB
    }
};
