const mongooseHelper = {}

mongooseHelper.errorsFormat = (exception) => {
    const errors = exception.errors
    const errorsKey = Object.keys(errors)
    return errorsKey.map(key => `${key}: ${errors[key].message}`).join("; ")
}

module.exports = mongooseHelper