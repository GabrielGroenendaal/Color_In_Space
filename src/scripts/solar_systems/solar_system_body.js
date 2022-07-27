import { Util } from "../utilities/util";
import { Trail } from "./trail";
import { ExplosionTrail } from "./trail";
export class SolarSystemBody {
      color_changes = [
            'red_down',
            'red_up',
            'green_down',
            'green_up',
            'blue_down',
            'blue_up'
      ]

      num_of_giblets = 100;

      constructor(options) {
            this.base_radius = options.base_radius || .5;
            this.growth = options.growth || (Math.random() * .4 + .2);
            this.radius =  this.base_radius / 100; 
            this.mass = options.mass;
            this.vel = options.vel;
            this.pos = options.pos;
            this.acc = options.acc;
            this.color = options.color || Util.randomColor();
            this.isOrbittable = true;
            this.solar_system = options.solar_system;
            //this.comet = options.comet;
            this.color_v = options.color_v;
            //this.variance = Math.random;

                        // Trail color logic
                        this.trail_color = options.trail_color || Util.randomColor();
                        this.altered_color = Util.get_random(this.color_changes);
            this.variance = 1//Math.random() * .5 + .5;            //this.trail = new Trail();
            this.trail_shrink = 
            setInterval(this.set_adjusted_color.bind(this), 500);
            
            //this.camera = options.camera;
      }

      move() {
            this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      }

      draw(ctx, comet) {
            this.adjust_color();
            this.adjustSize();
            this.addTrail();
            
            // ctx.fillStyle = Util.parseColor(this.color);
            // ctx.beginPath();

            // ctx.arc(
            //       this.pos[0]  - Util.cameraX(comet),
            //       this.pos[1] - Util.cameraY(comet),
            //       this.radius,
            //       0,
            //       2 * Math.PI,
            //       false
            // );

            // ctx.fill();
      }

      isCollidedWith(otherObj) {
            let pos1 = this.pos;
            let pos2 = otherObj.pos;
            let dist = Util.dist(this, otherObj);
            let safe = this.radius + otherObj.radius;
            if (dist < safe) {
                  return true;
            } else {
                  return false;
            }
      }

      collideWith(otherObj) {
            this.solar_system.remove(otherObj);
            this.solar_system.remove(this);
      }

      addTrail() {
            let new_pos = [];
            let new_angle = Util.randomAngle();
            let v = Math.random() * 30 + 20;
            new_pos[0] = Math.cos(new_angle) * this.radius /  v;
            new_pos[1] = Math.sin(new_angle) * this.radius / v;

            this.solar_system.add(new Trail({
                  pos: this.pos,
                  solar_system: this.solar_system,
                  size: this.radius,
                  color: JSON.parse(JSON.stringify(this.trail_color)),
                  vel: new_pos * (Math.random() * 4 + 1),//Util.scale(this.vel, -.1)
                  shrink: (Math.random() * .03 + .01),
                  vel: new_pos
                  //spread: 5
            }));

      }

      adjustSize() {
            //console.log("hi")
            if (this.radius < this.base_radius) {
                  //console.log("hi")
                  this.radius = this.radius + this.growth;
            }
      }


      set_adjusted_color() {
            //console.log(this.altered_color);
            let old = this.altered_color;
            while (this.altered_color === old) {
                  this.altered_color = Util.get_random(this.color_changes);
            }
      }

      adjust_color() {
            //console.log(this.trail_color);
            if (this.altered_color === "red_down") {
                  if (this.trail_color.red > 30) {
                        this.trail_color.red -= this.variance;
                  }
            } else if (this.altered_color === "red_up") {
                  if (this.trail_color.red < 255) {
                        this.trail_color.red += this.variance;
                  }
            } else if (this.altered_color === "green_down") {
                  if (this.trail_color.green > 30) {
                        this.trail_color.green -= this.variance;
                  }
            } else if (this.altered_color === "green_up") {
                  if (this.trail_color.green < 255) {
                        this.trail_color.green += this.variance;
                  }
            } else if (this.altered_color === "blue_down") {
                  if (this.trail_color.blue > 30) {
                        this.trail_color.blue -= this.variance;
                  }
            } else if (this.altered_color === "blue_up") {
                  if (this.trail_color.blue < 255) {
                        this.trail_color.blue += this.variance;
                  }
            }
            //this.variance.r += .0001;
            // this.variance.g -= .0002;
            // this.variance.b += .0005;

      }

      explode() {
            let count = 0;
            while (count < this.num_of_giblets) {
                  let new_pos = [];
                  let new_angle = Util.toRadians((360 / Math.random(0, this.num_of_giblets)) * count);
                  new_pos[0] = Math.cos(new_angle) * this.radius / (Math.random() * 8);
                  new_pos[1] = Math.sin(new_angle) * this.radius / (Math.random() * 8);
                  this.solar_system.add(new ExplosionTrail({
                        pos: this.pos,
                        solar_system: this.solar_system,
                        size: this.radius * .75,
                        color: JSON.parse(JSON.stringify(this.trail_color)),
                        vel: new_pos,//Util.scale(this.vel, -.1),
                        shrink: (Math.random() * .01 + 0.015)
                        //spread: 5
                  }));
                  count++;
            }
            //console.log(this.solar_system.checkTrail());
      }

}

//SolarSystemBody.prototype.adjustSize = Util.myThrottle(SolarSystemBody.prototype.adjustSize, 40);