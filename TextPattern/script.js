const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.height;
const height = canvas.height;

let text = "A";

const typeCanvas = document.createElement("canvas");
const typeCtx = typeCanvas.getContext("2d");

const cell = 20;
const cols = Math.trunc(width / cell);
const rows = Math.trunc(height / cell);
const numcells = cols * rows;

typeCanvas.width = cols;
typeCanvas.height = rows;

const start = function (txt = text) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  typeCtx.clearRect(0, 0, width, height);
  typeCtx.fillStyle = "#000";
  typeCtx.fillRect(0, 0, cols, rows);

  typeCtx.fillStyle = "#fff";
  typeCtx.font = `${cols}px serif`;
  typeCtx.textBaseline = "top";

  const metrics = typeCtx.measureText(txt);
  const mx = -metrics.actualBoundingBoxLeft;
  const my = -metrics.actualBoundingBoxAscent;
  const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  const x = (cols - mw) * 0.5;
  const y = (rows - mh) * 0.5 - my;

  typeCtx.save();
  typeCtx.translate(x, y);

  typeCtx.beginPath();
  typeCtx.rect(mx, my, mw, mh);
  typeCtx.stroke();
  typeCtx.fillText(txt, 0, 0);
  typeCtx.restore();

  ctx.drawImage(typeCanvas, 0, 0);

  const typeData = typeCtx.getImageData(0, 0, cols, rows).data;
  // console.log(typeData.length, 4 * 54 * 54);

  for (let i = 0; i < numcells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = col * cell;
    const y = row * cell;

    const r = typeData[i * 4 + 0];
    const g = typeData[i * 4 + 1];
    const b = typeData[i * 4 + 2];
    const a = typeData[i * 4 + 3];

    // ctx.fillStyle = `rgba(${r} ${g} ${b} / ${a})`;
    ctx.fillStyle = `white`;

    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.translate(cell * 0.5, cell * 0.5);
    // ctx.fillRect(0, 0, cell, cell);
    // ctx.arc(0, 0, cell / 2, 0, Math.PI * 2);
    ctx.font = `${cell * 2}px serif`;

    const getGlyph = function (r, txt) {
      if (r < 50) return "";
      //   if (r < 100) return ".";
      //   if (r < 150) return "-";
      //   if (r < 200) return "+";

      const glyphs = "_=/".split("");
      return glyphs[Math.trunc(Math.random() * glyphs.length)];
    };

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(getGlyph(r, txt), 0, 0);
    // ctx.fill();
    ctx.restore();
  }
};
start(text);

setInterval(start, 500);
