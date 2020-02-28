const express = require("express");
const router = express.Router();
const models = require("../models");
const authService = require("../services/auth");

// router.get(
//   "/getUser",
//   authService.verifyUser("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(JSON.stringify("respond with a resource"));
});

/*Create a new user and hash their password for secuirity */
router.post("/signup", function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.Email
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Username: req.body.Username,
        Password: authService.hashPassword(req.body.Password)
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

/*Users login - match password to allow access */
router.post("/login", function(req, res, next) {
  models.users
    .findOne({
      where: {
        Email: req.body.Email
      }
    })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).send(JSON.stringify("Login Failed"));
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.Password,
          user.Password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.send(token);
        } else {
          res.status(401);
          res.send(
            JSON.stringify("Wrong password. Please go back and try again.")
          );
        }
      }
    });
});

/*Create a profile page with the users information to be displayed */
router.get("/profile", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        res.send(
          JSON.stringify({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username,
            Password: user.Password
          })
        );
      } else {
        res.status(401);
        res.send(JSON.stringify("Invalid authentication token"));
      }
    });
  } else {
    res.status(401);
    res.send(JSON.stringify("Must be logged in"));
  }
});

router.post("/profile", function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        UserId: req.body.UserId
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
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

/*Establish whether the user has administrative privileges to access certain pages*/
router.get("/admin", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.Admin) {
        models.users
          .findAll({
            where: { Deleted: false },
            raw: true
          })
          .then(usersFound => res.send(JSON.stringify(usersFound)));
      } else {
        res.status(401);
        res.send(JSON.stringify("You are not authorized to access this page"));
      }
    });
  } else {
    res.send(
      JSON.stringify(
        "Need to be logged in as an Administator to view this page."
      )
    );
  }
});

/*Allows user with Admin privileges to view users information */
router.get("/admin/editUser/:id", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.Admin) {
        let UserId = parseInt(req.params.id);
        if (UserId) {
          models.users.findByPk(parseInt(req.params.id)).then(users => {
            res.send(
              JSON.stringify({
                UserId: users.UserId,
                FirstName: users.FirstName,
                LastName: users.LastName,
                Email: users.Email,
                Username: users.Username
              })
            );
          });
        }
      } else {
        res.send(JSON.stringify("Not authorized to view"));
      }
    });
  } else {
    res.send(JSON.stringify("Admin privileges required"));
  }
});

/*Allows users with admin privileges to delete other users */
router.post("/admin/editUser/:id/delete", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        let UserId = parseInt(req.params.id);
        models.users
          .update(
            {
              Deleted: true
            },
            {
              where: { Userid: UserId }
            }
          )
          .then(result => res.send(JSON.stringify(result)))
          .catch(err => {
            res.status(400);
            res.send(
              JSON.stringify(
                "There was a problem deleting the user. Please make sure you are specifying the correct id."
              )
            );
          });
      }
    });
  }
});

/*logout - resets the date the token time*/

router.get("/logout", function(req, res, next) {
  res.cookie(JSON.stringify("jwt", "", { expires: new Date(0) }));
});

module.exports = router;
