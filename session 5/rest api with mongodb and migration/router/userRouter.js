const userRouter = require("express").Router()
const userController = require("../controller/userController")
const userService = require("../service/userService")

userController(userRouter, userService)

module.exports = userRouter