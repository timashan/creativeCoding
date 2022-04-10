const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const degToRad = (deg) => deg * (Math.PI / 180);
const randomRange = (min, max) => Math.random() * (max - min) + min;

const width = canvas.height;
const height = canvas.height;

const w = width * 0.01;
const h = height * 0.1;
const cx = width * 0.5;
const cy = height * 0.5;
const radius = width * 0.3;

const num = 40;

for (let i = 0; i < num; i++) {
  const slice = degToRad(360 / num);
  const angle = slice * i;
  const x = cx + radius * Math.sin(angle);
  const y = cy + radius * Math.cos(angle);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-angle);

  ctx.beginPath();
  ctx.scale(randomRange(0.1, 2), randomRange(0.2, 0.5));
  ctx.rect(-w * 0.5, randomRange(0, -h * 0.5), w, h);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineWidth = randomRange(5, 20);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.arc(
    0,
    0,
    radius * randomRange(0.7, 1.3),
    slice * randomRange(1, -8),
    slice * randomRange(1, 5)
  );
  ctx.stroke();
  ctx.restore();
}
