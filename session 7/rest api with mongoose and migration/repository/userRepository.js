const UserModel = require('../models/user');

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
        const result = await UserModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
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
