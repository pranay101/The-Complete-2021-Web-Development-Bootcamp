const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitDB", {
  useNewUrlParser: true,
});

// fruits
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: Number,
});

const Fruit = new mongoose.model("fruit", fruitSchema);
const pineapple = new Fruit({
  name: "pineapple",
  rating: 10,
});
pineapple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favrouiteFruit: fruitSchema,
});

const Person = new mongoose.model("person", personSchema);

const person = new Person({
  name: "jhon",
  age: 21,
  favrouiteFruit: pineapple,
});

person.save(function(err) {
  console.log('this fires after the `post` hook');
});
