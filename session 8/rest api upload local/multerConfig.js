const { UPLOAD_CONFIG } = require('./config/constants')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_CONFIG.UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    if (UPLOAD_CONFIG.INCLUDE_MIMETYPE.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: UPLOAD_CONFIG.MAX_UPLOAD_SIZE
    }
})

module.exports = upload
