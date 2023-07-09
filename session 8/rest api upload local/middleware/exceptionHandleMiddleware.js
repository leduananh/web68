const exceptionHandler = (error, _, res, next) => {
    if (error) {
        return res.status(error.status || 500).json({
            errorMsg: error.message
        })
    }
    next()
}

module.exports = exceptionHandler