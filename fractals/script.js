const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 200;
const sides = 5;
const branches = 2;
const spread = 0.4;
const maxLevel = 4;
const scale = 0.5;
const color = "hsl(70, 100%, 50%)";

window.addEventListener("load", function () {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;

  ctx.lineCap = "round";
  ctx.lineWidth = 10;
  ctx.shadowColor = "rgba(0 0 0/0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = color;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    drawBranch();
  }
  ctx.restore();
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

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.scale(scale, scale);
    ctx.rotate(-spread);
    drawBranch(level + 1);
    ctx.restore();
  }
};
