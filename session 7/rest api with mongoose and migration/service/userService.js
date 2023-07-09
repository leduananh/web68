// const userModel = require("../model/userModel")
const UserRepository = require("../repository/userRepository")
const BusinessException = require("../exception/BusinessException")

const userService = {}

userService.getAllUsers = async () => {
    const users = await UserRepository.getAll();

    return users;
};

userService.validateUserPasswordByEmail = async (email, checkPassword) => {
    return await UserRepository.validateUserPasswordByEmail(email, checkPassword)
 
};

userService.getUserById = async (reqUserId) => {
    const user = await UserRepository.findById(reqUserId)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.getUserByName = async (reqUserName) => {
    const user = await UserRepository.findByName(reqUserName)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.getUserByEmail = async (reqUserEmail) => {
    const user = await UserRepository.findByEmail(reqUserEmail)
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.createUser = async (userPayload) => {
    return await UserRepository.create(userPayload)
};

userService.updateUser = async (reqUserId, userPayload) => {
    const user = await UserRepository.findById(reqUserId);

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

    return await UserRepository.update(reqUserId, userPayload)
};

userService.deleteUser = async (reqUserId) => {
    return await UserRepository.deleteById(reqUserId)
};

module.exports = userService;
