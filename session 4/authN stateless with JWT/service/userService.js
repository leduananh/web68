
let users = require("../data.json");

const BusinessException = require("../exception/BusinessException")

const userService = {}

userService.getAllUsers = () => {
    return users
};

userService.getUserById = (reqUserId) => {
    const user = users.find(user => user.id === reqUserId);
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.getUserByName = (reqUserName) => {
    const user = users.find(user => user.name === reqUserName);
    if (!user) {
        throw new BusinessException("User not found")
    }
    return user
};

userService.createUser = (userPayload) => {
    userPayload.id = users.length + 1;
    users.push(userPayload);
    updateDb(users)
    return userPayload
};

userService.updateUser = (reqUserId, userPayload) => {
    const user = users.find(user => user.id === parseInt(reqUserId));
    if (!user) {
        throw new BusinessException("User not found")
    }
    user.name = userPayload.name || user.name;
    user.email = userPayload.email || user.email;
    updateDb(users)
    return user
};

userService.deleteUser = (reqUserId) => {
    const userIndex = users.findIndex(user => user.id === parseInt(reqUserId));
    if (userIndex === -1) {
        throw new BusinessException("User not found")
    }

    users.splice(userIndex, 1);

    updateDb(users)

    return 1;
};

const fileHelper = require("../helper/fileHelper")

let updateDb = data => {

    fileHelper.writeFile(data, "/home/lduananh/MINDX/WEB-67/session 3/error handler example/data.json")

    users = require("../data.json")
}

module.exports = userService;
