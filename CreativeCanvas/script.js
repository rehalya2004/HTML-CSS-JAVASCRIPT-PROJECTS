const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brushShapeSelect = document.getElementById("brushShape");
const colorPicker = document.getElementById("colorPicker");
const increaseSizeButton = document.getElementById("increaseSize");
const decreaseSizeButton = document.getElementById("decreaseSize");
const brushSizeSpan = document.getElementById("brushSize");
const clearCanvasButton = document.getElementById("clearCanvas");
const downloadButton = document.getElementById("download");

let brushSize = 10;
let brushColor = "#000000";
let brushShape = "circle";
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function drawShape(x, y) {
  ctx.beginPath();
  if (brushShape === "circle") {
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
  } else if (brushShape === "square") {
    ctx.rect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  }
  ctx.fillStyle = brushColor;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = brushColor;
  ctx.lineWidth = brushSize;
  ctx.stroke();
}

function updateBrushSize() {
  brushSizeSpan.textContent = brushSize;
}

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const x = e.offsetX;
  const y = e.offsetY;
  drawShape(x, y);
  drawLine(lastX, lastY, x, y);
  [lastX, lastY] = [x, y];
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

increaseSizeButton.addEventListener("click", () => {
  brushSize += 5;
  if (brushSize > 50) brushSize = 50;
  updateBrushSize();
});

decreaseSizeButton.addEventListener("click", () => {
  brushSize -= 5;
  if (brushSize < 5) brushSize = 5;
  updateBrushSize();
});

colorPicker.addEventListener("change", () => {
  brushColor = colorPicker.value;
});

clearCanvasButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

brushShapeSelect.addEventListener("change", () => {
  brushShape = brushShapeSelect.value;
});