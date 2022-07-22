import { SolarSystemBody } from "./solar_systems/solar_system_body";
import { Trail } from "./solar_systems/trail";
import { CometTrail } from "./solar_systems/trail";
import { Util } from "./utilities/util";
import { Planet } from "./solar_systems/planet";

export class Comet extends SolarSystemBody {
      constructor(options) {
            // Setting variables
            options.base_radius = 15;
            options.color = { red: 255, green: 255, blue: 255, alpha: 0 };
            options.color_v = options.color_v || [0, 0, 0];
            options.vel = options.vel || [0, 0];
            options.acc = options.acc || [0, 0];
            options.pos = options.pos || [window.innerWidth / 2, window.innerHeight / 2];
            options.mass = options.size || options.radius * 10;
            super(options);

            // Game Logic
            this.isOrbittable = false;
            this.powerUp = false;
            this.growth = options.growth || (Math.random() * .4 + .2);
            this.radius =  this.base_radius / 100; 
            //this.bindKeyHandlers();
            
            // Trail color logic
            this.trail_color = options.trail_color || Util.randomColor();
            this.altered_color = Util.get_random(this.color_changes);
            this.variance = 1//Math.random() * .5 + .5;            //this.trail = new Trail();
            setInterval(this.set_adjusted_color.bind(this), 1000);


            // Movement
            this.drag = .992;
            this.universe = options.universe;
            this.solar_system = options.solar_system;
            this.solar_system.add(this);
      }

      draw(ctx) {
            this.adjust_color();
            this.addTrail();
            super.draw(ctx, this);
      }

      move() {
            this.pos = [this.pos[0] + (this.vel[0]), this.pos[1] + this.vel[1]];
            this.vel = [this.vel[0] * this.drag, this.vel[1] * this.drag];
            //console.log(this.pos);
      }

      power(impulse) {
            this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
      }

      addTrail() {
            let new_pos = [];
            let new_angle = Util.randomAngle();
            new_pos[0] = Math.cos(new_angle) * this.radius / 150;
            new_pos[1] = Math.sin(new_angle) * this.radius / 150;

            this.solar_system.add(new CometTrail({
                  pos: this.pos,
                  solar_system: this.solar_system,
                  size: 10,
                  color: JSON.parse(JSON.stringify(this.trail_color)),
                  //    vel: new_pos,//Util.scale(this.vel, -.1)
                  shrink: .03,
                  //spread: 5
            }));


            // new_angle = Util.randomAngle();
            // new_pos[0] = Math.cos(new_angle) * this.radius / 150;
            // new_pos[1] = Math.sin(new_angle) * this.radius / 150;

            // this.solar_system.add(new Trail({
            //       pos: this.pos,
            //       solar_system: this.solar_system,
            //       size: 8,
            //       color: JSON.parse(JSON.stringify(this.trail_color)),
            //       vel: new_pos,//Util.scale(this.vel, -.1)
            //       //shrink: .05
            // }));

      }

      color_changes = [
            'red_down',
            'red_up',
            'green_down',
            'green_up',
            'blue_down',
            'blue_up'
      ]

      num_of_giblets = 3;

      set_adjusted_color() {
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

      collideWith(otherObj) {
            if (otherObj instanceof Planet) {
                  otherObj.explode();
            }
            this.solar_system.remove(otherObj);
            // this.solar_system.remove(this);
      }

      bindKeyHandlers() {
            if (key.isPressed("up")) {
                  //console.log("UP");
                  this.power([0, -.05]);
            }
            if (key.isPressed("down")) {
                  //console.log("DOWN");
                  this.power([0, .05]);
            }
            if (key.isPressed("right")) {
                  //console.log("RIGHT");
                  this.power([.05,0]);
            }
            if (key.isPressed("left")) {
                  //console.log("LEFT");
                  this.power([-.05,0]);
            }
      }
}