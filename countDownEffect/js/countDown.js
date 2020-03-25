var canvasWidth = 1000;
var canvasHeight = 800;
var digit = digit;
var radius = 8;
var margin_left = 30;
var margin_top = 60;
const endTime = new Date(2020, 10, 19, 0, 0, 0);
var curShowTimeSeconds = 0; 
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function() {
	var canvas = document.getElementById("container");
	ctx = canvas.getContext("2d");	
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
    window_height = canvas.height;
    window_width = canvas.width;
	curShowTimeSeconds = getCurShowTimeSeconds();
	setInterval(function() {
		render(ctx);
		update();
	},50)
}
function update() {
	var nextShowTime = getCurShowTimeSeconds();
	var nextH = parseInt(nextShowTime / 3600);
	var nextM = parseInt((nextShowTime - nextH * 3600) / 60);
	var nextS = (nextShowTime % 60);

	var curH = parseInt(curShowTimeSeconds / 3600),
		curM = parseInt((curShowTimeSeconds - curH * 3600) / 60),
		curS = (curShowTimeSeconds % 60);
		if(nextS != curS) {
			if(parseInt(curH / 10) != parseInt(nextH / 10)) {
				addBalls(margin_left + 0, margin_top, parseInt(curH / 10));
			}
			if( curH % 10 != nextH % 10 ) {
				addBalls(margin_left + 15 * ( radius +1 ), margin_top, curH % 10 );
			}
			if(parseInt(curM / 10) != parseInt(nextM / 10)) {
				addBalls(margin_left + 39 * ( radius + 1 ), margin_top, parseInt(curM / 10));
			}
			if( curM % 10 != nextM % 10 ) {
				addBalls(margin_left + 54 * ( radius + 1 ), margin_top, curM % 10 );
			}
			if(parseInt(curS / 10) != parseInt(nextS / 10)) {
				addBalls(margin_left + 78 * ( radius + 1 ), margin_top, parseInt(curS / 10));
			}
			if( curS % 10 != nextH % 10 ) {
				addBalls(margin_left + 93 * ( radius + 1 ), margin_top, curS % 10 );
			}
			curShowTimeSeconds = nextShowTime;
		}
		updateBalls();
}
function updateBalls() {
	for( var i = 0; i < balls.length; i++ ) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if( balls[i].y >= window_height - radius ) {
			balls[i].y = window_height - radius;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
}
function addBalls(x, y, num) {
	for( var i = 0; i < digit[num].length; i++ ) {
		for( var j = 0; j < digit[num][i].length; j++ ) {
			if( digit[num][i][j] == 1 ) {
				var aBall = {
					x: x + j * 2 * ( radius + 1 ),
					y: y + i * 2 * ( radius + 1 ),
					g: 1.5 + Math.random(),
					vx: Math.pow( -1, Math.ceil( Math.random() * 1000) ) *4,
					vy: -5,
					color: colors[Math.floor( Math.random() * colors.length )]
				}
				balls.push( aBall );
			}
		}
	}
}
function getCurShowTimeSeconds() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	return ret >= 0 ? ret : 0;
}
function render(ctx) {
	ctx.clearRect(0, 0, window_width, window_height);
	var hours = parseInt(curShowTimeSeconds / 3600),
		minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60),
		seconds = (curShowTimeSeconds % 60);
	renderDigit(margin_left, margin_top, parseInt(hours / 10), ctx);
	renderDigit(margin_left + 15 * (radius + 1), margin_top, (hours % 10), ctx);
	renderDigit(margin_left + 30 * (radius + 1), margin_top, 10, ctx);
	renderDigit(margin_left + 39 * (radius + 1), margin_top, parseInt(minutes / 10), ctx);
	renderDigit(margin_left + 54 * (radius + 1), margin_top, (minutes % 10), ctx);
	renderDigit(margin_left + 69 * (radius + 1), margin_top, 10, ctx);
	renderDigit(margin_left + 78 * (radius + 1), margin_top, parseInt(seconds / 10), ctx);
	renderDigit(margin_left + 93 * (radius + 1), margin_top, (seconds % 10), ctx);
	for(var i = 0; i < balls.length; i++ ) {
		ctx.fillStyle = balls[i].color;
		ctx.beginPath();
		ctx.arc( balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.fill(); 
	}
}
function renderDigit(x, y, num,ctx) {
	ctx.fillStyle = "rgb(0, 102, 153)";
	for(var i=0; i < digit[num].length; i++) {
		for(var j=0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				ctx.beginPath();
				ctx.arc(x + j * 2 * (radius + 1) + (radius + 1), y + i * 2 * (radius + 1) + (radius + 1), radius, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}
