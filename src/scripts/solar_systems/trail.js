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
      }

      
      draw(ctx, comet) {
            let checkSize = (this.size > 0) ? this.size : .01

            ctx.fillStyle = Util.parseColor(this.color);
            ctx.beginPath();
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
            this.adjust_pos();
            this.shrink_size();
      }

      shrink_size() {
            this.size -= this.shrink;
            if (this.size <= 0.01) {
                  this.solar_system.remove(this);
            }
      }

      adjust_pos() {
            this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
            this.vel = [this.vel[0] * this.drag, this.vel[1] * this.drag];
            this.chaseComet()
      }

      chaseComet() {
            let comet = this.solar_system.comet.pos;
            let diff_x = comet[0] - this.pos[0]
            let diff_y = comet[1] - this.pos[1]
            let distance = Util.dist(this.solar_system.comet, this);
            distance *= 130;
            this.vel = [
                  this.vel[0] + (diff_x / distance),
                  this.vel[1] + (diff_y / distance)
            ]
      }

}

export class ExplosionTrail extends Trail {
      constructor(options) {
            super(options);
      }

      chaseComet() {
            let comet = this.solar_system.comet.pos;
            let diff_x = comet[0] - this.pos[0]
            let diff_y = comet[1] - this.pos[1]
            let distance = Util.dist(this.solar_system.comet, this);
            distance = distance * 30
            this.vel = [
                  this.vel[0] + (diff_x / distance),
                  this.vel[1] + (diff_y / distance)
            ]
            // console.log(comet)
      }
}

export class CometTrail extends Trail {
      constructor(options) {
            super(options);
      }
      chaseComet() {
            
      }
}

export class SunExplosionTrail extends Trail {
      constructor(options) {
            super(options);
      }
      chaseComet() {
            let comet = this.solar_system.comet.pos;
            let diff_x = comet[0] - this.pos[0]
            let diff_y = comet[1] - this.pos[1]
            let distance = Util.dist(this.solar_system.comet, this);
            distance = distance * 70
            this.vel = [
                  this.vel[0] + (diff_x / distance),
                  this.vel[1] + (diff_y / distance)
            ]
            // console.log(comet)
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
