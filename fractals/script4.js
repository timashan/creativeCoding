const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let size;
let pointX;
let pointY;
const sides = 3;
const branches = 1;
const spread = -0.2;
const maxLevel = 8;
const scale = 0.8;
const color = "hsl(70, 100%, 50%)";

const drawFractal = function () {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;

  size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  pointX = 0;
  pointY = size;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 30;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0 0 0/0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsety = 5;
  ctx.shadowBlur = 10;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    ctx.scale(0.95, 0.95);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    drawBranch();
    ctx.restore();
  }
};

const drawBranch = function (level = 0) {
  if (level > maxLevel) return;

  for (let i = 0; i < branches; i++) {
    ctx.beginPath();
    ctx.moveTo(0, size);
    // ctx.lineTo(size, 0);
    ctx.bezierCurveTo(
      0,
      size * spread * -3,
      size * 5,
      size * 10 * spread,
      0,
      0
    );
    ctx.stroke();

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.scale(scale, scale);
    ctx.rotate(spread);
    drawBranch(level + 1);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(-size / 2, 0, 40, 0, 2 * Math.PI);
    ctx.fill();
  }
};

window.addEventListener("load", drawFractal);
window.addEventListener("resize", drawFractal);
