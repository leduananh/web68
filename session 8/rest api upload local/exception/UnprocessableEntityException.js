class UnprocessableEntityException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 422;
        // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UnprocessableEntityException