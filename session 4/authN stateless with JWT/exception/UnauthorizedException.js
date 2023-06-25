class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 401;
        // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UnauthorizedException