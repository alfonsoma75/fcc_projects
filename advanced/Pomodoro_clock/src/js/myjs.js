$(document).ready(function() {
	var minutos = 25;
	var segundos = 00;
	var descmin = 5;
	var descsec = 00;
	var agrega = agregacero(descmin);
	pausa = true;
	descanso = false;
	myvar = 0;

	
	$("#descanso").html(agrega+descmin);
	
	agrega = agregacero(minutos);
	$("#tiempo").html(agrega+minutos);
	$("#min").html(agrega+minutos);
	agrega = agregacero(segundos);
	$("#sec").html(agrega+segundos);
	
	// clean all in one function
	$("#minmin").on("click", function () {
							descmin --;
							descmin = maxmin(descmin);
							var agrega = agregacero(descmin);
							$("#descanso").html(agrega+descmin);
							
						});
	
	$("#masmin").on("click", function () {
							descmin ++;
							descmin = maxmin(descmin);
							var agrega = agregacero(descmin);
							$("#descanso").html(agrega+descmin);
						});
						
	$("#minsec").on("click", function () {
							minutos --;
							minutos = maxmin(minutos);
							var agrega = agregacero(minutos);
							$("#tiempo").html(agrega+minutos);
							$("#min").html(agrega+minutos);
							
						});
	
	$("#massec").on("click", function () {
							minutos ++;		
							minutos = maxmin(minutos);					
							var agrega = agregacero(minutos);						
							$("#tiempo").html(agrega+minutos);
							$("#min").html(agrega+minutos);
							
						});
	
	
	// Controlar si se ejecuta el tiempo de principal o el de descanso.
	// Meter el descontador en una funcion para pasarle como parametros los minutos y segundos
	// descontar(minutos, segundos)
	// ya sea del principal o del descanso.

	$("#boton").on("click", function() {

		if (pausa) {
			if (descanso) {
				descontar(descmin, descsec, pausa);
			}else {
				descontar(minutos, segundos, pausa);
			}

			$(this).html("Pausa");
			pausa = false;
		}else {
			clearInterval(myvar);
			$(this).html("Play");
			pausa = true;	
		}
	});
	
	$("#reset").on("click", function() {
			clearInterval(myvar);
			myvar = 0;
	agrega = agregacero(minutos);
			pausa = true;
			$("#boton").html("Play");
		// actualizamos la vista de minutos y segundos
		$("#min").html(agrega+minutos);
		agrega = agregacero(segundos);
		$("#sec").html(agrega+segundos);
			
	});

});

function maxmin(numero) {
	if (numero > 25) {
		numero = 1;	
	}
	if (numero < 1) {
		numero = 25;	
	}
	return numero;
}

function agregacero(numero) {
	var devuelve = "";
	if (numero<10) {
		devuelve = "0";	
	}
	
	return devuelve;

}

function descontar(minutos, segundos, pausa) {


	// realizar el descuento y la animacion.
	// regla de 3. minutos * 60 + segundos.

	myvar = setInterval(function() {

		// variables para añadir el 0;
		var scero = "";
		var mcero = "";

		// si los segundos llegan a 0, se reinician y se decrementan los minutos
		if (segundos === 0) {
			segundos = 60;
			minutos --;
		}

		// decremento de segundos
		segundos --;

		// se agrega un 0 si minutos o segundos es menor que 10, para conseguir 09
		if (minutos < 10) {
			mcero = "0";
		}
		if (segundos < 10) {
			scero = "0";
		}
			
		// actualizamos la vista de minutos y segundos
		$("#min").html(mcero+minutos);
		$("#sec").html(scero+segundos);

		// si los minutos y segundos llegan a cero, detener el contador
		if (minutos === 0 && segundos === 0) {
			clearInterval(myvar);
			myvar = 0;
			descanso = !descanso;
			
			// change this
			$("#boton").click();
			$("#boton").click();
			
		}
		
	}, 50); // 1000 espera 1 segundo


}
