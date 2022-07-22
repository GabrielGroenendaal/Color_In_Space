import { Util } from "../utilities/util";


export class Trail {
      
      color_changes = [
            'red_down',
            'red_up',
            'green_down',
            'green_up',
            'blue_down',
            'blue_up'
      ]
      constructor(options) {
            this.color = options.color;
            this.size = options.size || 10; 
            this.shrink = options.shrink || .02;
            this.pos = options.pos;
            this.vel = options.vel || [0,0];
            this.solar_system = options.solar_system;
            this.altered_color = Util.get_random(this.color_changes);
            this.drag = options.drag || .995;
            this.variance = Math.random();
            //this.spread = options.spread || 0;
            //setInterval(this.set_adjusted_color(), 4000);
      }

      
      draw(ctx, comet) {
            ctx.fillStyle = Util.parseColor(this.color);
            ctx.beginPath();

            let checkSize = (this.size > 0) ? this.size : .01
            ctx.arc(
                  this.pos[0] - Util.cameraX(comet),
                  this.pos[1] - Util.cameraY(comet),
                  checkSize,
                  0,
                  2 * Math.PI,
                  false
            );

            ctx.fill();
            this.shrink_size();
      }

      adjust() {
            //    this.adjust_color();
            this.adjust_pos();
            this.shrink_size();
      }

      shrink_size() {
            this.size -= this.shrink;
            //this.color.alpha -= .1;
            if (this.size <= 0.01) {
            //if (this.color.alpha <= 0){
                  this.solar_system.remove(this);
            }
      }

      // set_adjusted_color() {
      //       let old = this.altered_color;
      //       while (this.altered_color === old) {
      //             this.altered_color = Util.get_random(this.color_changes);
      //       }
      // }

      // adjust_color() {
      //       if (this.altered_color === "red_down") {
      //             if (this.color.red > 0) {
      //                   this.color.red -= this.variance;
      //             }
      //       } else if (this.altered_color === "red_up") {
      //             if (this.color.red < 255) {
      //                   this.color.red += this.variance;
      //             }
      //       } else if (this.altered_color === "green_down") {
      //             if (this.color.green > 0) {
      //                   this.color.green -= this.variance;
      //             }
      //       } else if (this.altered_color === "green_up") {
      //             if (this.color.green < 255) {
      //                   this.color.green += this.variance;
      //             }
      //       } else if (this.altered_color === "blue_down") {
      //             if (this.color.blue > 0) {
      //                   this.color.blue -= this.variance;
      //             }
      //       } else if (this.altered_color === "blue_up") {
      //             if (this.color.blue < 255) {
      //                   this.color.blue += this.variance;
      //             }
      //       }
      //       //this.variance.r += .0001;
      //       // this.variance.g -= .0002;
      //       // this.variance.b += .0005;

      // }

      adjust_pos() {
            //this.pos = [this.pos[0] + Math.random() * Math.sin(window.count), this.pos[1] + Math.random() * Math.sin(window.count)];
            this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
            this.vel = [this.vel[0] * this.drag, this.vel[1] * this.drag];
            //this.pos = Util.scale(this.pos, this.drag);
      }

}

export class ExplosionTrail extends Trail {
      constructor(options) {
            super(options);
      }
}

export class CometTrail extends Trail {
      constructor(options) {
            super(options);
      }
}

export class SunExplosionTrail extends Trail {
      constructor(options) {
            super(options);
      }


      isCollidedWith(otherObj) {
            let pos1 = this.pos;
            let pos2 = otherObj.pos;
            let dist = Util.dist(this, otherObj);
            let safe = this.size + otherObj.radius;
            if (dist < safe) {
                  return true;
            } else {

                  return false;
            }
      }

      collideWith(otherObj) {
            this.solar_system.remove(otherObj);
      }
}
      // draw(ctx, comet) {
      //       super.draw(ctx, comet);
      //       if (this.size > 0.01) {
      //             let new_angle = Util.randomAngle();
      //             let new_pos = [0, 0];
      //             new_pos[0] = Math.cos(new_angle) * this.size / 15;
      //             new_pos[1] = Math.sin(new_angle) * this.size / 15;
      //             this.solar_system.add(new ExplosionTrail({
      //                   pos: this.pos,
      //                   solar_system: this.solar_system,
      //                   size: this.size * Math.random() * .5 + .5,
      //                   color: this.color,
      //                   vel: new_pos * 2,
      //                   //spread: this.spread - 1,
      //                   shrink: .1
      //             }));
      //       }

      // }
