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
const item1 = new Items({
  task: "Welcome to your todo-list",
});

const item2 = new Items({
  task: "Hit the + button to add new task",
});
const item3 = new Items({
  task: "<-- button to delete the item",
});

const defaultItems = [item1, item3, item3];

const listSchema = new mongoose.Schema({
  name:String,
  items:itemsSchema
})

const List = new mongoose.model("list",listSchema)






app.get("/", (req, res) => {
  let task;
  Items.find({}, "task", (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      
      item1.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("items inserted successfully");
        }
      });
      item2.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("items inserted successfully");
        }
      });
      item3.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("items inserted successfully");
        }
      });
      res.redirect("/");
    } else {
      let day = date.getDate();
      res.render("list", { listName: day, item: result });
    }
  });
});

app.post("/", (req, res) => {
  var newItem = req.body.task;
  const item = new Items({
    task: newItem,
  });

  item.save(); 
  res.redirect("/")
});

app.post("/delete",(req,res)=>{
  const deletethisiD = req.body.checkBox;
  Items.deleteOne({_id:deletethisiD},(err) =>{
    if (err) {
      console.log(err);
    }else{
      console.log("Item deleted sucessfully");
    }
  })
  res.redirect("/");
})

app.get("/category/:newRoute", (req, res) => {
  const customlistname = req.params.newRoute
  const list = new List({
    name:customlistname,
    items:defaultItems
  });
  list.save((err)=>{
    if(err)
    console.log(err)
    else
    console.log("new route created")
  });
});
