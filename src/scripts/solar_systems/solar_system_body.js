import { Util } from "../utilities/util";

export class SolarSystemBody {
      constructor(options) {
            this.base_radius = options.base_radius || .5;
            this.radius = options.radius; 
            this.mass = options.mass;
            this.vel = options.vel;
            this.pos = options.pos;
            this.acc = options.acc;
            this.color = options.color || Util.randomColor();
            this.isOrbittable = true;
            this.solar_system = options.solar_system;

            this.color_v = options.color_v;
            this.variance = Math.random;
      }

      move() {
            this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      }

      draw(ctx) {
            ctx.fillStyle = Util.parseColor(this.color);
            ctx.beginPath();

            ctx.arc(
                  this.pos[0],
                  this.pos[1],
                  this.radius,
                  0,
                  2 * Math.PI,
                  false
            );

            ctx.fill();
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

      colorShift() {
            
      }

      adjustSize() {
            this.radius += this.base_radius * Math.sin(window.count / 10000);
      }

}

SolarSystemBody.prototype.adjustSize = Util.myThrottle(SolarSystemBody.prototype.adjustSize, 40);