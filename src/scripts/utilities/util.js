

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
      }
          
}

