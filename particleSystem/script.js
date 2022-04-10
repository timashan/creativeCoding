const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const random = (min, max) => Math.random() * (max - min) + min;
const getDistance = (x, y) => Math.sqrt(x * x + y * y);

canvas.width = this.innerWidth;
canvas.height = this.innerHeight;

window.addEventListener("resize", function (e) {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
});

const mouse = { x: 0, y: 0 };
const particleArr = [];
let hue = 0;

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = random(1, 15);
    this.speedX = random(-1.5, 1.5);
    this.speedY = random(-1.5, 1.5);
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 2; i++) {
    particleArr.push(new Particle());
  }
});

const animate = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = "rgba(5 5 5/0.1)";
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);

  hue++;
  for (let i = 0; i < particleArr.length; i++) {
    const particle = particleArr[i];
    particle.draw();
    particle.update();
    if (particle.size < 0.2) {
      particleArr.splice(i, 1);
      i--;
    }

    for (j = i + 1; j < particleArr.length; j++) {
      const other = particleArr[j];
      const distance = getDistance(particle.x - other.x, particle.y - other.y);

      if (distance < 100) {
        ctx.beginPath();
        ctx.lineWidth = particle.size / 4;
        ctx.strokeStyle = particle.color;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
};
animate();
