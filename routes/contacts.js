const express = require(`express`);

const router = express.Router();

//@route get api/contacts
//@desc get all of the specific users contacts
//@access private
router.get("/", (req, resp) => {
  resp.send(`get all contacts`);
});

//@route post api/contacts
//@desc add new contacts
//@access private
router.post("/", (req, resp) => {
  resp.send(`add contact`);
});

//@route PUT request to to api/contacts/:id
//@desc update contact
//@access private
router.put("/:id", (req, resp) => {
  resp.send(`update contact`);
});

//@route DELETE api/contacts/:id
//@desc delete contact
//@access private
router.delete("/:id", (req, resp) => {
  resp.send(`delete contact`);
});

//after the router is created you have to be sure to export it, or it won't work
module.exports = router;
