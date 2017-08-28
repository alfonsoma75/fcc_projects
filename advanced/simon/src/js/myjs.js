

$("document").ready(function() {
  
   $("#activa").on("click", inicia);
});

//activa o desactiva el juego. NO INICIA PARTIDA.
function inicia() {
   
   
   // Cambiamos texto de boton en funcion si esta on/off
   if ($("#onoff").hasClass("on")) {
      
	  // mueve el boton a off
      $("#onoff").removeClass("on").addClass("off");
	  // Cambia la clase cuenta para desactivarla
	  $("#movimiento").removeClass("cuentaon").addClass("cuentaoff");
    
      // Deshabilitamos el boton
      $("#start").off("click");
   }else {
	   // mueve el boton a on
      $("#onoff").removeClass("off").addClass("on");
	   // Cambia clase cuenta para activar
	  $("#movimiento").removeClass("cuentaoff").addClass("cuentaon");
      /*if ($("#start").text("Stop")) {
         $("#start").click();
      }*/
            // Habilitamos el boton
      $("#start").on("click", play);
   }
   
   /*$("#onoff").html(contenido);*/
   $("#movimiento").html("--");
}

// inicia partida
function play() {
   
	var fin = 26;
	var jugador = false;
	jugar(fin, 0);
}

function jugar(fin, cont, jugador) {
	
	if (cont < fin) {
		
		jugada = [];
		cuenta = 1;
		var colores = ["azul", "amarillo", "rojo", "verde"];
		var number;
		var texto;
		var i = 0;

		$("#movimiento").text("--");

		if (jugador != true) {
                    
			cpu(texto, number, i, colores, cuenta, 0, fin, cont);
			
		}else {

			// while jugada < len jugada
			//jugador(texto, number, i, colores, cuenta, 0);
			$("#0, #1, #2, #3").removeClass("noclick").addClass("siclick").on("click", juega);

		}
	}
	//jugar(fin, cont);
   
}

function cpu(texto, number, i, colores, cuenta, contador, fin, cont) {
   if (contador < cuenta) {
      texto = "";

      number = Math.floor(Math.random() * 4); // color de jugada

      jugada.push(number); // guardamos jugada

      // si la jugada es menor de 10 agregar un cero
      if (cuenta < 10) {
         texto = "0";
      }

      // mostramos la pulsacion del color
	 setTimeout(function() {

      $("#" + number.toString()).removeClass(colores[number]).addClass(colores[number]+"click");
		 $("#movimiento").text(texto + cuenta.toString());
	 }, 1000);

      setTimeout(function() {$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
							}, 2000);
      //$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
      setTimeout(cpu, 2000, texto, number, i, colores, cuenta, contador+1, fin, cont);
      
   }else {
	   // Si ya se han mostrado la cantidad total de colores, se vuelve a llamar a la funcion
	   // enviando true para pasar al jugador
	   setTimeout(jugar, 3000, fin, cont, true);
   }
}

/*function jugador(texto, number, i, colores, cuenta, contador) {
	if (contador < cuenta) {
		setTimeout(function() {
			$("#0, #1, #2, #3").removeClass("noclick").addClass("siclick").on("click", juega);
		}, 3000);
	}
}*/

function juega() {
   
	
	// si las jugadas son inferiores a las totales
   if (this.id === jugada[0].toString()) { // mientras no se falle en modo estricto
      console.log("correcto");
      jugador = false;
      cuenta ++;
      $("#0, #1, #2, #3").off("click");
   }else {
      console.log("Fallo");
	   // si es modo estricto empezar de nuevo
		// si es fallo sin esttricto el contador de aciertos a cero
   }           
    // Sino se llama a la funcion jugar con el usuario en falso y cont +1
	
	
}