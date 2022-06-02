import { SolarSystemBody } from "./solar_system_body";
import { Util } from "../utilities/util";
import { Trail } from "./trail";
import { ExplosionTrail } from "./trail";

export class Planet extends SolarSystemBody {
      
      num_of_giblets = 100;
      
      constructor(options) {
            options.base_radius = options.base_radius || Util.randomSize(10, 20);
            options.color = options.color || Util.randomColor();
            options.color_v = options.color_v || [0, 0, 0];
            options.vel = options.vel || [0, 0];
            options.acc = options.acc || [0, 0];
            options.pos = options.pos || [0, 0];
            options.mass = options.size || options.radius * 10;
            super(options);

            // Planet Specific
            this.explode_trail_color = options.color || Util.randomColor();

      } 

      // explode() {
      //       let count = 0;
      //       while (count < this.num_of_giblets) {
      //             let new_pos = [];
      //             let new_angle = Util.toRadians((360 / this.num_of_giblets) * count);
      //             new_pos[0] = Math.cos(new_angle) * this.radius / 8;
      //             new_pos[1] = Math.sin(new_angle) * this.radius / 8;
      //             this.solar_system.add(new ExplosionTrail({
      //                   pos: this.pos,
      //                   solar_system: this.solar_system,
      //                   size: this.radius * .75,
      //                   color: JSON.parse(JSON.stringify(this.trail_color)),
      //                   vel: new_pos,//Util.scale(this.vel, -.1),
      //                   shrink: .06,
      //                   //spread: 5
      //             }));
      //             count++;
      //       }
      //       console.log(this.solar_system.checkTrail());
      // }

      
}