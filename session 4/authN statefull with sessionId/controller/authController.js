const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException ");
const ServerException = require("../exception/ServerException");

const UnprocessableEntityException = require("../exception/UnprocessableEntityException");
const { ERROR_MSG } = require("../constants/errorMsgConstance")
const { SESSION_CONFIG } = require("../config/constants")

const authController = (router, service) => {
    const userService = service

    router.get('/login', (req, res) => {

        const formViewDataForRender = {
            method: "POST",
            action: "/login",
            fields: [
                {
                    labelKey: "username",
                    labelName: "username: ",
                    fieldType: "text"
                },
                {
                    labelKey: "password",
                    labelName: "Password: ",
                    fieldType: "password"
                }
            ]
        }

        const renderData = req.user ? {
            user: req.user,
            form: null
        } : {
            form: formViewDataForRender,
            user: null
        }

        res.render('login', renderData);
    })

    router.post('/login', async (req, res, next) => {
        try {

            const { username, password } = req.body

            if (!username || !password && username.length === 0 || password.length === 0) {
                throw new InvalidArgumentException(ERROR_MSG.INVALID_ARGUMENT)
            }

            let user = null

            try {
                user = userService.getUserByName(username)
                if (user != null && user.password === password) {
                    res.data = {
                        msg: "LOGIN THANH CONG",
                        id: user.id,
                        username: user.name,
                    };

                    req.session[`${SESSION_CONFIG.USER_INFO_KEY}`] = res.data

                    const error = await req.session.save();

                    if (error) {
                        throw new Error(ERROR_MSG.SERVER_DEFAULT_ERROR)
                    }

                }
                next()
            } catch (exception) {
                if (exception.name === 'BusinessException') {
                    throw new ResourceNotFoundException(exception.message)
                }
                throw new ServerException(exception.message)
            }

        } catch (error) {
            next(error)
        }
    });

    return router;
}

module.exports = authController