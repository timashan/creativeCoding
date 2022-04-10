const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const mouse = { x: 0, y: 0 };

class FlowFieldEffect {
  #ctx;
  #width;
  #height;
  #cellSize = 15;
  #lastStamp = 0;
  #timer = 0;
  #interval = 1000 / 60;
  #radius = 4;
  #vr = 0.03;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
  }
  #drawLine(x, y) {
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    let distance = dx * dx + dy * dy;
    if (distance > 600000) distance = 600000;
    else if (distance < 100000) distance = 100000;
    const length = distance / 10000;

    this.#ctx.lineWidth = 1;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    const angle =
      (Math.cos(x * 0.00001 * mouse.x) + Math.sin(y * 0.00001 * mouse.y)) *
      this.#radius;
    this.#ctx.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length
    );
    this.#ctx.stroke();
  }

  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.6", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.#lastStamp;
    this.#lastStamp = timestamp;

    if (this.#timer > this.#interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      if (this.#radius > 5 || this.#radius < -5) this.#vr *= -1;
      this.#radius += this.#vr;

      for (let y = 0; y < this.#height; y += this.#cellSize) {
        for (let x = 0; x < this.#width; x += this.#cellSize) {
          this.#drawLine(x, y);
        }
      }

      this.#timer = 0;
    } else {
      this.#timer += deltaTime;
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

const init = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const flowFieldEffect = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowFieldEffect.animate(0);
};

window.onload = init;
window.addEventListener("resize", init);

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});
