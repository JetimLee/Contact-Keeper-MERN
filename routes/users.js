const express = require(`express`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    //had been checking for pass here with resp.send('passed')

    const { name, email, password } = req.body;

    //using a try/catch here because I am dealing with the database as well as bcrypt, all of which return promises
    try {
      let user = await User.findOne({ email });
      if (user) {
        return resp.status(400).json({ msg: `User already exists` });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          resp.json({ token });
        }
      );
    } catch (error) {
      console.log(`error ${error.message}`);
      resp.status(500).send(`server error`);
    }
  }
);

//after the router is created you have to be sure to export it, or it won't work
module.exports = router;
