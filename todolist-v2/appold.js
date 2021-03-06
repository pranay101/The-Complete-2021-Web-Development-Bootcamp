//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")




const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose


const itemSchema ={
  task : String
};

const Items = new mongoose.model("Items",itemSchema)

const item1 = new Items({
  task: "Welcome to your todo-list"
})
const item2 = new Items({
  task: "Hit the + button to add new task"
})
const item3 = new Items({
  task: "<-- button to delete the item"
})
 
const defaultItems = [item1,item3,item3];
 
Items.insertMany(defaultItems,  (err)=>{
  if (err) {
    console.log(err);
  }else{
    console.log("Default Items inserted succesfully. ")
  }
});


// routes
app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.get("/data",(req,res) =>{
  res.send(Items.find({},(err,result) =>{
    if(err)
    console.log(err)
    else
    console.log(result)
  }));
})