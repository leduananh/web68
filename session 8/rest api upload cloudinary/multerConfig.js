const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { UPLOAD_CONFIG } = require('./config/constants')

// Configuration 
cloudinary.config({
    cloud_name: UPLOAD_CONFIG.CLOUDINARY_NAME,
    api_key: UPLOAD_CONFIG.CLOUDINARY_API_KEY,
    api_secret: UPLOAD_CONFIG.CLOUDINARY_API_SECRET
});

// Cấu hình storage của multer sử dụng Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: UPLOAD_CONFIG.CLOUDINARY_IMAGES_FOLDER, // Thư mục lưu trữ trên Cloudinary
        allowedFormats: UPLOAD_CONFIG.INCLUDE_MIMETYPE, // Các định dạng tệp cho phép
        filename: (req, file) => {
            // Tạo tên tệp tùy chỉnh ở đây
            const uniqueFilename = Date.now() + '-' + file.originalname;
            file.originalname = uniqueFilename
            // cb(null, uniqueFilename);
        }

    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: UPLOAD_CONFIG.MAX_UPLOAD_SIZE
    }
})

module.exports = upload
