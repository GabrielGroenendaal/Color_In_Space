import { SolarSystem } from "./solar_systems/solar_system";
import { Comet } from "./comet";
import { Camera } from "./utilities/camera";
import { Util } from "./utilities/util";

export class Universe {


      constructor(el) {
            this.solar_system = new SolarSystem({universe: this.universe,});
            this.comet = new Comet({ universe: this, solar_system: this.solar_system });
            this.solar_system.comet = this.comet;
            this.camera = new Camera({ universe: this, comet: this.comet });
            this.trails = [];
            this.stars = [];
            this.gui = [];
            this.el = el;
            this.start();
      }

      start() {
            let a = this;
            setInterval(function () {
                  a.solar_system.step();
                  a.solar_system.draw(a.el);
                  a.comet.bindKeyHandlers();
            }, 10)
      }

      draw() {
            
      }

      move() {
            
      }

      remove(obj) {
            
      }


      generateSolarSystem() {
            
      }
}