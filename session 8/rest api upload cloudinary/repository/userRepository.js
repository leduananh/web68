const UserModel = require('../models/user');
const cloudinary = require('cloudinary').v2;
const url = require('url');
const UnprocessableEntityException = require("../exception/UnprocessableEntityException")
const {UPLOAD_CONFIG} = require("../config/constants")
class UserRepository {
    static async create(user) {
        const createdUser = await UserModel.create(user);
        return createdUser.toObject();
    }

    static async update(id, updates) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
        return updatedUser.toObject();
    }

    static async deleteById(id) {
        const user = await this.findById(id)
        const parsedUrl = url.parse(user.avatarUrl);
        const publicId = parsedUrl.pathname.split('/').pop().split('.')[0];

        try {
            const {result} = await cloudinary.uploader.destroy(`${UPLOAD_CONFIG.CLOUDINARY_IMAGES_FOLDER}/${publicId}`)
           if(result !== 'ok'){
            throw new UnprocessableEntityException(result)
           }
            const userDeleteRs = await UserModel.deleteOne({ _id: id });
            return userDeleteRs.deletedCount > 0;

        } catch (error) {
            throw new UnprocessableEntityException("delete user process error")
        }
    }

    static async findById(id) {
        const user = await UserModel.findById(id);
        return user && user.toObject();
    }

    static async validateUserPasswordByEmail(email, checkPassword) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return [null, { errorMsg: "user not found" }]
        }
        if (!user.authenticate(checkPassword)) {
            return [null, { errorMsg: "password not match" }]
        }

        return [user && user.toObject(), null];
    }

    static async findByEmail(email) {
        const user = await UserModel.findOne({ email });
        return user && user.toObject();
    }

    static async findByName(name) {
        const user = await UserModel.findOne({ name });
        return user && user.toObject();
    }

    static async getAll() {
        const users = await UserModel.find();
        return users.map((user) => user.toObject());
    }
}

module.exports = UserRepository;
