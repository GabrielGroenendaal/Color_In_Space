
import { SolarSystemBody } from "./solar_system_body";
import { Util } from "../utilities/util";
import { Sun } from "./sun";
import { Planet } from "./planet";
import { Comet } from "../comet";
import { Asteroid } from "./asteroid";
import { Trail } from "./trail";
import { ExplosionTrail } from "./trail";
import { Star } from "./star";

export class SolarSystem {

      constructor(options) {
            this.height = window.innerHeight - window.board_offset ;
            this.width = window.innerWidth;
            this.num_planets = options.num_planets || 8;
            this.num_suns = options.sun || 3;
            this.universe = options.universe;
            this.suns = [];
            this.comet = options.comet;
            this.planets = [];
            this.asteroids = [];
            this.stars = [];
            this.trails = [];
            this.explosion_trails = [];
            this.addPlanets();
      }


      addPlanets() {
            while (this.planets.length < this.num_planets) {
                  let new_planet = new Planet({
                        solar_system: this,
                        pos: Util.randomPos(100, this.width - 100, 100, this.height - 100),
                        vel: Util.randomVec(.1)
                  });
                  this.add(new_planet);
            }
            while (this.suns.length < this.num_suns) {
                  let new_sun = new Sun({
                        solar_system: this
                  });
                  this.add(new_sun);
            }
      }

      allBodies() {
            return [...this.suns, ...this.planets, ...this.asteroids, ...[this.comet]]
      }

      allGraphics() {
            return [...this.trails, ...this.stars, ...this.explosion_trails]
      }

      add(obj) {
            if (obj instanceof Planet) {
                  this.planets.push(obj);
            }
            if (obj instanceof Sun) {
                  this.suns.push(obj);
            }
            if (obj instanceof Trail && !(obj instanceof ExplosionTrail)) {
                  this.trails.push(obj);
            }
            if (obj instanceof ExplosionTrail) {
                  this.explosion_trails.push(obj);
            }
            if (obj instanceof Star) {
                  this.stars.push(obj);
            }
            if (obj instanceof Asteroid) {
                  this.asteroids.push(obj)
            }
      }

      draw(ctx) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight - window.board_offset );
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight - window.board_offset );
            let bodies = this.allBodies();
            for (let index = 0; index < bodies.length; index++) {
                  bodies[index].draw(ctx);
            };
            let graphics = this.allGraphics();
            for (let index = 0; index < graphics.length; index++) {
                  graphics[index].draw(ctx);
                  graphics[index].adjust();
                  //graphics[index].shrink();
            };
      }

      moveObjects() {
            let bodies = this.allBodies();
            //console.log(bodies);
            for (let index = 0; index < bodies.length; index++) {
                  bodies[index].move();
                  bodies[index].adjustSize();
            }
            //bodies.forEach(body => body.move());
      }

      checkCollision() {
            let all = this.allBodies();
            for (let i = 0; i < all.length - 1; i++) {
                  for (let j = i + 1; j < all.length; j++) {
                        if (all[i].isCollidedWith(all[j])) {
                              all[i].collideWith(all[j]);
                        };
                  }
            }
      }

      checkTrail() {
            console.log(this.trails);
            console.log(this.explosion_trails)
      }
      step() {
            this.moveObjects();
            this.checkCollision();
      }

      remove(obj) {
            if (obj instanceof Asteroid) {
                  this.asteroids.splice(this.asteroids.indexOf(obj), 1);
            }
            if (obj instanceof Sun){
                  this.suns.splice(this.suns.indexOf(obj), 1);
            }
            if (obj instanceof Trail && !(obj instanceof ExplosionTrail)){
                  //this.checkTrail();
                  this.trails.splice(this.trails.indexOf(obj), 1)
            }
            if (obj instanceof ExplosionTrail){
                  //this.checkTrail();
                  this.explosion_trails.splice(this.explosion_trails.indexOf(obj), 1)
            }
            if (obj instanceof Star){
                  this.stars.splice(this.stars.indexOf(obj), 1)
            }
            if (obj instanceof Planet){
                  obj.explode();
                  this.planets.splice(this.planets.indexOf(obj), 1)
            } 
      }

}

SolarSystem.prototype.checkTrail = Util.myThrottle(SolarSystem.prototype.checkTrail, 50);
