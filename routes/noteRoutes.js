const express = require("express");
const router = express.Router();
const { addNote } = require("../controllers/noteCtrl");

router.post("/", addNote);

module.exports = router;
