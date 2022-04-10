const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 200;
const sides = 5;
const branches = 2;
const spread = 0.4;
const maxLevel = 6;
const scale = 0.8;
const color = "hsl(70, 100%, 50%)";

window.addEventListener("load", function () {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0 0 0/0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsety = 5;
  ctx.shadowBlur = 10;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    drawBranch();
    ctx.restore();
  }
});

const drawBranch = function (level = 0) {
  if (level > maxLevel) return;

  for (let i = 0; i < branches; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.scale(scale, scale);
    ctx.rotate(spread);
    drawBranch(level + 1);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(0, size, size / 10, 0, 2 * Math.PI);
    ctx.fill();
  }
};
