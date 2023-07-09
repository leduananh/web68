class ResourceNotFoundException  extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 403;
        // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ResourceNotFoundException