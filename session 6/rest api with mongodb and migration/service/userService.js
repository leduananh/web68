
let users = require("../data.json");
const asyncHandler = require('express-async-handler');

const userModel = require("../model/userModel")

const BusinessException = require("../exception/BusinessException")

const userService = {}

userService.getAllUsers = async () => {
    const users = await userModel.getAll();

    return users;
};

userService.getUserById = async (reqUserId) => {
    const user = await userModel.findById(reqUserId)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.getUserByName = async (reqUserName) => {
    const user = await userModel.findByName(reqUserName)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.getUserByEmail = async (reqUserEmail) => {
    const user = await userModel.findByEmail(reqUserEmail)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.createUser = async (userPayload) => {
    return await userModel.create(userPayload)
};

userService.updateUser = async (reqUserId, userPayload) => {
    const user = await userModel.findById(reqUserId);

    if (!user) {
        throw new BusinessException("User not found")
    }
    if (!userPayload.name) {
        delete userPayload.name
    }

    if (!userPayload.password) {
        delete userPayload.password
    }

    if (!userPayload.email) {
        delete userPayload.email
    }

    return await userModel.update(reqUserId, userPayload)
};

userService.deleteUser = async (reqUserId) => {
    return await userModel.deleteById(reqUserId)
};

module.exports = userService;
