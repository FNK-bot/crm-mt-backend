const express = require("express");
const { createDeal } = require("../controllers/dealCtrl");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("customerId").notEmpty(),
    body("status").isIn(["pending", "won", "lost"]),
  ],
  createDeal
);

module.exports = router;
