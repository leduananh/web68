const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const UnprocessableEntityException = require("../exception/UnprocessableEntityException");
const { ERROR_MSG } = require("../constants/errorMsgConstance")
const checkLoginMiddleware = require("../middleware/checkLoginMiddleware")

const userController = (router, service) => {
    const userService = service

    router.get('/', (_, res, next) => {
        const users = userService.getAllUsers()
        res.data = users
        next()
    });

    router.get('/:id', checkLoginMiddleware, (req, res, next) => {
        if (!req.params.id || !parseInt(req.params.id)) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        const userId = parseInt(req.params.id)

        let user = null;

        try {
            user = userService.getUserById(userId);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
        }

        res.statusCode = 200
        res.data = user
        next()
    });

    router.post('/', checkLoginMiddleware, (req, res, next) => {
        const userPayload = req.body;

        if (!userPayload) {
            throw new InvalidArgumentException("request body is invalid")
        }

        let user = null

        try {
            user = userService.createUser(userPayload);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new UnprocessableEntityException(exception.message)
            }
        }

        res.statusCode = 201

        res.data = user

        next()
    });

    router.put('/:id', checkLoginMiddleware, (req, res, next) => {

        if (!req.params.id || !parseInt(req.params.id)) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        if (!req.body) {
            throw new InvalidArgumentException("request body is invalid")
        }

        const userId = parseInt(req.params.id)

        const userPayload = req.body;

        let user = null

        try {
            user = userService.updateUser(userId, userPayload);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
        }

        res.data = user

        next()
    });

    router.delete('/:id', checkLoginMiddleware, (req, res, next) => {
        if (!req.params.id || !parseInt(req.params.id)) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        const userId = parseInt(req.params.id)

        try {
            userService.deleteUser(userId);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
        }

        res.statusCode = 204
        next()
    });

    return router;
}

module.exports = userController