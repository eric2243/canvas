window.onload = function() {
	canvas = document.getElementById("canvas");
	var canvasWidth = 100;
	var canvasHeight = 100;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
	var ctx = canvas.getContext("2d");
	var r = canvas.width / 2;
	var rem = canvas.width / 100;
function drawBackground() {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 6 * rem;
	ctx.arc(0, 0, (r - 4) * rem, 0, 2 * Math.PI, false);
	ctx.stroke();
	var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 15* rem + "px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "moddle";
	hourNumbers.forEach( function(number, i) {
	var rad = 2 * Math.PI / 12 * i;
	var x = Math.cos(rad) * (r - 23) * rem;
	var y = Math.sin(rad) * (r - 23) * rem;
	ctx.fillText(number, x, y);
	});
	for(i = 0; i < 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 11) * rem;
		var y = Math.sin(rad) * (r - 11) * rem;
		ctx.beginPath();
		if(i % 5 == 0 ) {
			ctx.fillStyle = "#000";
			ctx.arc(x, y, 2 * rem , 0, 2 * Math.PI, false); 
		}else {
			ctx.fillStyle = "#ccc";
			ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false); 
		}
		ctx.fill();

	}
}
function drawHour(hour, minute) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute; 
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = "round";
	ctx.moveTo(0, 3 * rem);
	ctx.lineTo(0, -r / 3);
	ctx.stroke();
	ctx.restore();
}
function drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 2 * rem;
	ctx.lineCap = "round";
	ctx.moveTo(0, 3 * rem);
	ctx.lineTo(0, -r + 20 * rem);
	ctx.stroke();
	ctx.restore();	
}
function drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#f00";
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 10 * rem);
	ctx.lineTo(2 * rem, 10 * rem);
	ctx.lineTo(1, -r + 18 * rem);
	ctx.lineTo(-1, -r + 18 * rem);
	ctx.fill();
	ctx.restore();		
}
function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
	ctx.fill();
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);
}