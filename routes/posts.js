const express = require("express");
const router = express.Router();
const models = require("../models");
const authService = require("../services/auth");

/* GET posts */
router.get("/", function(req, res, next) {
  models.posts
    .findAll({
      where: { Deleted: false }
    })
    .then(results => res.send(JSON.stringify({ posts: results })));
});

/*Create and post to posts-forum */
router.post("/", function(req, res, next) {
  let UserId = req.params.id;
  models.posts
    .findOrCreate({
      where: {
        UserId: UserId
      },
      defaults: {
        PostTitle: req.body.title,
        PostBody: req.body.body
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send(JSON.stringify(created));
      } else {
        res.send(JSON.stringify("post failed"));
      }
    });
});

router.delete("/:id/delete", function(req, res, next) {
  let PostId = parseInt(req.params.id);
  models.posts
    .update(
      {
        Deleted: true
      },
      {
        where: { PostId: PostId }
      }
    )
    .then(result =>
      res.send(JSON.stringify(result)).catch(err => {
        res.status(400);
        res.send(
          JSON.stringify(
            "There was a problem deleting the post. Please make sure you are specifying the correct id."
          )
        );
      })
    );
});

router.post("/:id/update", function(req, res, next) {
  let PostId = parseInt(req.params.id);
  models.posts
    .update(
      {
        PostTitle: req.body.title,
        PostBody: req.body.body
      },
      {
        where: { PostId: PostId }
      }
    )
    .then(result => res.send(JSON.stringify(result)))
    .catch(err => {
      res.status(400);
      res.send(
        JSON.stringify(
          "There was a problem updating the post. Please make sure you are specifying the correct id."
        )
      );
    });
});
module.exports = router;
