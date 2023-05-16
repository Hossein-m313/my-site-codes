import { Ball, Wall, Text, sleep } from "./document.js";

const ball_el = document.getElementById("ball");
const wall_el = document.getElementById("ground");
const text_box = document.getElementById("text-box");
const text_animation_container = document.getElementById("text-animation-container");

const speek_list = [
  "Do you want to know me?",
  "I'm a gravity simulator",
  "Someone named Hossein wrote me",
  "I have an advanced mechanism",
  "I will be completed soon ; )",
  "But overall, I hope you like me",
  "Bye : )",
];
const ball = new Ball(ball_el);
const wall = new Wall(wall_el);

wall.applyXY = false;
wall.begin("120px", "4px", -60, 0, 4, 0);

ball.rotate = true;
ball.is_return_power_equal = true;
ball.t = "10";
ball.shoot(90, 700, [0, 180]);

if (localStorage.getItem("start") !== "set") {
  (async function startTextAnimation() {
    const text = new Text();
    await text.initial(text_box, speek_list[0]);
    for (let i = 1; i < speek_list.length; i++) {
      await sleep(1000);
      await text.show(speek_list[i]);
    }
    localStorage.setItem("start", "set");
    text_animation_container.style.animation = "close-text-animation 2s forwards";
    await sleep(2000);
    text_animation_container.style.display = "none";
  })();
} else {
  text_animation_container.style.animation = "close-text-animation 2s forwards";
}
