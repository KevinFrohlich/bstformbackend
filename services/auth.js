const jwt = require("jsonwebtoken");
const models = require("../models/index");
const bcrypt = require("bcryptjs");

var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        Email: user.Email,
        UserId: user.UserId,
        Admin: user.Admin
      },
      "mentorbstkey",
      {
        expiresIn: "1h"
      }
    );
    return token;
  },
  verifyUser: function(token) {
    //<--- receive JWT token as parameter
    try {
      let decoded = jwt.verify(token, "mentorbstkey"); //<--- Decrypt token using same key used to encrypt
      return models.users.findByPk(decoded.UserId); //<--- Return result of database query as promise
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  // salt and hash password using bcrypt
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
};

module.exports = authService;
