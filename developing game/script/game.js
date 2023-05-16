import { Ball, Wall } from "./document.js";

const walls_data = [];
const walls_el = [];

// here the elements that we want to use are taken from html file
const ball_el = document.getElementById("ball");
const playground = document.getElementById("playground");
const walls_el_container = document.getElementById("walls");

const pannel_headers = document.querySelectorAll(".top-form-container");
const input_boxes = document.querySelectorAll(".input-container");
const buttons_container = document.getElementById("buttons-container");
const change_pannel_buttons = document.querySelectorAll(".change-button-container");
const manual_positioning_page = document.getElementById("manual-positioning-page");
const manual_positioning_page_button = document.querySelector("#manual-positioning-page button");

const inputs = document.querySelectorAll("input");
const top_left_button = document.getElementById("top-left-button");
const top_right_button = document.getElementById("top-right-button");
const bottom_left_button = document.getElementById("bottom-left-button");
const bottom_right_button = document.getElementById("bottom-right-button");
const bottom_button_container = document.getElementById("bottom-button-container");

document.getElementById("gravity").focus();
const playground_wall = new Wall(playground);
playground_wall.ball_handling = "inside";
playground_wall.applyXY = false;

let ball_end_shoot = "ended";
let pannel_phase = 2;
let changing_pannel = false;
let current_wall_num = -1;
let wall_manual_positioning = false;
const ball = new Ball(ball_el);
ball.end_function = () => {
  ball_end_shoot = "ended";
};

function generateCurrentWall() {
  walls_el[current_wall_num].begin(
    walls_data[current_wall_num][0],
    walls_data[current_wall_num][1],
    walls_data[current_wall_num][2],
    walls_data[current_wall_num][3],
    walls_data[current_wall_num][4],
    walls_data[current_wall_num][5]
  );
}
function resetShootValues() {
  inputs[0].value = 9.8;
  inputs[1].value = 1;
  inputs[2].value = 1000;
  inputs[3].value = 90;
  inputs[4].value = 5;
}
function resetGroundValues() {
  if (window.innerHeight <= playground.clientHeight) playground_wall.begin("25rem", "100vh", -(playground.clientWidth / 2), 0, 0, 0);
  else playground_wall.begin(`25rem`, `25rem`, -(playground.clientWidth / 2), 0, 0, 0);
  inputs[5].value = playground.clientWidth;
  inputs[6].value = playground.clientHeight;
}
function resizeGroundValues() {
  if (window.innerHeight <= playground.clientHeight) {
    playground_wall.begin("25rem", `${window.innerHeight}px`, -(playground.clientWidth / 2), 0, 0, 0);
    inputs[5].value = playground.clientWidth;
    inputs[6].value = playground.clientHeight;
  } else playground_wall.begin(`${inputs[5].value}px`, `${inputs[6].value}px`, -(inputs[5].value / 2), 0, 0, 0);
}
function resetWallValues() {
  if (current_wall_num >= 0) {
    inputs[7].value = 80;
    inputs[8].value = 80;
    inputs[9].value = -40;
    inputs[10].value = 50;
    inputs[11].value = 0;
    walls_data[current_wall_num] = ["80px", "80px", -40, 50, 0, 0];
    generateCurrentWall();
  }
}
function generatePannel(new_phase) {
  input_boxes[pannel_phase - 1].style.height = "0";
  if (pannel_phase < 3) change_pannel_buttons[pannel_phase - 1].classList.add("change-button-container-default-height");
  pannel_headers[pannel_phase - 1].style.opacity = "0";
  buttons_container.style.opacity = "0";
  changing_pannel = true;
  if (new_phase === 1) {
    bottom_button_container.style.visibility = "hidden";
  }
  window.clearTimeout();
  setTimeout(() => {
    if (new_phase === 1) {
      buttons_container.style.height = "2rem";
      top_left_button.innerText = "shoot";
    } else if (new_phase === 2) {
      buttons_container.style.height = "calc(4rem + 10px)";
      bottom_left_button.innerText = "walls list";
      bottom_right_button.innerText = "creat new wall";
      bottom_button_container.style.visibility = "visible";
      top_left_button.innerText = "apply";
    } else if (new_phase === 3) {
      bottom_right_button.innerText = "creat the wall";
      bottom_left_button.innerText = "manual positioning";
      top_left_button.innerText = "apply";
    }
    pannel_headers[new_phase - 1].style.display = "flex";
    pannel_headers[pannel_phase - 1].style.display = "none";
    change_pannel_buttons[pannel_phase - 1].classList.remove("change-button-container-default-height");
    if (new_phase === 1) input_boxes[0].style.height = "calc(10rem + 40px)";
    if (new_phase === 2) input_boxes[1].style.height = "calc(4rem + 10px)";
    if (new_phase === 3) input_boxes[2].style.height = "calc(10rem + 40px)";
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
resetWallValues();

window.addEventListener("resize", (e) => {
  e.preventDefault();
  resizeGroundValues();
});
top_right_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (pannel_phase === 1) {
    resetShootValues();
  } else if (pannel_phase === 2) {
    resetGroundValues();
  } else if (pannel_phase === 3) {
    resetWallValues();
  }
});
top_left_button.addEventListener("click", async (e) => {
  e.preventDefault();
  if (pannel_phase === 1 && ball_end_shoot === "ended") {
    ball.g = inputs[0].value;
    ball.m = inputs[1].value;
    ball.t = inputs[4].value;
    ball_end_shoot = "";
    ball.shoot(inputs[3].value, inputs[2].value, [0, 180]);
  } else if (pannel_phase === 2) {
    if (Number(inputs[5].value) < ball_el.clientWidth + 10) inputs[5].value = ball_el.clientWidth + 10;
    if (Number(inputs[6].value) < ball_el.clientHeight + 10) inputs[6].value = ball_el.clientHeight + 10;
    if (window.innerHeight >= Number(inputs[6].value))
      playground_wall.begin(`${inputs[5].value}px`, `${inputs[6].value}px`, -(Number(inputs[5].value) / 2), 0, 0, 0);
    else {
      playground_wall.begin(`${inputs[5].value}px`, `${window.innerHeight}px`, -(Number(inputs[5].value) / 2), 0, 0, 0);
      inputs[6].value = playground.clientWidth;
    }
  } else if (pannel_phase === 3) {
    walls_data[current_wall_num] = [`${inputs[7].value}px`, `${inputs[8].value}px`, Number(inputs[9].value), Number(inputs[10].value), 0, Number(inputs[11].value)];
    generateCurrentWall();
  }
});
bottom_right_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (ball_end_shoot === "ended" && pannel_phase === 2 && !changing_pannel) {
    const wall_el = document.createElement("div");
    current_wall_num = current_wall_num + 1;
    wall_el.className = "wall";
    wall_el.id = `wall-${current_wall_num}`;
    walls_el_container.appendChild(wall_el);

    const wall = new Wall(wall_el);
    walls_data.push([]);
    walls_el.push(wall);
    resetWallValues();
    let is_mouse_clicked = false;
    let first_turn = true;
    let clicked_pos = [];
    let plus_pos = [];

    wall_el.addEventListener("mousedown", () => {
      if (wall_manual_positioning) is_mouse_clicked = true;
    });
    wall_el.addEventListener("mouseup", () => {
      if (wall_manual_positioning) {
        is_mouse_clicked = false;
        first_turn = true;
      }
    });
    playground.addEventListener("mouseleave", () => {
      if (wall_manual_positioning) {
        is_mouse_clicked = false;
        first_turn = true;
      }
    });
    playground.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (wall_manual_positioning && is_mouse_clicked) {
        var x = e.pageX - e.currentTarget.offsetLeft;
        var y = e.pageY - e.currentTarget.offsetTop;
        if (first_turn) {
          plus_pos = [walls_data[current_wall_num][2], walls_data[current_wall_num][3]];
          clicked_pos = [x, y];
          first_turn = false;
        }
        var rx = x - clicked_pos[0] + plus_pos[0];
        var ry = clicked_pos[1] - y + plus_pos[1];
        inputs[9].value = rx;
        inputs[10].value = ry;
        walls_data[current_wall_num][2] = rx;
        walls_data[current_wall_num][3] = ry;
        generateCurrentWall(wall);
      }
    });

    generatePannel(3);
  } else if (ball_end_shoot === "ended" && pannel_phase === 3) {
  }
});
bottom_left_button.addEventListener("click", (e) => {
  e.preventDefault();
  if (pannel_phase === 2) {
  } else if (pannel_phase === 3) {
    walls_el[current_wall_num].wall.style.animation = "wall-in 1s forwards";
    walls_el[current_wall_num].wall.style.cursor = "move";
    manual_positioning_page.style.animation = "open-manual-positioning-page 1s forwards";
    wall_manual_positioning = true;
  }
});
manual_positioning_page_button.addEventListener("click", () => {
  walls_el[current_wall_num].wall.style.animation = "wall-out 1s forwards";
  walls_el[current_wall_num].wall.style.cursor = "default";
  manual_positioning_page.style.animation = "close-manual-positioning-page 1s forwards";
  wall_manual_positioning = false;
});

change_pannel_buttons[0].addEventListener("click", (e) => {
  e.preventDefault();
  if (!changing_pannel) generatePannel(2);
});
change_pannel_buttons[1].addEventListener("click", (e) => {
  e.preventDefault();
  if (!changing_pannel) generatePannel(1);
});
change_pannel_buttons[2].addEventListener("click", (e) => {
  e.preventDefault();
  if (!changing_pannel) generatePannel(2);
});

// ball.shoot(90, 1000, [0, 180]);
