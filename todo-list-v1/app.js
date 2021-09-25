const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { urlencoded } = require("body-parser");

const app = express();
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running at port 3000");
});

app.get("/", (req, res) => {
  console.log("rendered index");
  res.render("index");
});

app.post("/", (req, res) => {
  console.log("rendered greet");
  console.log(req.body.name);
  res.render("greet", { name: req.body.name });
});
