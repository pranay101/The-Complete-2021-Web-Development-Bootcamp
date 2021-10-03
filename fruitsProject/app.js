const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitDB", {
  useNewUrlParser: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = new mongoose.model("person", personSchema);

const person = new Person({
  name: "Jhon",
  age: 20,
});

