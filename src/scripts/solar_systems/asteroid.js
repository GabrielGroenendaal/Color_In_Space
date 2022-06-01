import { SolarSystem } from "./solar_system";
import { SolarSystemBody } from "./solar_system_body";

export class Asteroid extends SolarSystemBody {
      constructor(options) {
            this.parent_body = options.parent_body;
            options.radius = options.radius || Util.randomSize(1, 5);
            options.color = options.color || "rgb(155,102,102)";
            options.color_v = options.color_v || [0, 0, 0];
            options.vel = options.vel || [0, 0];
            options.acc = options.acc || [0, 0];
            options.pos = options.pos || [0, 0];
            options.mass = options.size || options.radius * 10;
            super(options);
      }
}