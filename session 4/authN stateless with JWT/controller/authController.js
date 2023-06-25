const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const ServerException = require("../exception/ServerException");

const { ERROR_MSG } = require("../constants/errorMsgConstance")

const jwt = require('jsonwebtoken');
const { SERVICE_CONFIG } = require("../config/constants")
const authController = (router, service) => {
    const userService = service

    router.post('/login', (req, res, next) => {

        const { username, password } = req.body

        if (!username || !password && username.length === 0 || password.length === 0) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        let user = null

        try {
            user = userService.getUserByName(username)
            if (user != null && user.password === password) {
                res.data = {
                    id: user.id,
                    username: user.username,
                    access_token: jwt.sign({
                        id: user.id,
                        roles: user.roles
                    }, SERVICE_CONFIG.SECRET_KEY, { expiresIn: SERVICE_CONFIG.TOKEN_EXPIRED_TIME })
                };
            }
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
            throw new ServerException(exception.message)
        }
        next()
    });

    return router;
}

module.exports = authController