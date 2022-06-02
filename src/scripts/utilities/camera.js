

export class Camera {
      constructor(options) {
            this.comet = options.comet;
            this.universe = options.universe;
            this.width = options.width || window.innerWidth;
            this.height = options.height || window.innerHeight;
            this.zoom = options.zoom || .02;
      }


      adjustPos(ctx) {
            
      }

      adjustZoom(ctx) {
            
      }

      x() {
            return -(this.universe.el.width / 2 - this.comet.pos[0]);
      }

      y() {
            return -(this.universe.el.height / 2 - this.comet.pos[1]);

      }
}