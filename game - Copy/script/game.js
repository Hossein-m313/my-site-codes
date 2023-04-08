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
const creat_wall_button = document.getElementById("creat-wall-button");
const inputs = document.querySelectorAll("input");

document.getElementById("gravity").focus();
const playground_wall = new Wall(playground);
playground_wall.ball_handling = "inside";
playground_wall.applyXY = false;

if (window.innerHeight <= playground.clientHeight) playground_wall.begin("25rem", "100vh", -(playground.clientWidth / 2), 0, 0, 0);
else playground_wall.begin(`25rem`, `25rem`, -(playground.clientWidth / 2), 0, 0, 0);

const ball = new Ball(ball_el);
let ball_and_shoot = "";

function generateWalls(element, i) {
  const wall = new Wall(element);
  wall.begin(walls[i][0], walls[i][1], walls[i][2], walls[i][3], walls[i][4], walls[i][5]);
}
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
creat_wall_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (ball_and_shoot === "ended") {

    const wall_el = document.createElement("div");
    const wall_number = walls.length + 1;
    wall_el.className = "wall";
    wall_el.id = `wall-${wall_number}`;
    wall_el.style.cursor = "move";
    wall_el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/></svg>`;
    walls_el.appendChild(wall_el);

    walls.push(["5rem", "5rem", 0, 0, 0, 0]);
    generateWalls(wall_el, wall_number - 1);
    let is_mouse_clicked = false;
    let first_turn = true;
    let clicked_pos = [];
    let plus_pos = [];

    wall_el.addEventListener("mouseenter", () => {
      document.querySelector(`#wall-${wall_number} svg path`).style.fill = "white";
    });
    wall_el.addEventListener("mouseleave", () => {
      document.querySelector(`#wall-${wall_number} svg path`).style.fill = "black";
    });
    wall_el.addEventListener("mousedown", () => {
      wall_el.style.cursor = "none";
      playground.style.cursor = "none";
      is_mouse_clicked = true;
    });
    wall_el.addEventListener("mouseup", (e) => {
      wall_el.style.cursor = "move";
      playground.style.cursor = "default";
      is_mouse_clicked = false;
      first_turn = true;
    });
    playground.addEventListener("mouseleave", () => {
      wall_el.style.cursor = "move";
      playground.style.cursor = "default";
      is_mouse_clicked = false;
      first_turn = true;
    });
    playground.addEventListener("mousemove", (e) => {
      if (is_mouse_clicked) {
        var x = e.pageX - e.currentTarget.offsetLeft;
        var y = e.pageY - e.currentTarget.offsetTop;
        if (first_turn) {
          plus_pos = [walls[wall_number - 1][2], walls[wall_number - 1][3]];
          clicked_pos = [x, y];
          first_turn = false;
        }
        walls[wall_number - 1] = ["5rem", "5rem", x - clicked_pos[0] + plus_pos[0], clicked_pos[1] - y + plus_pos[1], 0, 0];
        generateWalls(wall_el, wall_number - 1);
      }
    });

    const labels = document.querySelectorAll(".ground-label");
    labels[0].style.opacity = "0";
    labels[1].style.opacity = "0";
    creat_wall_button.style.transition = 'all 1s';
    creat_wall_button.style.opacity = '0';
    apply_wall_button.style.transition = 'all 1s';
    apply_wall_button.style.opacity = '0';
    setTimeout(() => {
      labels[0].innerText = "wall width (px) :";
      labels[1].innerText = "wall width (px) :";
      labels[0].style.opacity = "1";
      labels[1].style.opacity = "1";
      creat_wall_button.style.padding = '0 20px';
      creat_wall_button.style.margin = '0';
      creat_wall_button.style.height = '0';
      apply_wall_button.style.margin = '0';
      apply_wall_button.style.width = '0';
    }, 1000);
    setTimeout(() => {
      creat_wall_button.style.transition = 'all 0.5s';
      // creat_wall_button.style.display = 'none';
    }, 1000);
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
