

export const Util = {

      dist(o1, o2) {
            return Math.sqrt(
                  (o1.pos[0] - o2.pos[0]) ** 2 + (o1.pos[1] - o2.pos[1]) ** 2
            );
      },

      randomSize(min, max) {
            return Math.random() * (max - min) + min;
      },

      randomPos(minX, maxX, minY, maxY) {
            const x = Math.random() * (maxX - minX) + minX;
            const y = Math.random() * (maxY - minY) + minY;
            return [x, y];
      },

      randomVec(length) {
            const deg = 2 * Math.PI * Math.random();
            return Util.scale([Math.sin(deg), Math.cos(deg)], length)
      },

      scale(vec, m) {
            return [vec[0] * m, vec[1] * m]
      },

      myThrottle(fun, interval) { 
            //console.log("apple")
            let tooSoon = false;
            return function() {
              const args = arguments;
              const context = this;
              if (!tooSoon) {
                fun.apply(context, args);
                tooSoon = true;
                setTimeout( () => tooSoon = false, interval)
              }
            }
      },

      randomColor() {
            //return "#" + Math.floor(Math.random() * 16777215).toString(16);
            return {
                  red: Math.random() * 205 + 50,
                  green: Math.random() * 205 + 50,
                  blue: Math.random() * 205 + 50, 
                  alpha: 10,
            }
      },

      toRadians(angle) {
            return angle * (Math.PI / 180);
      },

      randomAngle() {
            return Math.random() * Math.PI * 2;
      },

      parseColor(color) {
            return `rgba(${color.red},${color.green}, ${color.blue}, ${color.alpha})`
      },

      get_random (list) {
            return list[Math.floor((Math.random()*list.length))];
      },

      canvasEL() {
            return document.getElementById("game-canvas");
      },
      cameraX(comet) {
            let canvasEl = document.getElementById("game-canvas");
            return -(canvasEl.width / 2 - comet.pos[0]) + (comet.vel[0] * 15);
      },

      cameraY(comet) {
            let canvasEl = document.getElementById("game-canvas");
            return -(canvasEl.height / 2 - comet.pos[1]) + (comet.vel[1] * 15);
      },

      blendColor(color1, color2) {
            let avg_r = (color1.r + color2.r) / 2.0;
            let avg_b = (color1.b + color2.b) / 2.0;
            let avg_g = (color1.g + color2.g) / 2.0;


            let c = {
                  r: color1.r + (avg_r / 10000), 
                  b: color1.b + (avg_b / 10000),
                  g: color1.g + (avg_g / 10000),
                  alpha: color1.alpha
            }
            
            let c2 = {
                  r: color2.r + (avg_r / 10000), 
                  b: color2.b + (avg_b / 10000),
                  g: color2.g + (avg_g / 10000),
                  alpha: color2.alpha
            }
            c = JSON.parse(JSON.stringify(c))
            c2 = JSON.parse(JSON.stringify(c2))

            return [c, c2]

      },

      tweakColor(color) {
            let new_color = {
                  r: color.r + (Math.random() * 10 * (Math.round(Math.random()) ? 1 : -1)),
                  g: color.g + (Math.random() * 10 * (Math.round(Math.random()) ? 1 : -1)), 
                  b: color.g + (Math.random() * 10 * (Math.round(Math.random()) ? 1 : -1)),
                  alpha: color.alpha
            }

            if (new_color.r > 255) {
                  new_color.r = 255
            } 
            if (new_color.r < 0) {
                  new_color.r = 0
            }
            if (new_color.g > 255) {
                  new_color.g = 255
            } 
            if (new_color.g < 0) {
                  new_color.g = 0
            }
            if (new_color.b > 255) {
                  new_color.b = 255
            } 
            if (new_color.b < 0) {
                  new_color.b = 0
            }

            return new_color
            
      }
          
}

