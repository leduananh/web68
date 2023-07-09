const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const ServerException = require("../exception/ServerException");
const asyncHandler = require('express-async-handler');

const { ERROR_MSG } = require("../constants/errorMsgConstance")

const jwt = require('jsonwebtoken');
const { SERVICE_CONFIG } = require("../config/constants")


const authController = (router, service) => {
    const userService = service

    router.post('/login', asyncHandler(async (req, res, next) => {

        const { email, password } = req.body

        if (!email || !password && email.length === 0 || password.length === 0) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        try {
            const checkPassword = password;
            const [user, error] = await userService.validateUserPasswordByEmail(email, checkPassword)

            if (error) {
                throw new InvalidArgumentException(error.errorMsg)
            }

            res.data = {
                email: user.email,
                access_token: jwt.sign({
                    sub: user._id,
                    roles: user.roles
                }, SERVICE_CONFIG.SECRET_KEY, { expiresIn: SERVICE_CONFIG.TOKEN_EXPIRED_TIME })
            };

        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
            next(exception)
        }
        next()
    }));

    return router;
}

module.exports = authController