import { Util } from "../utilities/util";

export class Star {
      constructor(options) {
            this.radius = 2;
            this.color = {
                  red: 255,
                  green: 255,
                  blue: 255,
                  alpha: 126
            };
            this.comet = options.comet;
      }

      draw() {
            checkDist();
            ctx.fillStyle = Util.parseColor(this.color);
            ctx.beginPath();

            ctx.arc(
                  this.pos[0],
                  this.pos[1],
                  this.size,
                  0,
                  2 * Math.PI,
                  false
            );

            ctx.fill();
            this.shrink_size();
      }

      checkDist() {
            let dist = Util.dist(this, this.comet);

            
      }
}