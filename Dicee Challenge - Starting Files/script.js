var random1, random2;
random1 = Math.ceil(Math.random(1, 7) * 6);
random2 = Math.ceil(Math.random(1, 7) * 6);

var name_dice_1 = "./images/" + "dice" + random1 + ".png";
var name_dice_2 = "./images/" + "dice" + random2 + ".png";

console.log(name_dice_1);
console.log(name_dice_2);

document.getElementById("img1").setAttribute("src", name_dice_1);
document.getElementById("img2").setAttribute("src", name_dice_2);

if (random1 > random2) {
  document.querySelector("h1").textContent = "Player 1 won";
}
else if (random1 < random2) {
  document.querySelector("h1").textContent = "Player 2 won";
} else {
  document.querySelector("h1").textContent = "Match tied";
}
