const express = require("express");
const { registerUser, loginUser } = require("../controllers/authCtrl");
const { body } = require("express-validator");

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ characters"),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").exists().withMessage("Password required"),
  ],
  loginUser
);

module.exports = router;
