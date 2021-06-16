const express = require(`express`);

const router = express.Router();

//general good practice to put a signature to all of your routes so that you know what they do
//@route POST api/users
//@desc this will register a user
//@access public - this is to become a user
router.post("/", (req, resp) => {
  resp.send(`Registers a user`);
});

//after the router is created you have to be sure to export it, or it won't work
module.exports = router;
