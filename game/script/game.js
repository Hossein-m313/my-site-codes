import { Ball, Wall } from "./document.js";

const walls = [];

// here the elements that we want to use are taken from html file
const ball_el = document.getElementById("ball");
const playground = document.getElementById("playground");
const walls_el = document.getElementById("walls");

const ground_setting_button = document.getElementById("ground-setting-button");
const shooting_pannel_button = document.getElementById("shooting-pannel-button");
const shooting_pannel = document.getElementById("shooting-pannel");
const ground_setting = document.getElementById("ground-setting");
const shoot_button = document.getElementById("shoot-button");
const reset_button = document.getElementById("reset-button");
const apply_wall_button = document.getElementById("apply-wall-button");
const reset_wall_button = document.getElementById("reset-wall-button");
const inputs = document.querySelectorAll("input");

document.getElementById("gravity").focus();
const playground_wall = new Wall(playground);
playground_wall.ball_handling = "inside";
playground_wall.applyXY = false;

if (window.innerHeight <= playground.clientHeight) playground_wall.begin("25rem", "100vh", -(playground.clientWidth / 2), 0, 0, 0);
else playground_wall.begin(`25rem`, `25rem`, -(playground.clientWidth / 2), 0, 0, 0);

const ball = new Ball(ball_el);
let ball_and_shoot = "";

function resetValues() {
  inputs[0].value = 9.8;
  inputs[1].value = 1;
  inputs[2].value = 1000;
  inputs[3].value = 90;
  inputs[4].value = 5;
}
function resetWallValues() {
  playground_wall.begin("25rem", "25rem", -(playground.clientWidth / 2), 0, 0, 0);
  inputs[5].value = playground.clientWidth;
  inputs[6].value = playground.clientHeight;
}
function resizeWallValues() {
  if (window.innerHeight <= playground.clientHeight) {
    playground_wall.begin("25rem", `${window.innerHeight}px`, -(playground.clientWidth / 2), 0, 0, 0);
    inputs[5].value = playground.clientWidth;
    inputs[6].value = playground.clientHeight;
  } else playground_wall.begin(`${inputs[5].value}px`, `${inputs[6].value}px`, -(inputs[5].value / 2), 0, 0, 0);
}

resetWallValues();
resetValues();

window.addEventListener("resize", (e) => {
  e.preventDefault();
  resizeWallValues();
});
ground_setting_button.addEventListener("click", (e) => {
  e.preventDefault();
  shooting_pannel.style.display = "none";
  ground_setting.style.display = "block";
  document.getElementById("ground-width").focus();
});
reset_wall_button.addEventListener("click", (e) => {
  e.preventDefault();
  resetWallValues();
});
apply_wall_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (window.innerHeight >= Number(inputs[6].value))
    playground_wall.begin(`${inputs[5].value}px`, `${inputs[6].value}px`, -(Number(inputs[5].value) / 2), 0, 0, 0);
  else {
    playground_wall.begin(`${inputs[5].value}px`, `${window.innerHeight}px`, -(Number(inputs[5].value) / 2), 0, 0, 0);
    inputs[6].value = playground.clientWidth;
  }
});

shooting_pannel_button.addEventListener("click", () => {
  shooting_pannel.style.display = "block";
  ground_setting.style.display = "none";
  document.getElementById("gravity").focus();
});
shoot_button.addEventListener("click", async (e) => {
  e.preventDefault();
  if (ball_and_shoot === "ended") {
    ball.g = inputs[0].value;
    ball.m = inputs[1].value;
    ball.t = inputs[4].value;
    ball_and_shoot = "";
    ball_and_shoot = await ball.shoot(inputs[3].value, inputs[2].value, [0, 180]);
  }
});
reset_button.addEventListener("click", (e) => {
  e.preventDefault();
  resetValues();
});

ball_and_shoot = await ball.shoot(90, 1000, [0, 180]);
