import { SolarSystemBody } from "./solar_system_body";
import { Util } from "../utilities/util";

export class Sun extends SolarSystemBody {
      constructor(options) {
            options.radius = options.radius || Util.randomSize(50, 80);
            options.color = options.color || Util.randomColor();
            options.color_v = options.color_v || [0, 0, 0];
            options.vel = options.vel || [0, 0];
            options.acc = options.acc || [0, 0];
            options.pos = options.pos || Util.randomPos(200,600);
            options.mass = options.size || options.radius * 10;
            super(options);
            this.isOrbittable = false;
      }
}