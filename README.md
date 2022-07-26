# Colors in Space 
### [Live Link](https://gabrielgroenendaal.github.io/Color_In_Space/)
![](https://i.imgur.com/ii27QCQ.gif)

**Colors in Space** is interactive visual and auditory experience where players control a comet streaking across space, colliding into planets in spectacular splashes of color and light, navigating the gravity and orbits of other celestial bodies while slowing growing and drawing more objects into its own orbit. The intent of this isn't to provide a challenging or competitive game experience, but something relaxing and visually pleasing with tactile appeal. 

<!-- ***

### Functionality and MVPs
In Colors in Space, users will be able to:
- Use cursor input to move around a 'Comet', with fine control of velocity
- Navigate a randomly generated and limitless space filled with celestial bodies
- Interact with other celestial bodies using the Comet they control, colliding into them and drawing particles into your orbit. -->

***

## Technologies, Libraries, and APIs
- Vanilla Javascript
- HTML5
- CSS
- Canvas API

***

## Major Features and Code Highlights (Will keep 2-3 of these)
### Trails
To create the mesmerizing visual effects for the solar system bodies, I utilized a ```Trail``` object which is created every time the game update is performed and the canvas is drawn. Trails are just circles, but their size shrinks over time and their colors are determined by a shifting value held by the object they're trailing from. Their initial motion is a randomly generated vector, and they are drawn to the position of the player-controlled comet over time. There are a half dozen different subclasses of Trail to produce different visual effects with slight tweaks to these variables.
```
export class Trail {

      constructor(options) {
            this.color = options.color;
            this.size = options.size || 10; 
            this.shrink = options.shrink || .02;
            this.pos = options.pos;
            this.vel = options.vel || [0,0];
            this.solar_system = options.solar_system;
            this.drag = options.drag || .995;
      }

      // Called every frame
      draw(ctx, comet) {
            let checkSize = (this.size > 0) ? this.size : .01 // Prevents drawing a Trail with a negative radius
            ctx.fillStyle = Util.parseColor(this.color);
            ctx.beginPath();
            ctx.arc(
                  this.pos[0] - Util.cameraX(comet),
                  this.pos[1] - Util.cameraY(comet),
                  checkSize,
                  0,
                  2 * Math.PI,
                  false
            );
            ctx.fill();
            this.adjust_pos();
            this.shrink_size();
      }

      // Shrinks the trail over time and deletes it from the collection of game objects once it is too small
      shrink_size() {
            this.size -= this.shrink;
            if (this.size <= 0.01) {
                  this.solar_system.remove(this);
            }
      }
      
      // Basic movement
      adjust_pos() {
            this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
            this.vel = [this.vel[0] * this.drag, this.vel[1] * this.drag];
            this.chaseComet()
      }
      
      // Adjusts movement based on the position of the player-controlled comet
      chaseComet() {
            let comet = this.solar_system.comet.pos;
            let diff_x = comet[0] - this.pos[0]
            let diff_y = comet[1] - this.pos[1]
            let distance = Util.dist(this.solar_system.comet, this);
            distance *= 130;
            this.vel = [
                  this.vel[0] + (diff_x / distance),
                  this.vel[1] + (diff_y / distance)
            ]
      }
}

```
![2022-07-26 10-17-03 (online-video-cutter com)](https://user-images.githubusercontent.com/36039557/181029087-0f0a5d3d-156e-4949-83f7-60b739885983.gif)

The ```SolarSystemBody``` class has two functions, ```addTrail()``` and ```explode()``` which generate different types of trails to produce the visuals of the game.
```
export class SolarSystemBody {
      // Number of Trails created on Explosion
      num_of_giblets = 100;
      
      // Called every "step" of the game to render the Canvas objects
      draw(ctx, comet) {
            this.adjust_color();
            this.adjustSize();
            this.addTrail();
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
                  size: this.radius,
                  color: JSON.parse(JSON.stringify(this.trail_color)),
                  vel: new_pos * (Math.random() * 4 + 1),//Util.scale(this.vel, -.1)
                  shrink: (Math.random() * .03 + .01),
                  vel: new_pos
            }));
      }
      
      // Triggers upon collision with certain other game objects
      explode() {
            let count = 0;
            while (count < this.num_of_giblets) {
                  let new_pos = [];
                  let new_angle = Util.toRadians((360 / Math.random(0, this.num_of_giblets)) * count);
                  new_pos[0] = Math.cos(new_angle) * this.radius / (Math.random() * 8);
                  new_pos[1] = Math.sin(new_angle) * this.radius / (Math.random() * 8);
                  this.solar_system.add(new ExplosionTrail({
                        pos: this.pos,
                        solar_system: this.solar_system,
                        size: this.radius * .75,
                        color: JSON.parse(JSON.stringify(this.trail_color)),
                        vel: new_pos,//Util.scale(this.vel, -.1),
                        shrink: (Math.random() * .01 + 0.015)
                  }));
                  count++;
            }
      }
}

```
![2022-07-26 10-24-43 (online-video-cutter com)](https://user-images.githubusercontent.com/36039557/181034229-21d8e901-081c-4220-a6ad-66898c19a3b5.gif)
### Color Shifting
The gradient-style color transitions of the main game objects and their trails is produced by having each trail and game object store their ```color``` and their ```trail_color``` as an object. A myriad of utility functions were scripted in order to manipulate and change these colors. Every object that produces Trails has a has a ```color_changes``` const variable, which determines the rate of change of their color's RGB values. This variable is randomly rerolled every half second.
```
export class SolarSystemBody {
      color_changes = [
            'red_down',
            'red_up',
            'green_down',
            'green_up',
            'blue_down',
            'blue_up'
      ]

      constructor(options) {
            // ...
            this.color = options.color || Util.randomColor();
            this.trail_color = options.trail_color || Util.randomColor();
            this.altered_color = Util.get_random(this.color_changes);
            this.variance = Math.random() * .5 + .5;      
            setInterval(this.set_adjusted_color.bind(this), 500);
      }
      
      // Randomly assigns a direction for the RGB values to trend to over time
      set_adjusted_color() {
            let old = this.altered_color;
            while (this.altered_color === old) {
                  this.altered_color = Util.get_random(this.color_changes);
            }
      }
      
      // Applies color changes, while assigning a minimum to prevent from black / black-adjacent color values for any object
      adjust_color() {
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
      }
}
```
![2022-07-26 10-23-10 (online-video-cutter com) (1)](https://user-images.githubusercontent.com/36039557/181033479-fe008edc-d1ed-4a64-9809-784b9cadd1f8.gif)
### Procedural Generation
As the player can travel through unbounded endless space, code was necessary in order to detect when the player-controlled ```Comet``` is out of the ```SolarSystem``` object, which acts a collection for all the game objects, and manage creating new game objects and deleting the old ones. To accomplish this, a larger ```Universe``` class was created which stores the ```Comet``` and ```SolarSystem```
```
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

      start() {
            let a = this;
            setInterval(function () {  
                  a.solar_system.step();          // handles movement, collision, and other logic before drawing
                  a.draw();                       // Draws everything to the Canvas
                  a.comet.bindKeyHandlers();      // handles player input
                  a.checkComet();
            }, 10)
        
      }

      // Checks to see whether the Comet is within the bounds of the SolarSystem, 
      // then generates a new one in the direction the Comet is moving
      checkComet() {
            let valid_x = [
                  this.solar_system.pos[0] - (this.solar_system.width * .3),
                  this.solar_system.pos[0] + (this.solar_system.width * 1.3)
            ]
            let valid_y = [
                  this.solar_system.pos[1] - (this.solar_system.height * .3),
                  this.solar_system.pos[1] + (this.solar_system.height * 1.3)
            ]
            if ( this.comet.pos[0] > valid_x[1] || this.comet.pos[0] < valid_x[0]
                || this.comet.pos[1] > valid_y[1] || this.comet.pos[1] < valid_y[0]) {
                  let storage = this.solar_system;
                  let new_univ_pos = [
                        this.comet.pos[0] - window.innerWidth / 2 + (this.comet.vel[0] * 100),
                        this.comet.pos[1] - window.innerHeight / 2 + (this.comet.vel[1] * 100)
                  ]
                  this.solar_system = this.generateSolarSystem(new_univ_pos);
                  this.solar_system.comet = this.comet;
                  this.comet.solar_system = this.solar_system;

                  // Transfers all the Trail objects to prevent clipping of visuals
                  this.solar_system.trails = storage.trails;
                  this.solar_system.comet_trails = storage.comet_trails;
                  this.solar_system.explosion_trails = storage.comet_trails;
                  this.solar_system.sun_explosion_trails = storage.sun_explosion_trails;
                  
            }
      }
}
```
***

### Acknowledgments
The author would like to acknowledge that the following were invaluable to understanding and using the concepts that made COlors in Space possible:

* Gabe Cuzzillo, my teacher for Action Games Studio who taught me loads about making satisfying visuals and responsive gameplay for 2D action games.
* All music is from Celeste and was used for educational purposes 
<!-- ### Implementation Timeline
My overall goals for the project involve the implementation of the following features
- Responsive and enjoyable movement based on cursor position input 
- A dynamic camera that drags behind the player based on the Comet velocity for optimal game feel
- Robust and responsive gravity physics to interacting with celestial bodies and asteroids 
- Seamless map generation so that players can fly in any direction and find stuff to interact with, including different types of "Solar Systems" with different presets. 
- Effecient garbage Collection to keep performance costs low 
- Impressive visual spectacle for planetoids based around trails and potentially other properties from APIs (Paper.js is what i'm looking at)

#### My timeline is as follows
- **Friday & Weekend**: Refactor the project so far to fit our setup guildeines. Dig into the various libraries I'm interested in and gauge the difficulty and time investment necessary to achieve some of my stretch goals. I also want to create a functional prototype of cursor-input movement, gravity physics, and dynamic camera movement. 
- **Monday**: Get basic map generation functionality in place and tweak the camera accordingly to allow for seamless, unbounded movement on the 2D plane
- **Tuesday / Wednesday / Thursday**: Once I have the above in place, the rest of my time is going to be an intensely iterative process of tweaking the following: 
   * player movement and camera to have the best game feel possible. Responsiveness and sense of motion are the most important factors 
   * the visual and auditory effects for planets, celestial bodies, and impacts and explosions. These will be the main jolts of dopemine the game is meant to provide, and the visuals can always be scaled and tweaked
   * gravity physics to tow the line between being engaging to navigate with the player object without being frustrating. It should also lead to visual spectacles which will require a lot of fine tuning to make sure the celestial bodies and their orbiting objects behave as intended. 

***

## Bonus Features
A stretch goal is implementing audio input (via video links or uploads) where sound will change the color gradients and pace of kinetic elements in the visualizer.

In addition, due to the nature of this project it will be possible to scale the visual spectacle up with more time.

One other idea is to make it a full page application where the 'camera' view is as large as the browser window. -->
