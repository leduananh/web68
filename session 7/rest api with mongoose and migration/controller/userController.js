const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const UnprocessableEntityException = require("../exception/UnprocessableEntityException");
const ConflictException = require("../exception/ConflictException");

const { ERROR_MSG } = require("../constants/errorMsgConstance")
const checkLoginMiddleware = require("../middleware/checkLoginMiddleware")
const asyncHandler = require('express-async-handler');

const mongooseHelper = require('../helper/mongooseHelper')

const userController = (router, service) => {
    const userService = service

    router.get('/', asyncHandler(async (_, res, next) => {
        const users = await userService.getAllUsers()
        users.forEach(user => delete user.password)
        res.data = users

        next()
    }));

    router.get('/:id', checkLoginMiddleware, asyncHandler(async (req, res, next) => {
        const userId = req.params.id

        if (!userId) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        let user = null;

        try {
            user = await userService.getUserById(userId);
            console.log(123)
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
        }

        res.statusCode = 200
        res.data = user
        next()
    }));

    router.post('/', checkLoginMiddleware, asyncHandler(async (req, res, next) => {
        const userPayload = req.body;

        if (!userPayload) {
            throw new InvalidArgumentException("request body is invalid")
        }

        let user = null

        try {
            user = await userService.createUser(userPayload);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new UnprocessableEntityException(exception.message)
            }
            if (exception.name === 'ValidationError') {
                throw new InvalidArgumentException(mongooseHelper.errorsFormat(exception))
            }

            if (exception.name === 'MongoServerError') {           
                if(exception.code === 11000){
                    throw new ConflictException(require('format-unicorn/safe')(ERROR_MSG.CONFLICT,{fieldName:"email"}))
                }
            }
        }

        res.statusCode = 201

        res.data = user

        next()
    }));

    router.put('/:id', checkLoginMiddleware, asyncHandler(async (req, res, next) => {
        const userId = req.params.id
        const userPayload = req.body

        if (!userId) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        if (!userPayload) {
            throw new InvalidArgumentException("request body is invalid")
        }

        let user = null

        try {
            user = await userService.updateUser(userId, userPayload);
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
            if (exception.name === 'ValidationError') {
                throw new InvalidArgumentException(mongooseHelper.errorsFormat(exception))
            }
        }

        res.data = user

        next()
    }));

    router.delete('/:id', checkLoginMiddleware, asyncHandler(async (req, res, next) => {
        const userId = req.params.id
        if (!userId) {
            throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
        }

        try {
            const isDeleted = userService.deleteUser(userId);
            if (isDeleted <= 0) {
                throw new UnprocessableEntityException("delete user process is corrupted")
            }
        } catch (exception) {
            if (exception.name === 'BusinessException') {
                throw new ResourceNotFoundException(exception.message)
            }
        }

        res.statusCode = 204
        next()
    }));

    return router;
}

module.exports = userController