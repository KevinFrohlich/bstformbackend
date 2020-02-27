const express = require("express");
const router = express.Router();
const models = require("../models");
const authService = require("../services/auth");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", function(req, res, next) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Username: req.body.username,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send(JSON.stringify("User successfully created"));
      } else {
        res.send(JSON.stringify("This user already exists"));
      }
    });
});

module.exports = router;
