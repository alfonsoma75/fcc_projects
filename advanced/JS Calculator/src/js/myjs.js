$("document").ready(function () {
	
	numero = ""; 
	fin = false;
	myarray= [];
	opera = [];
	
	$(".teclas").on("click", pulsado);


});

function pulsado(e) {
	
	var tecla = $(this).html();
	var muestra = "";
	
	// Si la tecla pulsada no tiene la clase numero, es un comando u operador.	
	// Si la tiene, se ha pulsado un numero, o el punto.
	if (!$(this).hasClass("numero")) {
		if( numero !== "") {			
			comprueba(tecla);
		}
	}else {
		if (isNaN(Number(numero))) {
			numero = tecla;
			opera.push(myarray[myarray.length-1]);
		}else {
			if (numero.length < 10) {
				
				numero += tecla;
			}

		}
		myarray.push(tecla);

	}

	// si la variable numero está en blanco, no hacer nada.
	// Sino, escribir la tecla pulsada, y mostrar myarray, que contiene todas las pulsaciones hechas.
	if (numero !=="" && numero.length<10 ) {
		
		$("#datos").html(numero);
		for (var i=0; i<myarray.length; i++) {
			muestra += myarray[i];
		}
		$("#total").html(muestra);
	}
	
	// Si la operacion ha finalizado, se limpian las variables y tablas.
	if (fin || Number(numero) === 0) {
		
		limpia();
		fin = false;
	}
}
function limpia() {
	numero = ""
	myarray = [];
	opera = [];	
}

function comprueba(tecla) {

	
		switch(tecla) {
		case "AC": //resetear todo a cero;
			limpia();
			$("#datos").html("0");
			$("#total").html("0");
			myarray.push(numero);
			
			break;
		case "CE": // borrar la ultima tecla pulsada
			myarray.pop();
			if (myarray.length > 0) {
				numero = myarray[myarray.length-1];
			}else {
				numero = "";
				$("#datos").html("0");
				$("#total").html("0");
			}
			break;
	
		default:
		
			if (tecla === "=") {
				// comprobar si lo ultimo en guardarse no fué un operador.
				// de ser así, se elimina.
				if (!isNaN(Number(myarray[myarray.length-1]))) {
					opera.push(Number(numero));
				
				}else {
					myarray.pop();
				}
				// llamar a la funcion que realiza la operacion
			
				if (opera.length > 1) {
					operaciones();
				}else {
					fin = true;
				}
			}else {
				
				
					if (isNaN(myarray[myarray.length-1])) {
						myarray.pop();
					}else {
						opera.push(Number(numero));
					}
							
					numero = tecla;					
					myarray.push(tecla);	
				
			}
			break;

		}
	
}


function operaciones() {
	
	var operador = opera;
	var mytotal = 0;
	var valor;
	var encadena;

	myarray.push("=");

	while (operador.length>0) {		
		
	
		// realiza las operaciones por orden de importancia.
		// al realizar la operacion, se elimina de la tabla.
		// la operacion se acumula en una variable.
		// se realiza hasta que la tabla este vacia.
		if (operador.indexOf("/") >= 0) {
			valor = operador.indexOf("/");
			mytotal = operador[valor-1] / operador[valor+1];
		}else if (operador.indexOf("X") >= 0) {
			valor = operador.indexOf("X");
			mytotal = operador[valor-1] * operador[valor+1];
		}else if (operador.indexOf("+") >= 0) {
			valor = operador.indexOf("+");	
			mytotal = (operador[valor-1] + operador[valor+1]);
		}else if (operador.indexOf("-") >= 0) {
			valor = operador.indexOf("-");
			mytotal = operador[valor-1] - operador[valor+1];
		}

		// utilizamos dos tablas para hacer la concatenaciom.
		// Asi tenemos una mejor visibilidad del codigo.
		encadena = operador.slice(0,valor-1);
		operador = operador.slice(valor+2);
		
		// Se eliminan los digitos y el operador de la tabla.
		// si la tabla aun tiene datos, se añade el total de la operacion.
		if (encadena.length>0 || operador.length>0) {
			encadena.push(mytotal);
			operador = encadena.concat(operador);
		}

	}

	mytotal = mytotal.toString(); // Se convierte a cadena para concatenar con el array principal.
	myarray.push(mytotal); // Se agrega al array que indica la operacion.
	numero = mytotal; // Se agrega a la variable numero que es la que se encarga de mostrar la tecla pulsada o el total.
	fin = true; // Activa el fin de la operacion.

}