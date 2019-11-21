const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const openBtn = document.getElementById("jsOpen");
const openDialog = document.getElementById("jsDialog");

const INIT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath(); //이건 필요 없을거 같은데.
        ctx.moveTo(x, y);
    }
    {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth;
}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS.png";
    link.click();
}

function loadImage(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 700, 700);
        };
        img.src = e.target.result;
    };
}

function handleDialogChange(event) {
    let files = event.target.files;
    let file;
    if (files && files.length > 0) {
        file = files[0];
        loadImage(file);
    }
}

function handleOpenClick() {
    if (openDialog) {
        openDialog.click();
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );
}
if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (openBtn) {
    openBtn.addEventListener("click", handleOpenClick);
}

if (openDialog) {
    openDialog.addEventListener("change", handleDialogChange);
}
