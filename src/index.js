
import { Universe } from "./scripts/universe.js";

window.count = 0;
window.board_offset = 16;
setInterval(function () { window.count++ }, 10);

document.addEventListener("DOMContentLoaded", () => {
      document.getElementById('start-button').classList.replace('hidden', 'visible');
      document.getElementById('title').classList.replace('hidden', 'visible');

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

                  //document.getElementById("start-button").classList.add('hidden');
                  let univ = new Universe(ctx);
                  document.getElementById("audiotag1").play()
            }
      })
      
});

window.addEventListener('resize', () => {
      const canvasEl = document.getElementById("game-canvas");
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight  - window.board_offset;
})