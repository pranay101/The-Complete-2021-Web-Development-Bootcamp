const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || "3000", () => {
  console.log("Server running at port 3000");
});

// database shit
mongoose.connect("mongodb://localhost:27017/todoList", {
  useNewUrlParser: true,
});

const itemsSchema = mongoose.Schema({
  task: String,
});

const Items = mongoose.model("item", itemsSchema);

const task1 = new Items({
  task: "Welcome to your todo-list",
});

const item2 = new Items({
  task: "Hit the + button to add new task",
});
const item3 = new Items({
  task: "<-- button to delete the item",
});

const defaultItems = [item1, item3, item3];

Items.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Default Items inserted succesfully. ");
  }
});

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

app.get("/work", (req, res) => {
  res.render("list", { listName: "Work", item: workList });
});
