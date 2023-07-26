const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { signup, login } = require("./../controllers/AuthCtr");
const {
  signupValidator,
  loginValidator,
} = require("./../utils/validators/authValidator");
const { requireSignIn } = require("../middlwares/authMiddlwares");
const apiError = require("../utils/apiError");

// @desc Sign Up
router.post("/signup", signupValidator, signup);

// @desc Login
router.post("/login", loginValidator, login);

module.exports = router;
