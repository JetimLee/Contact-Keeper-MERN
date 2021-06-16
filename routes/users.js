const express = require(`express`);

const router = express.Router();

const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//general good practice to put a signature to all of your routes so that you know what they do
//@route POST api/users
//@desc this will register a user
//@access public - this is to become a user
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    resp.send("passed");
  }
);

//after the router is created you have to be sure to export it, or it won't work
module.exports = router;
