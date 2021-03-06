const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || "3000", () => {
  console.log("Server running at port 3000");
});

// Global varibales
let items = [];
let workList = [];

app.get("/", (req, res) => {
  let day = date.getDate();
  res.render("list", { listName: day, item: items }); 
});

app.post("/", (req, res) => {
  var newItem = req.body.task;
  if (req.body.list === "Work") {
    workList.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});

app.get("/work", (req,res) => {
  res.render("list", { listName: "Work", item: workList });
});
