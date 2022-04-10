const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 4;
const width = 60;
const height = 60;
const gap = 20;
let x, y;

for (let i = 0; i < 5; i++) {
  for (j = 0; j < 5; j++) {
    y = 100 + (height + gap) * i;
    x = 100 + (width + gap) * j;

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    if (Math.random() > 0.5) {
      ctx.beginPath();
      ctx.rect(x + 8, y + 8, width - 16, height - 16);
      ctx.stroke();
    }
  }
}
