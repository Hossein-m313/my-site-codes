//
// some explanations about the angle system used in the coordinate table:
// in this project, I am using a different and self-made angle system
// this angle system is :
// from 0 to 90 in zone 1 ,
// from 90 to 180 in zone 2 ,
// from 0 to -90 in zone 4 and
// from -90 to -180 in zone 3
//
// -------------------------------------------------------------------------------------------------------------------

// here is a list of methods for checking ball contact with the wall of all walls
const walls = [];

function mathOperation(value1, sign, value2) {
  // this function add or minus a value to another value and return it
  // (without considering + and -)
  if (sign === "+") return (Math.abs(value1) + value2) * Math.sign(value1);
  if (sign === "-") return (Math.abs(value1) - value2) * Math.sign(value1);
}
function handleAngle(angle) {
  // this function is used to handle angle overflow
  if (angle > 180) return angle - 360;
  else if (angle < -180) return angle + 360;
  else return angle;
}
function sleep(ms) {
  // this function just return a promise to cause a delay
  window.clearTimeout();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Text {
  constructor() {
    this.color = "aliceblue";
    this.size = "5vw";
    this.open_animation_name = "open-text-animation";
    this.close_animation_name = "close-text-animation";
    this.flashing_animation = "flashing_animation";
    this.show_time = 2000;
    this.p_el = null;
  }

  show = async (text) => {
    let made_text = "";
    for (let i = 0; i < text.length; i++) {
      made_text += text[i];
      this.p_el.innerText = made_text;
      await sleep(70);
    }

    await sleep(this.show_time);

    made_text = text;
    for (let i = 0; i < text.length; i++) {
      made_text = made_text.slice(0, made_text.length - 1);
      this.p_el.innerText = made_text;
      await sleep(70);
    }
    return "ended";
  };

  initial = async (parent_el, text) => {
    const p_el = document.createElement("p");
    const shadow_box = document.createElement("div");
    const cursor = document.createElement("span");

    this.p_el = p_el;
    p_el.style.color = this.color;
    p_el.style.fontSize = this.size;
    p_el.style.textAlign = "center";
    p_el.style.whiteSpace = "pre";
    p_el.innerText = text;
    cursor.style.color = this.color;
    cursor.style.fontSize = this.size;
    cursor.style.whiteSpace = "pre";
    cursor.innerText = " _";

    shadow_box.style.width = "100%";
    shadow_box.style.height = "80%";
    shadow_box.style.borderRadius = "100%";
    shadow_box.style.position = "absolute";
    shadow_box.style.backgroundColor = "rgba(50, 200, 255, 0.5)";
    shadow_box.style.filter = `blur(${Math.round(5 + text.length / 5)}0px)`;

    parent_el.appendChild(shadow_box);
    parent_el.appendChild(p_el);
    parent_el.appendChild(cursor);
    parent_el.style.animation = `${this.open_animation_name} 2s forwards`;

    cursor.style.animation = `${this.flashing_animation} 1s infinite`;

    let made_text = "";
    for (let i = 0; i < text.length; i++) {
      made_text += text[i];
      p_el.innerText = made_text;
      await sleep(70);
    }

    await sleep(this.show_time);

    made_text = text;
    for (let i = 0; i < text.length; i++) {
      made_text = made_text.slice(0, made_text.length - 1);
      p_el.innerText = made_text;
      await sleep(70);
    }
    return "ended";
  };
}

class Ball {
  // this is the class with it you can create a ball

  constructor(element) {
    // here are all the ball styles received
    const ball_styles = getComputedStyle(element);

    // here a variable is defiend for ball element
    this.ball = element;

    // here some variables are defined :
    // gravity
    this.g = 9.8;

    // mass
    this.m = 1;

    // Duration of each frame
    this.t = 5;

    // used to handle overflow of shoot function calls
    this.shoot_overflow_handler = 0;

    // if this is true the ball will spin while moving and if not this will not happen
    this.rotate = true;

    // this is to control the rotating of the ball
    this.rotation = 0;

    // here a variable is defined for the ball position;
    this.pos = [Number(ball_styles.left.slice(0, ball_styles.left.length - 2)), Number(ball_styles.bottom.slice(0, ball_styles.bottom.length - 2))];

    // if this is true, the force of the return shot is equal to the force of the previous shot, and if not, no
    this.is_return_power_equal = false;

    // this is used for calculating the return shoot power
    this.return_power = 100;

    // this will call when the ball movement is ended
    this.end_function = null;
  }

  setXY = (x, y) => {
    // this function is used for setting the position of the ball
    this.ball.style.left = `${x}px`;
    this.ball.style.bottom = `${y}px`;
  };

  shoot = async (angle, power, angle_range) => {
    // this function is used for shooting the ball

    if (this.shoot_overflow_handler < 2) {
      this.shoot_overflow_handler++;
      let frame = 1;
      // N = delta(v) * m / delta(t) ---> " delta(v) = delta(t) * N / m "
      let v = (frame * power) / this.m;
      let y = 0;
      let x = 0;
      let b_x = 0;
      let b_y = 0;
      let v_x = v;
      let v_y = v;
      let data = null;
      let first_turn = true;
      let overflow_handler = 0;
      const overflow_value = 10000;
      const radians = (angle / 180) * Math.PI;
      const ratio_x = Math.round(Math.cos(radians) * 100000) / 100000;
      const ratio_y = Math.round(Math.sin(radians) * 100000) / 100000;

      // everything in this section is written only to prevent a bug,
      // this bug is that the ball sometimes collides outside the support
      // in the first frame due to an angle outside the range of the
      // allowed angle or a very low force.
      // it receives itself and this piece of code causes this problem to be solved
      let test_x = 0;
      let test_y = 0;
      if (angle <= 0) test_y = ((v * ratio_y + frame * this.g * Math.sign(ratio_y)) * frame) / 150;
      else test_y = ((v * ratio_y - frame * this.g * Math.sign(ratio_y)) * frame) / 150;
      test_x = (frame * v_x * ratio_x) / 150;
      let test_angle = (Math.atan2(test_y, test_x) * 180) / Math.PI;
      const check_angle = () => {
        let [condition1, condition2] = [false, false];

        if (Math.abs(angle_range[0] - test_angle) > 180 && angle_range[0] >= 0) condition1 = angle_range[0] < test_angle + 360;
        else condition1 = angle_range[0] < test_angle;
        if (Math.abs(angle_range[1] - test_angle) > 180 && angle_range[1] <= 0) condition2 = angle_range[1] > test_angle - 360;
        else condition2 = angle_range[1] > test_angle;

        return condition1 && condition2;
      };

      if (check_angle()) {
        this.shoot_overflow_handler = 0;

        while (overflow_handler < overflow_value) {
          if (this.rotate) {
            this.ball.style.rotate = `${this.rotation}deg`;
            this.rotation = this.rotation + 5;
          }
          overflow_handler++;
          if (angle <= 0) v_y = v * ratio_y + frame * this.g * Math.sign(ratio_y);
          else v_y = v * ratio_y - frame * this.g * Math.sign(ratio_y);
          b_x = x;
          b_y = y;
          y = (frame * v_y) / 150;
          x = (frame * v_x * ratio_x) / 150;

          // this is that section is used for checking the touch of the ball on the wall
          if (!first_turn) {
            for (let j = 0; j < walls.length; j++) {
              const [rx, ry, brx, bry] = [x + this.pos[0], y + this.pos[1], b_x + this.pos[0], b_y + this.pos[1]];
              data = walls[j](rx, ry, brx, bry, this.ball.clientHeight, this.ball.clientWidth);
              if (data && !first_turn) {
                this.pos = [data[1], data[2]];
                this.setXY(data[1], data[2]);
                await sleep(this.t);
                break;
              }
            }
          }

          if (data) break;
          else {
            this.setXY(this.pos[0] + x, this.pos[1] + y);
            await sleep(this.t);
            frame++;
          }
          if (first_turn) first_turn = false;
        }
        if (overflow_handler < overflow_value) {
          const distance = Math.sqrt(Math.abs(Math.pow(y - b_y, 2) + Math.pow(x - b_x, 2)));
          let new_power = distance * this.return_power * this.m;
          if (this.is_return_power_equal) new_power = power;
          if (data && new_power > 10 && distance > 1) return this.shoot(data[0], new_power, data[3]);
          else this.end_function();
        } else return "Error";
      } else {
        if (Math.abs(angle_range[0] - test_angle) > 180) this.shoot(handleAngle(angle_range[0] * 2 - test_angle + 360), power, angle_range);
        else this.shoot(handleAngle(angle_range[0] * 2 - test_angle), power, angle_range);
        return "Error";
      }
    } else if (power < 30000) return "too much power";
    else this.end_function();
  };
}

class Wall {
  // this is the class with which the walls were built

  constructor(element) {
    // here a variable is defined for the wall element
    this.wall = element;

    // these are points on the sides of the wall element
    // (these are the corners of the four border radius in four corner of the wall
    // both of which form a side)
    // these are initialized in the "begin" function
    this.left_top_point = [];
    this.left_bottom_point = [];
    this.right_top_point = [];
    this.right_bottom_point = [];
    this.bottom_right_point = [];
    this.bottom_left_point = [];
    this.top_right_point = [];
    this.top_left_point = [];

    // these are the slopes of the sides of the wall element
    // these are initialized like points in the "begin" function
    this.left_line_slope = 0;
    this.right_line_slope = 0;
    this.top_line_slope = 0;
    this.bottom_line_slope = 0;

    // this is a variable to handle wall reactions
    // witch can take two values : "outside" or "inside"
    // the "outside" is used for normal walls witch the ball only touches the out side of them
    // but the "inside" is used for the walls witch the ball is in they , for example the playground is one of them
    // these things are because the ball is not just a point with a specific coordinate ,
    // it has width and height that are calculated differently outside and inside the wall
    this.ball_handling = "outside";

    // if true, the x and y taken in the start function will be applied to the element, but if not, this will not happen
    this.applyXY = true;

    this.begined = false;
    this.wall_number = null;
  }

  begin = (width, height, x, y, border_radius, angle) => {
    // this function creates the wall element and sets values to it

    const slopeCalc = (point1, point2) => {
      // This function takes the coordinates of two points of a line and returns the slope of the line
      return (point1[1] - point2[1]) / (point1[0] - point2[0]);
    };
    const handleLine = (point_1, point_2, m_point, b_m_point, slope) => {
      // This function is used to detect the touch of the ball on the wall and return the return angle
      const checkCoordinates = (p1, p2, point) => {
        // this function is used for ditecting the touch of the ball on the wall
        return (
          ((p1[0] <= point[0] && point[0] <= p2[0]) || (p1[0] >= point[0] && point[0] >= p2[0])) &&
          ((p1[1] <= point[1] && point[1] <= p2[1]) || (p1[1] >= point[1] && point[1] >= p2[1]))
        );
      };
      const getGratterAndSmaller = (p1, p2) => {
        // this function takes two points coordinate and return the gratter and smaller X and Y
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
      const [m_s, m_g] = getGratterAndSmaller(m_point, b_m_point);
      const [p_s, p_g] = getGratterAndSmaller(point_1, point_2);
      const angle = (Math.atan2(m_point[1] - b_m_point[1], m_point[0] - b_m_point[0]) * 180) / Math.PI;
      const m_angle = (Math.atan2(point_2[1] - point_1[1], point_2[0] - point_1[0]) * 180) / Math.PI;
      const returnResult = () => {
        // If the contact of the ball with the wall is detected using conditions, this function is called
        // and this function returns the angle of return and the coordinates where the ball should be and the angle range.
        const rel_point1_pos = [0, 0];
        const rel_point2_pos = [point_2[0] - point_1[0], point_2[1] - point_1[1]];
        const rel_ball_pos = [m_point[0] - point_1[0], m_point[1] - point_1[1]];
        const rel_b_ball_pos = [b_m_point[0] - point_1[0], b_m_point[1] - point_1[1]];
        const ball_slope = slopeCalc(rel_ball_pos, rel_b_ball_pos);
        const wall_slope = slopeCalc(rel_point1_pos, rel_point2_pos);
        const width_from_the_origin = rel_ball_pos[1] - rel_ball_pos[0] * ball_slope;
        let [rx, ry] = [0, 0];

        if (
          Math.abs(wall_slope) !== Infinity &&
          Math.abs(ball_slope) !== Infinity &&
          ((ball_slope !== 0 && wall_slope === 0) || (ball_slope === 0 && wall_slope !== 0) || (ball_slope !== 0 && wall_slope !== 0))
        ) {
          rx = -width_from_the_origin / (ball_slope - wall_slope);
          ry = rx * wall_slope;
        } else if ((wall_slope === 0 && ball_slope === 0) || (wall_slope === Infinity && ball_slope === Infinity)) {
          rx = rel_ball_pos[0];
          ry = rel_ball_pos[1];
        } else if (Math.abs(ball_slope) === Infinity) {
          rx = rel_ball_pos[0];
          ry = rx * wall_slope;
        } else {
          rx = rel_point1_pos[0];
          ry = rx * ball_slope + width_from_the_origin;
        }

        const angle_range = [0, 0];
        if (this.ball_handling === "inside") {
          angle_range[0] = (Math.atan2(point_2[1] - point_1[1], point_2[0] - point_1[0]) * 180) / Math.PI;
          angle_range[1] = (Math.atan2(point_1[1] - point_2[1], point_1[0] - point_2[0]) * 180) / Math.PI;
        } else {
          angle_range[1] = (Math.atan2(point_1[1] - point_2[1], point_1[0] - point_2[0]) * 180) / Math.PI;
          angle_range[0] = (Math.atan2(point_2[1] - point_1[1], point_2[0] - point_1[0]) * 180) / Math.PI;
        }

        return [handleAngle(m_angle * 2 - angle), rx + point_1[0], ry + point_1[1], angle_range];
      };

      if (checkCoordinates(point_1, point_2, m_point) || checkCoordinates(point_1, point_2, b_m_point)) {
        const m_slope = slopeCalc(m_point, point_2);
        const b_m_slope = slopeCalc(b_m_point, point_2);
        if ((m_slope <= slope && slope <= b_m_slope) || (m_slope >= slope && slope >= b_m_slope)) {
          return returnResult();
        } else return false;
      } else if (
        (m_g[0] >= p_g[0] && m_s[0] <= p_s[0] && m_g[1] <= p_g[1] && m_s[1] >= p_s[1]) ||
        (m_g[1] >= p_g[1] && m_s[1] <= p_s[1] && m_g[0] <= p_g[0] && m_s[0] >= p_s[0])
      ) {
        return returnResult();
      } else return false;
    };

    // in this part some styles applied to the element
    this.wall.style.width = width;
    this.wall.style.height = height;
    width = this.wall.clientWidth;
    height = this.wall.clientHeight;
    if (this.applyXY) {
      this.wall.style.left = `${x}px`;
      this.wall.style.bottom = `${y}px`;
    }
    this.wall.style.borderRadius = `${border_radius}px`;
    this.wall.style.transform = `rotate(${angle}deg)`;

    // in this part the rotation angle becomes a calculable angle
    const h_calc_angle = (handleAngle(angle - 270) / 180) * Math.PI;
    const v_calc_angle = (handleAngle(90 - angle) / 180) * Math.PI;

    // in this part some values is claculated for calculating the wall points
    const v_border_radius = [Math.cos(v_calc_angle) * border_radius, Math.sin(v_calc_angle) * border_radius];
    const v_value1 = Math.round(Math.cos(v_calc_angle) * (height - border_radius) * 1000) / 1000;
    const v_value2 = Math.round(Math.sin(v_calc_angle) * (height - border_radius) * 1000) / 1000;
    const v_value3 = Math.round(Math.sin(h_calc_angle) * width * 1000) / 1000;
    const v_value4 = Math.round(Math.cos(h_calc_angle) * width * 1000) / 1000;
    const h_border_radius = [Math.sin(h_calc_angle) * border_radius, Math.cos(h_calc_angle) * border_radius];
    const h_value1 = Math.round(Math.sin(h_calc_angle) * (width - border_radius) * 1000) / 1000;
    const h_value2 = Math.round(Math.cos(h_calc_angle) * (width - border_radius) * 1000) / 1000;
    const h_value3 = Math.round(Math.cos(v_calc_angle) * height * 1000) / 1000;
    const h_value4 = Math.round(Math.sin(v_calc_angle) * height * 1000) / 1000;

    // here and in this part the coordinate of the points are calculated
    this.left_bottom_point = [x + v_border_radius[0], y + v_border_radius[1]];
    this.left_top_point = [v_value1 + x, v_value2 + y];
    this.right_bottom_point = [v_value3 + x + v_border_radius[0], v_value4 + y + v_border_radius[1]];
    this.right_top_point = [v_value3 + x + v_value1, v_value2 + y + v_value4];
    this.bottom_left_point = [x + h_border_radius[0], y + h_border_radius[1]];
    this.bottom_right_point = [h_value1 + x, h_value2 + y];
    this.top_left_point = [h_value3 + x + h_border_radius[0], h_value4 + y + h_border_radius[1]];
    this.top_right_point = [h_value3 + x + h_value1, h_value2 + y + h_value4];

    // here the slope of the four sides of the wall is calculated
    this.left_line_slope = slopeCalc(this.left_bottom_point, this.left_top_point);
    this.right_line_slope = slopeCalc(this.right_bottom_point, this.right_top_point);
    this.bottom_line_slope = slopeCalc(this.bottom_left_point, this.bottom_right_point);
    this.top_line_slope = slopeCalc(this.top_left_point, this.top_right_point);

    // here two methods are defined to check the contact of the ball with the wall
    // method1 is for the "outside" walls and the method2 is for the "inside" walls
    // completely if the ball touches the wall this methods return the return angle,
    // the coordinates where the ball should be and the angle range for use in
    // re-shooting the ball but if not, they return false
    const method1 = (x_el, y_el, b_x, b_y, b_h, b_w) => {
      const left_line_handled = handleLine(
        [mathOperation(this.left_bottom_point[0], "-", b_w / 2), this.left_bottom_point[1]],
        [mathOperation(this.left_top_point[0], "-", b_w / 2), this.left_top_point[1]],
        [x_el, y_el],
        [b_x, b_y],
        this.left_line_slope
      );
      const right_line_handled = handleLine(
        [mathOperation(this.right_top_point[0], "-", b_w / 2), this.right_top_point[1]],
        [mathOperation(this.right_bottom_point[0], "-", b_w / 2), this.right_bottom_point[1]],
        [x_el, y_el],
        [b_x, b_y],
        this.right_line_slope
      );
      const bottom_line_handled = handleLine(
        [this.bottom_right_point[0], mathOperation(this.bottom_right_point[1], "-", b_h)],
        [this.bottom_left_point[0], mathOperation(this.bottom_left_point[1], "-", b_h)],
        [x_el, y_el],
        [b_x, b_y],
        this.top_line_slope
      );
      const top_line_handled = handleLine(this.top_left_point, this.top_right_point, [x_el, y_el], [b_x, b_y], this.bottom_line_slope);

      if (left_line_handled) return left_line_handled;
      else if (right_line_handled) return right_line_handled;
      else if (top_line_handled) return top_line_handled;
      else if (bottom_line_handled) return bottom_line_handled;
      else return false;
    };
    const method2 = (x_el, y_el, b_x, b_y, b_h, b_w) => {
      const left_line_handled = handleLine(
        [mathOperation(this.left_top_point[0], "-", b_w / 2), this.left_top_point[1]],
        [mathOperation(this.left_bottom_point[0], "-", b_w / 2), this.left_bottom_point[1]],
        [x_el, y_el],
        [b_x, b_y],
        this.left_line_slope
      );
      const right_line_handled = handleLine(
        [mathOperation(this.right_bottom_point[0], "-", b_w / 2), this.right_bottom_point[1]],
        [mathOperation(this.right_top_point[0], "-", b_w / 2), this.right_top_point[1]],
        [x_el, y_el],
        [b_x, b_y],
        this.right_line_slope
      );
      const bottom_line_handled = handleLine(
        [this.bottom_left_point[0], this.bottom_left_point[1]],
        [this.bottom_right_point[0], this.bottom_right_point[1]],
        [x_el, y_el],
        [b_x, b_y],
        this.top_line_slope
      );
      const top_line_handled = handleLine(
        [this.top_right_point[0], mathOperation(this.top_right_point[1], "-", b_h)],
        [this.top_left_point[0], mathOperation(this.top_left_point[1], "-", b_h)],
        [x_el, y_el],
        [b_x, b_y],
        this.bottom_line_slope
      );

      if (left_line_handled) return left_line_handled;
      else if (right_line_handled) return right_line_handled;
      else if (top_line_handled) return top_line_handled;
      else if (bottom_line_handled) return bottom_line_handled;
      else return false;
    };

    if (!this.begined) this.wall_number = walls.length;

    // here according to whether the wall is "inside" or "outside", it is called method1 or method2
    if (this.ball_handling === "outside") {
      if (!this.begined) walls.push(method1);
      else walls[this.wall_number] = method1;
    } else {
      if (!this.begined) walls.push(method2);
      else walls[this.wall_number] = method2;
    }

    this.begined = true;
  };
}

export { Ball, Wall, Text, sleep };
