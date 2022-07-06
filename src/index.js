
import { Universe } from "./scripts/universe.js";

window.count = 0;
window.board_offset = 16;
setInterval(function () { window.count++ }, 10);

document.addEventListener("DOMContentLoaded", () => {
      document.getElementById('start-button').classList.replace('hidden', 'visible');
      document.getElementById('title').classList.replace('hidden', 'visible');
      document.getElementById('sound').classList.replace('hidden', 'visible');
      document.getElementById("instructions").classList.replace('hidden', 'visible');

      const canvasEl = document.getElementById("game-canvas");
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight - window.board_offset;

      const ctx = canvasEl.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      document.getElementById("start-button").addEventListener("click", function (event) {
            if (event.currentTarget.classList.contains('visible')) {
                  document.getElementById("start-button").classList.replace('visible', 'hidden');
                  document.getElementById("title").classList.replace('visible', 'hidden');
                  document.getElementById("sound").classList.replace('visible', 'hidden');
                  document.getElementById("instructions").classList.replace('visible', 'hidden');

                  setTimeout(function () {
                        
                        document.getElementById('sound').classList.add('anchor');
                        document.getElementById('sound').classList.replace('hidden', 'visible');
                  }, 1000);

                  //document.getElementById("start-button").classList.add('hidden');
                  let univ = new Universe(ctx);
                  //document.getElementById("audiotag1").play()
            }
      });

      document.getElementById('sound').addEventListener('click', function (event) {
            let sound = document.getElementById("audiotag1");
            if (sound.paused) {
                  sound.play()
            } else {
                  sound.pause();
                  sound.currentTime = 0;
                  sound.src = sound.src;
            }
      })
      
});

window.addEventListener('resize', () => {
      const canvasEl = document.getElementById("game-canvas");
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight  - window.board_offset;
})

