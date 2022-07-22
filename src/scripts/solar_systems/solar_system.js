
import { SolarSystemBody } from "./solar_system_body";
import { Util } from "../utilities/util";
import { Sun } from "./sun";
import { Planet } from "./planet";
import { Comet } from "../comet";
import { Asteroid } from "./asteroid";
import { Trail } from "./trail";
import { ExplosionTrail } from "./trail";
import { Star } from "./star";
import { CometTrail } from "./trail";
import { SunExplosionTrail } from "./trail";
export class SolarSystem {

      constructor(options) {
            this.pos = options.pos || [0, 0];
            this.height = options.height || window.innerHeight - window.board_offset ;
            this.width = options.width || window.innerWidth;
            this.num_planets = options.num_planets || 8;
            this.num_suns = options.sun || 2;
            this.universe = options.universe;
            this.suns = [];
            this.comet = options.comet;
            this.planets = [];
            this.asteroids = [];
            this.stars = [];
            this.trails = [];
            this.explosion_trails = [];
            this.comet_trails = [];
            this.sun_explosion_trails = []
            this.addPlanets([.1,.25]);
            setInterval(this.checkPlanets.bind(this), 7000);
      }


      checkPlanets() {
            if ([...this.planets, ...this.suns, ...this.asteroids].length < this.num_planets + this.num_suns) {
                  this.addPlanets([0.06,0.1]);
            }
      }

      addPlanets(range) {
            while (this.planets.length < this.num_planets) {
                  let planet_pos = Util.randomPos(100, this.width - 100, 100, this.height - 100)
                  let new_planet = new Planet({
                        solar_system: this,
                        pos: [this.pos[0] + planet_pos[0], this.pos[1] + planet_pos[1]],
                        vel: Util.randomVec(.5),
                        growth: (Math.random() * (range[1] - range[0]) + range[0])
                  });
                  this.add(new_planet);
            }
            while (this.suns.length < this.num_suns) {
                  let planet_pos = Util.randomPos(100, this.width - 100, 100, this.height - 100)

                  let new_sun = new Sun({
                        solar_system: this,
                        pos: [this.pos[0] + planet_pos[0], this.pos[1] + planet_pos[1]],
                        vel: Util.randomVec(.3),
                        growth: (Math.random() * (range[1] - range[0]) + range[0])
                  });
                  this.add(new_sun);
            }
      }

      allBodies() {
            return [...this.suns, ...this.planets, ...this.asteroids, ...[this.comet]]
      }

      allGraphics() {
            return [...this.trails, ...this.stars, ...this.sun_explosion_trails, ...this.explosion_trails, ...this.comet_trails]
      }

      add(obj) {
            if (obj instanceof Planet) {
                  this.planets.push(obj);
            }
            if (obj instanceof Sun) {
                  this.suns.push(obj);
            }
            if (obj instanceof Trail && !(obj instanceof CometTrail) && !(obj instanceof ExplosionTrail) && !(obj instanceof SunExplosionTrail)) {
                  this.trails.unshift(obj);
            }
            if (obj instanceof ExplosionTrail) {
                  this.explosion_trails.unshift(obj);
            }
            if (obj instanceof CometTrail) {
                  this.comet_trails.unshift(obj)
            }
            if (obj instanceof SunExplosionTrail) {
                  this.sun_explosion_trails.unshift(obj)
            }
            if (obj instanceof Star) {
                  this.stars.push(obj);
            }
            if (obj instanceof Asteroid) {
                  this.asteroids.push(obj)
            }
      }

      draw(ctx) {
            
            //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight - window.board_offset);
            // ctx.clearRect(this.comet.pos[0] - (window.innerWidth/2), this.comet.pos[1] - (window.innerHeight/2), window.innerWidth, window.innerHeight)

            // ctx.fillStyle = "black";
            // ctx.fillRect(this.comet.pos[0] - (window.innerWidth/2), this.comet.pos[1] - (window.innerHeight/2), window.innerWidth, window.innerHeight);
            let bodies = this.allBodies();
            for (let index = 0; index < bodies.length; index++) {
                  bodies[index].draw(ctx, this.comet);
            };
            let graphics = this.allGraphics();
            for (let index = 0; index < graphics.length; index++) {
                  graphics[index].draw(ctx, this.comet);
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
                              // let colors = Util.blendColor(all[i].trail_color, all[j].trail_color);
                              // all[i].trail_color = colors[0];
                              // all[j].trail_color = colors[1];
                              all[i].collideWith(all[j]);
                        };
                  }
            }
      }

      checkSunCollision() {
            let planets = this.planets;
            let sun = this.sun_explosion_trails;
            for (let i = 0; i < sun.length; i++){
                  for (let j = 0; j < planets.length; j++){
                        if (sun[i].isCollidedWith(planets[j])) {
                              // let colors = Util.blendColor(sun[i].color, planets[j].trail_color)
                              // planets[j].trail_color = colors[1]

                              this.remove(planets[j])
                        }
                  }
            }
      }

  
      step() {
            this.moveObjects();
            this.checkCollision();
            this.checkSunCollision();
      }

      remove(obj) {
            if (obj instanceof Asteroid) {
                  this.asteroids.splice(this.asteroids.indexOf(obj), 1);
            }
            if (obj instanceof Sun) {
                  obj.explode();
                  this.suns.splice(this.suns.indexOf(obj), 1);
            }
            if (obj instanceof Trail && !(obj instanceof CometTrail) && !(obj instanceof ExplosionTrail) && !(obj instanceof SunExplosionTrail)){
                  //this.checkTrail();
                  this.trails.splice(this.trails.indexOf(obj), 1)
            }
            if (obj instanceof SunExplosionTrail) {
                  this.sun_explosion_trails.splice(this.sun_explosion_trails.indexOf(obj), 1)
            }
            if (obj instanceof ExplosionTrail){
                  //this.checkTrail();
                  this.explosion_trails.splice(this.explosion_trails.indexOf(obj), 1)
            }
            if (obj instanceof CometTrail) {
                  this.comet_trails.splice(this.comet_trails.indexOf(obj), 1)
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
