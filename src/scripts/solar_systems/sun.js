import { SolarSystemBody } from "./solar_system_body";
import { Util } from "../utilities/util";
import { Trail } from "./trail";
import { SunExplosionTrail } from "./trail";
export class Sun extends SolarSystemBody {
      constructor(options) {
            options.base_radius = options.base_radius || Util.randomSize(50, 80);
            options.color = options.color || Util.randomColor();
            options.color_v = options.color_v || [0, 0, 0];
            options.vel = options.vel || [0, 0];
            options.acc = options.acc || [0, 0];
            options.pos = options.pos || Util.randomPos(200,600);
            options.mass = options.size || options.radius * 10;
            super(options);
            this.isOrbittable = false;
            
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
                  size: this.radius * .5,
                  color: JSON.parse(JSON.stringify(this.trail_color)),
                  vel: new_pos * (Math.random() * 4 + 1),//Util.scale(this.vel, -.1)
                  shrink: (Math.random() * .2 + .6),
                  vel: new_pos
                  //spread: 5
            }));

      }

      explode() {
            let count = 0;
            while (count < this.num_of_giblets) {
                  let new_pos = [];
                  let new_angle = Util.toRadians((360 / Math.random(0, this.num_of_giblets)) * count);
                  new_pos[0] = Math.cos(new_angle) * this.radius / (Math.random() * 7 + 2);
                  new_pos[1] = Math.sin(new_angle) * this.radius / (Math.random() * 7 + 2);
                  this.solar_system.add(new SunExplosionTrail({
                        pos: this.pos,
                        solar_system: this.solar_system,
                        size: this.radius * .75,
                        color: JSON.parse(JSON.stringify(this.trail_color)),
                        vel: new_pos,//Util.scale(this.vel, -.1),
                        shrink: .06,
                        //spread: 5
                  }));
                  count++;
            }
            //console.log(this.solar_system.checkTrail());
      }
}