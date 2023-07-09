const rootRouter = require("express").Router()

const userRouter = require("./router/userRouter")

const authRouter = require("./router/authRouter")

rootRouter.use(require("./middleware/loadLoginUserMiddleware"))

rootRouter.use(authRouter)

rootRouter.use("/users", userRouter)

rootRouter.use(require("./middleware/exceptionHandleMiddleware"))

rootRouter.use(require("./middleware/payloadFormatMiddleware"))

module.exports = rootRouter