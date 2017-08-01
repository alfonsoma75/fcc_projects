// objeto usuario añadir color.

$("document").ready(function() {
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#E92525";
	dibujatablero(ctx);

	// captura la pulsacion del raton
	canvas.addEventListener("click", function(e) {
		console.log(e.clientX);
		console.log(e.clientY);
	});
	
	dibujaX(ctx);
	dibujaO(ctx);
	
});

function dibujatablero(ctx) {
	ctx.beginPath();

	// Lineas horizontales
	ctx.moveTo(0,200);
	ctx.lineTo(600,200);
	ctx.moveTo(0,400);
	ctx.lineTo(600,400);

	// Lineas verticales
	ctx.moveTo(200, 0);
	ctx.lineTo(200,600);
	ctx.moveTo(400,0);
	ctx.lineTo(400,600);

	ctx.stroke();

	// mostrar tablero
	$("#mycanvas").fadeIn(500);
}

function dibujaX(ctx) {
var x = 0;
var y = 0;
	ctx.beginPath();
	ctx.moveTo(x+50,y+50);
	ctx.lineTo(x+150,y+150);
	ctx.moveTo(x+150, y+50);
	ctx.lineTo(x+50,y+150);
	ctx.stroke();
}

function dibujaO(ctx) {
	var x = 0;
	var y = 200;
	ctx.beginPath();
	ctx.arc(x+100, y+100, 50, 0, 2*Math.PI);
	ctx.stroke();
}

// Linea ganadora
// moveTo(centro cuadro inicial)
// lineTo(centro cuadro final)