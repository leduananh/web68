const exceptionHandler = (error, _, res, next) => {
    if(error){
        return res.status(error.status).json({
            errorMsg: error.message
        })
    }
    next()
}

module.exports = exceptionHandler