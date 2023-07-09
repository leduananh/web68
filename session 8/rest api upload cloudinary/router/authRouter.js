const authRouter = require("express").Router()
const authController = require("../controller/authController")
const userService = require("../service/userService")

authController(authRouter, userService)

module.exports = authRouter