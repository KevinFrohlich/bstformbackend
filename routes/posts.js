const express = require("express");
const router = express.Router();
const models = require("../models");
const authService = require("../services/auth");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
