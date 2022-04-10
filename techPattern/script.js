const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

const randomRange = (min, max) => Math.random() * (max - min) + min;
const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

const width = canvas.height;
const height = canvas.height;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(other) {
    const x = this.x - other.x;
    const y = this.y - other.y;

    return Math.sqrt(x * x + y * y);
  }
}

class Agent {
  constructor() {
    this.pos = new Vector(randomRange(0, width), randomRange(0, height));
    this.vel = new Vector(randomRange(-1, 1), randomRange(-1, 1));
    this.radius = randomRange(4, 12);
  }

  update() {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 4;
    ctx.fillStyle = "white";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

const agents = [];

for (let i = 0; i < 40; i++) {
  const agent = new Agent();
  agent.draw(ctx);
  agents.push(agent);
}

const animate = function () {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];

    for (let j = i + 1; j < agents.length; j++) {
      const other = agents[j];
      const distance = agent.pos.getDistance(other.pos);

      if (distance > 200) continue;

      ctx.lineWidth = mapRange(distance, 0, 200, 12, 1);

      ctx.beginPath();
      ctx.moveTo(agent.pos.x, agent.pos.y);
      ctx.lineTo(other.pos.x, other.pos.y);
      ctx.stroke();
    }
  }

  agents.forEach((agent) => {
    agent.update();
    agent.draw(ctx);
  });
  requestAnimationFrame(animate);
};
animate();