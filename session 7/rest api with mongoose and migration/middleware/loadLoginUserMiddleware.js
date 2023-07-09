const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const jwt = require('jsonwebtoken');
const userService = require("../service/userService")
const { SERVICE_CONFIG } = require("../config/constants")
const asyncHandler = require('express-async-handler');

const loadLoginUserMiddleware = asyncHandler(async (req, _, next) => {

    if (req.headers.hasOwnProperty('authorization')) {
        try {
            const token = req.headers['authorization'].split(" ")[1]

            const claims = jwt.verify(token, SERVICE_CONFIG.SECRET_KEY)

            const loginUser = await userService.getUserById(claims.sub)

            req.user = loginUser;
        } catch (exception) {
            throw new InvalidArgumentException("token not valid")
        }
    }
    next();
})

module.exports = loadLoginUserMiddleware