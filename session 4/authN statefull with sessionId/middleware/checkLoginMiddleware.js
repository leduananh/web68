const { SESSION_CONFIG } = require("../config/constants")

const checkLoginMiddleware = (req, res, next) => {

    const loginUser = req.session[`${SESSION_CONFIG.USER_INFO_KEY}`];

    if (!loginUser) {
        return res.redirect("/login")
    }

    next()
}

module.exports = checkLoginMiddleware