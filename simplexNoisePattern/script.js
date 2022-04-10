import "./node_modules/canvas-sketch-util/random.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.height;
const height = canvas.height;

const gridw = width * 0.8;
const gridh = height * 0.8;
const cols = 10;
const rows = 10;
const nums = cols * rows;
const cellw = gridw / cols;
const cellh = gridh / rows;
const margx = (width - gridw) * 0.5;
const margy = (height - gridh) * 0.5;

let frame = 0;

const animate = function () {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < nums; i++) {
    const col = i % cols;
    const row = Math.trunc(i / rows);

    const x = cellw * col;
    const y = cellh * row;
    const w = cellw * 0.8;

    let n = random.noise2D(x + ++frame * 0.1, y, 0.001);
    const angle = n * Math.PI * 0.2;

    ctx.save();
    ctx.translate(x, y);
    ctx.translate(margx, margy);
    ctx.translate(cellw * 0.5, cellh * 0.5);

    ctx.rotate(angle);

    ctx.lineWidth = 4;
    ctx.lineWidth = ((n + 1) / 2) * 30;

    ctx.beginPath();
    ctx.moveTo(w * -0.5, 0);
    ctx.lineTo(w * 0.5, 0);
    ctx.stroke();
    ctx.restore();
  }
  requestAnimationFrame(animate);
};
animate();
