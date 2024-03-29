import { SolarSystem } from "./solar_systems/solar_system";
import { Comet } from "./comet";
import { Camera } from "./utilities/camera";
import { Util } from "./utilities/util";



export class Universe {

      constructor(el) {
            this.el = el;
            this.solar_system = this.generateSolarSystem([0,0]);
            this.comet = new Comet({ universe: this, solar_system: this.solar_system });
            this.solar_system.comet = this.comet;
            this.trails = [];
            this.stars = [];
            this.gui = [];
            this.start();
      }

      start() {
            let a = this;
            setInterval(function () {  
                  a.solar_system.step();
                  a.draw();
                  a.comet.bindKeyHandlers();
                  a.checkComet();
            }, 10)
        
      }

      draw() {
            let canvasEl = Util.canvasEL();
            this.el.clearRect(0, 0, canvasEl.width, canvasEl.height);
            this.solar_system.draw(this.el);       
      }

      generateSolarSystem(start) {
            let canvasEl = Util.canvasEL();
            return new SolarSystem({
                  universe: this.universe,
                  pos: start,
                  height: canvasEl.height * 2,
                  width: canvasEl.width * 2,
                  num_planets: (Math.random() * 5 + 15),
                  num_suns: (Math.random() * 5 + 5)
            });
      }

      checkComet() {
            let valid_x = [
                  this.solar_system.pos[0] - (this.solar_system.width * .3),
                  this.solar_system.pos[0] + (this.solar_system.width * 1.3)
            ]
            let valid_y = [
                  this.solar_system.pos[1] - (this.solar_system.height * .3),
                  this.solar_system.pos[1] + (this.solar_system.height * 1.3)
            ]
            if (this.comet.pos[0] > valid_x[1]|| this.comet.pos[0] < valid_x[0]|| this.comet.pos[1] > valid_y[1] || this.comet.pos[1] < valid_y[0]) {
                  let storage = this.solar_system;
                  let new_univ_pos = [
                        this.comet.pos[0] - window.innerWidth / 2 + (this.comet.vel[0] * 100),
                        this.comet.pos[1] - window.innerHeight / 2 + (this.comet.vel[1] * 100)
                  ]
                  this.solar_system = this.generateSolarSystem(new_univ_pos);
                  this.solar_system.comet = this.comet;
                  this.comet.solar_system = this.solar_system;
                  this.solar_system.trails = storage.trails;
                  this.solar_system.comet_trails = storage.comet_trails;
                  this.solar_system.explosion_trails = storage.comet_trails;
                  this.solar_system.sun_explosion_trails = storage.sun_explosion_trails;
                  
            }
      }
}