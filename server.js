const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 1000 || process.env.PORT;

connectDB();
app.get("/", (req, resp) => {
  resp.json({
    msg: `Welcome to the Contact Keeper API built by Gavin Coulson`,
  });
});
//here I define the routes

app.use(`/api/users`, require("./routes/users"));
app.use(`/api/contacts`, require("./routes/contacts"));
app.use(`/api/auth`, require("./routes/auth"));

app.listen(PORT, (req, resp) => {
  console.log(`server listening on ${PORT}`);
});
