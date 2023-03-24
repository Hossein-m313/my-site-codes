const ball_el = document.getElementById("ball");
const playground = document.getElementById("playground");
const walls = document.querySelectorAll(".wall");

const v_walls = [
  [playground.clientWidth / 2 - ball_el.clientWidth / 2, [-ball_el.clientHeight / 2, playground.clientHeight - ball_el.clientHeight / 2]],
  [-playground.clientWidth / 2 + ball_el.clientWidth / 2, [-ball_el.clientHeight / 2, playground.clientHeight - ball_el.clientHeight / 2]],
];
const h_walls = [
  [-ball_el.clientHeight / 2, [-ball_el.clientWidth / 2, playground.clientWidth / 2]],
  [playground.clientHeight - [-ball_el.clientWidth / 2, playground.clientWidth / 2]],
];

// (function renderWalls(){
//   for(let i = 0; i < walls.length; i++){
//     BuildWallUsingElement(walls[i]);
//   }
// })()

// function BuildWallUsingElement(el) {
//   const [ball_width, ball_height] = [ball_el.clientWidth / 2, ball_el.clientHeight / 2];
//   const [ball_x, ball_y] = [ball_el.offsetLeft / 2, ball_el.offsetTop / 2];
//   const [el_width, el_height] = [el.clientWidth / 2, el.clientHeight / 2];
//   const [el_x, el_y] = [el.offsetLeft / 2, el.offsetTop / 2];
//   const [distance_x, distance_y] = [el_x - ball_x - el_width - ball_width, ball_y - el_y - el_height - ball_height];
//   const [distance_x2, distance_y2] = [el_x - ball_x + el_width - ball_width, ball_y - el_y + el_height - ball_height];
//   // v_walls.push([distance_x]);
// }

class Ball {
  constructor(obj) {
    const ball_styles = getComputedStyle(obj);
    this.ball = obj;
    this.g = "15";
    this.m = "1";
    this.t = "0.01";
    this.h = "1";
    this.frame = "0";
    this.pos = [Number(ball_styles.left.slice(0, ball_styles.left.length - 2)), Number(ball_styles.bottom.slice(0, ball_styles.bottom.length - 2))];
    obj.style.transition = `all ${this.t}s linear`;
  }

  setXY = (x, y) => {
    this.ball.style.left = `${x}px`;
    this.ball.style.bottom = `${y}px`;
  };

  sleep = (s) => {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
  };

  shoot = async (angle, power) => {
    this.frame = 1;
    let v = ((this.t * this.frame * power) / this.m) * 100;
    let y = 1;
    let x = 1;
    let v_x = v;
    let v_y = v;
    let befor_x = 0;
    let befor_y = 0;
    let factor_x = 1;
    let relative_x = 0;
    let changed = 0;
    const w = this.m * this.g;
    const radians = ((180 - angle) / 180) * Math.PI;
    const ratio_x = Math.cos(radians) * Math.sign(angle);
    const ratio_y = Math.sin(radians);
    while (y > 0) {
      v_y = v_y - w;
      befor_x = x + this.pos[0];
      befor_y = y;
      x = this.t * this.frame * v_x * ratio_x * factor_x + relative_x * 2;
      y = this.t * this.frame * v_y * ratio_y;
      if (y < 0) y = 0;
      if (changed === 1) changed++;
      for (let j = 0; j < v_walls.length; j++) {
        const i = v_walls[j];
        const [m_x, m_y] = [this.pos[0] + x, this.pos[1] + y];
        if (((m_x <= i[0] && befor_x >= i[0]) || (m_x >= i[0] && befor_x <= i[0])) && m_y >= i[1][0] && m_y <= i[1][1] && changed < 2) {
          factor_x = -factor_x;
          relative_x = -relative_x + x;
          x = i[0];
          changed = 1;
          break;
        }
      }
      if (changed === 2) changed = 0;
      if (y <= 0) {
        this.frame++;
        x = this.t * this.frame * v_x * ratio_x * factor_x + relative_x * 2;
        this.setXY(this.pos[0] + x, this.pos[1] + y);
        await this.sleep(this.t);
        continue;
      }
      if (changed === 1) {
        this.frame++;
        continue;
      }
      this.setXY(this.pos[0] + x, this.pos[1] + y);
      await this.sleep(this.t);
      this.frame++;
    }
    this.pos = [x + this.pos[0], y + this.pos[1]];
    if (power > 10 && factor_x === -1) this.shoot(180 - angle, (power * this.h) / 2);
    else if (power > 10) this.shoot(angle, (power * this.h) / 2);
    else return "ended";
  };
}

const ball = new Ball(ball_el);
ball.shoot(50, 1500);
