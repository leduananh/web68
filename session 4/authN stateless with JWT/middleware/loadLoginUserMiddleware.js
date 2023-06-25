const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const jwt = require('jsonwebtoken');
const userService = require("../service/userService")
const { SERVICE_CONFIG } = require("../config/constants")

const loadLoginUserMiddleware = (req, _, next) => {

    if (req.headers.hasOwnProperty('authorization')) {
        try {
            const token = req.headers['authorization'].split(" ")[1]

            const claims = jwt.verify(token, SERVICE_CONFIG.SECRET_KEY)

            const loginUser = userService.getUserById(claims.id)

            req.user = loginUser;
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
            if(exception.name === 'TokenExpiredError'){
                throw new InvalidArgumentException(exception.message)
            }
        }
    } 
    next();
}

module.exports = loadLoginUserMiddleware