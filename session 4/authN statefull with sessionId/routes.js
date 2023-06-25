const rootRouter = require("express").Router()

const userRouter = require("./router/userRouter")

const authRouter = require("./router/authRouter")

rootRouter.use(require("./middleware/loadLoginUserMiddleware"), authRouter)

rootRouter.use("/users", require("./middleware/loadLoginUserMiddleware"), userRouter)

rootRouter.use(require("./middleware/exceptionHandleMiddleware"))

rootRouter.use(require("./middleware/payloadFormatMiddleware"))

module.exports = rootRouter