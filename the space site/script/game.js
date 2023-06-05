import { Ball, Wall } from "./document.js";

// here the elements that we want to use are taken from html file
const ball_el = document.getElementById("ball");
const playground = document.getElementById("playground");

const pannel_headers = document.querySelectorAll(".top-form-container");
const input_boxes = document.querySelectorAll(".input-container");
const buttons_container = document.getElementById("buttons-container");
const change_pannel_buttons = document.querySelectorAll(
  ".change-button-container"
);

const inputs = document.querySelectorAll("input");
const down_gravity_icon = document.getElementById("planet-down-icon");
const planets_container = document.querySelector(
  "#planet-gravities .container"
);
const planets = document.querySelectorAll("#planet-gravities .container div");
const gravity_input = document.getElementById("gravity");
const left_button = document.getElementById("left-button");
const right_button = document.getElementById("right-button");

document.getElementById("gravity").focus();
const playground_wall = new Wall(playground);
playground_wall.ball_handling = "inside";
playground_wall.applyXY = false;

let ball_end_shoot = "ended";
let pannel_phase = 1;
let changing_pannel = false;
let is_planet_page_open = false;
const ball = new Ball(ball_el);
ball.rotate = false;
ball.end_function = () => {
  ball_end_shoot = "ended";
};

function resetShootValues() {
  inputs[0].value = 9.807;
  inputs[1].value = 1;
  inputs[2].value = 1000;
  inputs[3].value = 90;
  inputs[4].value = 5;
}
function resetGroundValues() {
  if (window.innerHeight <= playground.clientHeight)
    playground_wall.begin(
      "25rem",
      "100vh",
      -(playground.clientWidth / 2),
      0,
      0,
      0
    );
  else
    playground_wall.begin(
      `25rem`,
      `25rem`,
      -(playground.clientWidth / 2),
      0,
      0,
      0
    );
  inputs[5].value = playground.clientWidth;
  inputs[6].value = playground.clientHeight;
}
function resizeGroundValues() {
  if (window.innerHeight <= playground.clientHeight) {
    playground_wall.begin(
      "25rem",
      `${window.innerHeight}px`,
      -(playground.clientWidth / 2),
      0,
      0,
      0
    );
    inputs[5].value = playground.clientWidth;
    inputs[6].value = playground.clientHeight;
  } else
    playground_wall.begin(
      `${inputs[5].value}px`,
      `${inputs[6].value}px`,
      -(inputs[5].value / 2),
      0,
      0,
      0
    );
}
function generatePannel(new_phase) {
  changing_pannel = true;
  input_boxes[pannel_phase - 1].style.height = "0";
  change_pannel_buttons[pannel_phase - 1].classList.add(
    "change-button-container-default-height"
  );
  pannel_headers[pannel_phase - 1].style.opacity = "0";
  buttons_container.style.opacity = "0";
  window.clearTimeout();
  setTimeout(() => {
    if (new_phase === 1) {
      left_button.innerText = "شوت";
    } else if (new_phase === 2) {
      left_button.innerText = "اعمال";
    }
    pannel_headers[new_phase - 1].style.display = "flex";
    pannel_headers[pannel_phase - 1].style.display = "none";
    change_pannel_buttons[pannel_phase - 1].classList.remove(
      "change-button-container-default-height"
    );
    if (new_phase === 1) input_boxes[0].style.height = "calc(10rem + 40px)";
    if (new_phase === 2) input_boxes[1].style.height = "calc(4rem + 10px)";
    buttons_container.style.opacity = "1";
  }, 1400);
  setTimeout(() => {
    pannel_headers[new_phase - 1].style.opacity = "1";
  }, 1500);
  setTimeout(() => {
    changing_pannel = false;
    pannel_phase = new_phase;
  }, 2500);
}

resetGroundValues();
resetShootValues();

window.addEventListener("resize", (e) => {
  e.preventDefault();
  resizeGroundValues();
});
right_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (pannel_phase === 1) {
    resetShootValues();
  } else if (pannel_phase === 2) {
    resetGroundValues();
  }
});
left_button.addEventListener("click", async (e) => {
  e.preventDefault();
  if (pannel_phase === 1 && ball_end_shoot === "ended") {
    ball.g = inputs[0].value;
    ball.m = inputs[1].value;
    ball.t = inputs[4].value;
    ball_end_shoot = "";
    ball.shoot(inputs[3].value, inputs[2].value, [0, 180]);
  } else if (pannel_phase === 2) {
    if (Number(inputs[5].value) < ball_el.clientWidth + 10)
      inputs[5].value = ball_el.clientWidth + 10;
    if (Number(inputs[6].value) < ball_el.clientHeight + 10)
      inputs[6].value = ball_el.clientHeight + 10;
    if (window.innerHeight >= Number(inputs[6].value))
      playground_wall.begin(
        `${inputs[5].value}px`,
        `${inputs[6].value}px`,
        -(Number(inputs[5].value) / 2),
        0,
        0,
        0
      );
    else {
      playground_wall.begin(
        `${inputs[5].value}px`,
        `${window.innerHeight}px`,
        -(Number(inputs[5].value) / 2),
        0,
        0,
        0
      );
      inputs[6].value = playground.clientWidth;
    }
  }
});

change_pannel_buttons[0].addEventListener("click", (e) => {
  e.preventDefault();
  if (!changing_pannel) generatePannel(2);
});
change_pannel_buttons[1].addEventListener("click", (e) => {
  e.preventDefault();
  if (!changing_pannel) generatePannel(1);
});
down_gravity_icon.addEventListener("click", () => {
  if (is_planet_page_open) {
    planets_container.style.display = "none";
    down_gravity_icon.style.rotate = "0deg";
    is_planet_page_open = false;
  } else {
    planets_container.style.display = "grid";
    down_gravity_icon.style.rotate = "180deg";
    is_planet_page_open = true;
  }
});
planets.forEach((item) => {
  item.addEventListener("click", (e) => {
    var result = item.childNodes[5].innerText;
    result = result.slice(0, result.length - 2);
    gravity_input.value = Number(result);
  });
});

setTimeout(() => {
  document.getElementById("planet-guide").style.display = "none";
}, 4500);

ball.shoot(90, 1000, [0, 180]);
