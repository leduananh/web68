const { SESSION_CONFIG } = require("../config/constants")

const loadLoginUserMiddleware = (req, _, next) => {

    const loginUser = req.session[`${SESSION_CONFIG.USER_INFO_KEY}`];

    if (loginUser) {
        req.user = loginUser
    }

    next()
}

module.exports = loadLoginUserMiddleware