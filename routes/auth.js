const express = require(`express`);

const router = express.Router();

//@route GET api/auth
//@desc get logged in user
//@access private - getting a user that's logged in
router.get("/", (req, resp) => {
  resp.send(`get logged in user`);
});

//@route post api/auth
//@desc auth user, receive JWT
//@access public - so you can get authenticated and access private routes
router.post("/", (req, resp) => {
  resp.send(`log in user`);
});

//after the router is created you have to be sure to export it, or it won't work
module.exports = router;
