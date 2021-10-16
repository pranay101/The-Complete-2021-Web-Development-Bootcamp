//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();
mongoose.connect("mongodb://localhost:27017/userDB");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userSchema = new mongoose.Schema(
    { 
        username: String, 
        password: String 
    })


const secret = "thisisoursecretsstring"  
userSchema.plugin(encrypt,{secret:secret, encryptedFields:['password']});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

// post request

app.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser.save((err) => {
    if (!err) {
      res.send("User registered successfully!!!");
    } else res.send(err);
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser.password === password) {
        res.render("secrets");
      }
    }
  });
});
app.listen("3000", (req, res) => {
  console.log("Server running at port 3000");
});
