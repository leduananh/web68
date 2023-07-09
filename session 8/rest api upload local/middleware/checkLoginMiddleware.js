const UnauthorizedException = require("../exception/UnauthorizedException")
const { ERROR_MSG } = require("../constants/errorMsgConstance")
const checkLoginMiddleware = (req, res, next) => {

    const loginUser = req.user;

    if (!loginUser) {
        throw new UnauthorizedException(ERROR_MSG.UNAUTHORIZE)
    }

    next()
}

module.exports = checkLoginMiddleware