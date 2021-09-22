const express = require("express");
const bodyParser = require("body-parser");

//elemeantry
const app = express();
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  res.send("The sum of given two number is :" + (num1 + num2));
});

app.listen("3000", () => {
  console.log("Listening on port 3000");
});
