const express = require("express");
var router = express.Router();

const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  User({
    username,
  })
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

function validate_request_params(params) {
  if (params.id.length != 24) {
    return "No a valid request!!";
  }
}

router.delete("/:id", (req, res) => {
  validate = [];
  validate["error"] = validate_request_params(req.params);
  if (validate["error"]) res.json(validate["error"]);

  User.findByIdAndDelete(req.params.id)
    .then((err) => {
      if (err != null) res.json("User Deleted!!");
      else res.json("No data found!!");
    })
    .catch((err) => {
      res.status(400).json("Error:" + err);
      console.log(err);
    });
});

router.put("/update/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (req.body.username) user.username = req.body.username;

      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) =>
      res.status(400).json("Error Occured while updating:" + err)
    );
});

module.exports = router;
