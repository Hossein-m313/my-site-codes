const ball_el = document.getElementById("ball");
const playground = document.getElementById("playground");
const walls_el = document.querySelectorAll(".wall");

const walls = [];

function plus(value1, plus) {
  return (Math.abs(value1) + plus) * Math.sign(value1);
}

class Wall {
  constructor(obj) {
    this.left_bottom_point = [];
    this.right_bottom_point = [];
    this.left_top_point = [];
    this.right_top_point = [];
    this.left_line_slope = 0;
    this.right_line_slope = 0;
    this.top_line_slope = 0;
    this.bottom_line_slope = 0;
    this.wall = obj;
  }

  begin = (x, y, border_radius, angle) => {
    const slopeCalc = (point1, point2) => {
      return (point1[1] - point2[1]) / (point1[0] - point2[0]);
    };
    const handleLine = (point_1, point_2, m_point, b_m_point, slope) => {
      const checkCoordinates = (p1, p2, point) => {
        return (
          ((p1[0] <= point[0] && point[0] <= p2[0]) || (p1[0] >= point[0] && point[0] >= p2[0])) &&
          ((p1[1] <= point[1] && point[1] <= p2[1]) || (p1[1] >= point[1] && point[1] >= p2[1]))
        );
      };
      const getGratterAndSmaller = (p1, p2) => {
        const s = [];
        const g = [];
        if (p1[0] >= p2[0]) {
          g.push(p1[0]);
          s.push(p2[0]);
        } else {
          g.push(p2[0]);
          s.push(p1[0]);
        }
        if (p1[1] >= p2[1]) {
          g.push(p1[1]);
          s.push(p2[1]);
        } else {
          g.push(p2[1]);
          s.push(p1[1]);
        }
        return [s, g];
      };
      const handleAngle = (angle) => {
        if (angle > 180) return angle - 360;
        else if (angle < -180) return angle + 360;
        else return angle;
      };
      const [m_s, m_g] = getGratterAndSmaller(m_point, b_m_point);
      const [p_s, p_g] = getGratterAndSmaller(point_1, point_2);
      const angle = (Math.atan2(m_point[0] - b_m_point[0], m_point[1] - b_m_point[1]) * 180) / Math.PI + 90;
      const m_angle = (Math.atan2(point_2[0] - point_1[0], point_2[1] - point_1[1]) * 180) / Math.PI + 90;
      // console.log(m_g, m_s, p_g, p_s);
      if (checkCoordinates(point_1, point_2, m_point) || checkCoordinates(point_1, point_2, b_m_point)) {
        // console.log(1);
        const m_slope = slopeCalc(m_point, point_2);
        const b_m_slope = slopeCalc(b_m_point, point_2);
        // console.log(slope, m_slope, b_m_slope);
        if ((m_slope <= slope && slope <= b_m_slope) || (m_slope >= slope && slope >= b_m_slope)) return handleAngle(m_angle * 2 - angle);
        else return false;
      } else if (
        (m_g[0] >= p_g[0] && m_s[0] <= p_s[0] && m_g[1] <= p_g[1] && m_s[1] >= p_s[1]) ||
        (m_g[1] >= p_g[1] && m_s[1] <= p_s[1] && m_g[0] <= p_g[0] && m_s[0] >= p_s[0])
      ) {
        return handleAngle(m_angle * 2 - angle);
      } else return false;
    };

    this.wall.style.left = `${x}px`;
    this.wall.style.bottom = `${y}px`;
    this.wall.style.borderRadius = `${border_radius}px`;
    this.wall.style.transform = `rotate(${angle}deg)`;

    const width = this.wall.clientWidth;
    const height = this.wall.clientHeight;
    const diameter = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const angle2 = Math.atan2(width, height) + (angle * Math.PI) / 180;

    this.left_bottom_point = [x, y];
    this.right_bottom_point = [
      Math.round(Math.cos((angle / 180) * Math.PI) * width * 1000) / 1000 + x,
      -Math.round(Math.sin((angle / 180) * Math.PI) * width * 1000) / 1000 + y,
    ];
    this.left_top_point = [
      Math.round(Math.sin((angle / 180) * Math.PI) * height * 1000) / 1000 + x,
      Math.round(Math.cos((angle / 180) * Math.PI) * height * 1000) / 1000 + y,
    ];
    this.right_top_point = [Math.round(Math.sin(angle2) * diameter * 1000) / 1000 + x, Math.round(Math.cos(angle2) * diameter * 1000) / 1000 + y];

    this.left_line_slope = slopeCalc(this.left_bottom_point, this.left_top_point);
    this.right_line_slope = slopeCalc(this.right_bottom_point, this.right_top_point);
    this.top_line_slope = slopeCalc(this.right_top_point, this.left_top_point);
    this.bottom_line_slope = slopeCalc(this.left_bottom_point, this.right_bottom_point);

    walls.push((x_el, y_el, b_x, b_y, b_h, b_w) => {
      const left_line_handled = handleLine(this.left_bottom_point, this.left_top_point, [x_el, y_el], [b_x, b_y], this.left_line_slope);
      const right_line_handled = handleLine(this.right_bottom_point, this.right_top_point, [x_el, y_el], [b_x, b_y], this.right_line_slope);
      const top_line_handled = handleLine(this.right_top_point, this.left_top_point, [x_el, y_el], [b_x, b_y], this.top_line_slope);
      const bottom_line_handled = handleLine(this.left_bottom_point, this.right_bottom_point, [x_el, y_el], [b_x, b_y], this.bottom_line_slope);

      if (left_line_handled) return left_line_handled;
      else if (right_line_handled) return right_line_handled;
      else if (top_line_handled) return top_line_handled;
      else if (bottom_line_handled) return bottom_line_handled;
      else return false;
    });
  };
}

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

  shoot = async (angle, power, frame) => {
    this.frame = frame;
    let v = ((this.t * this.frame * power) / this.m) * 100;
    let y = 1;
    let x = 1;
    let b_x = 0;
    let b_y = 0;
    let v_x = v;
    let v_y = v;
    let n_angle = 0;
    const w = this.m * this.g;
    const radians = ((180 - angle) / 180) * Math.PI;
    const ratio_x = Math.cos(radians) * Math.sign(angle);
    const ratio_y = Math.sin(radians);
    while (y > 0) {
      v_y = v_y - w;
      b_x = x;
      b_y = y;
      x = this.t * this.frame * v_x * ratio_x;
      y = this.t * this.frame * v_y * ratio_y;
      if (y < 0) y = 0;
      for (let j = 0; j < walls.length; j++) {
        const [rx, ry, brx, bry] = [x + this.pos[0], y + this.pos[1], b_x + this.pos[0], b_y + this.pos[1]];
        n_angle = walls[j](rx, ry, brx, bry, this.ball.clientHeight, this.ball.clientWidth);
        if (n_angle) {
          this.pos = [x + this.pos[0], y + this.pos[1]];
          console.log(n_angle);
          throw "invalid input";
          break;
        }
      }
      if (n_angle) break;
      else {
        this.setXY(this.pos[0] + x, this.pos[1] + y);
        await this.sleep(this.t);
        this.frame++;
      }
    }
    if (n_angle) this.shoot(n_angle, (power * this.h) / 2, 1);
    else {
      this.pos = [x + this.pos[0], y + this.pos[1]];
      if (power > 10) this.shoot(angle, (power * this.h) / 2, 1);
      else return "ended";
    }
  };
}

(function () {
  for (let i = 0; i < walls_el.length; i++) {
    new Wall(walls_el[i]).begin(100, 100, 0, 0);
  }
})();
const playground_wall = new Wall(playground);
// playground_wall.begin(0, 0, 0);
const ball = new Ball(ball_el);
// ball.shoot(100, 1200, 1);
window.addEventListener("resize", () => {
  playground_wall.begin(0, 0, 0);
});
