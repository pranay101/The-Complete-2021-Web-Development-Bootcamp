const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { urlencoded } = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running at port 3000");
});


// Global varibales
var items = [];
app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfday: day, item : items });
});

app.post("/", (req, res) => {
  var newItem = req.body.task;
  items.push(newItem)
  res.redirect("/")
});
