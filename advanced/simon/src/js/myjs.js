

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
   
	var fin = 25;
	var jugador = false;
	error = false;
	jugada = [];
	cuenta = 1;
	jugar(fin, 0, jugador);
}

function jugar(fin, cont, jugador) {
	
	if (cont <= fin) {
		
		
		
		var colores = ["azul", "amarillo", "rojo", "verde"];
		var number;
		var texto;
		//var i = 0;

		//$("#movimiento").text("--");

		if (jugador != true) {
			if (error != true) {
				number = Math.floor(Math.random() * 4); // color de jugada
				jugada.push(number); // guardamos jugada
				error = false;
				
			}

			cpu(texto, colores, jugada.length, 0, fin, cont);
			
			 cuenta = 1;
		}else {

			// while jugada < len jugada
			//jugador(texto, number, i, colores, cuenta, 0);
		contador = jugada.length;
		  
			if (cuenta <= contador) {
		
				$("#0, #1, #2, #3").removeClass("noclick").addClass("siclick").on("click", juega);
			}else {
				cuenta ++;
		   		setTimeout(jugar, 1000, 26, cuenta, false);
		
			}

		}
	}
	//jugar(fin, cont);
   
}

function cpu(texto, colores, contador, cuenta) {
   if (cuenta < contador) {
      texto = "";
	   var number = jugada[cuenta];
/*      number = Math.floor(Math.random() * 4); // color de jugada

      jugada.push(number); // guardamos jugada*/

      // si la jugada es menor de 10 agregar un cero
      if (contador < 10) {
         texto = "0";
      }

      // mostramos la pulsacion del color
	 setTimeout(function() {

      $("#" + number.toString()).removeClass(colores[number]).addClass(colores[number]+"click");
		 $("#movimiento").text(texto + contador.toString());
	 }, 1000);

      setTimeout(function() {$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
							}, 2000);
      //$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
      setTimeout(cpu, 2000, texto, colores, contador, cuenta+1);
      
   }else {
	   // Si ya se han mostrado la cantidad total de colores, se vuelve a llamar a la funcion
	   // enviando true para pasar al jugador
	  
	   setTimeout(jugar, 1000, 25, contador, true);
   }
}


function juega() {
   
//	contador = jugada.length;
		  $("#0, #1, #2, #3").off("click");
//	if (cuenta <= contador) {

	// si las jugadas son inferiores a las totales
	   if (this.id === jugada[cuenta-1].toString()) { // mientras no se falle en modo estricto
		  console.log("correcto");
		   cuenta ++;
		  setTimeout(jugar, 1000, 26, cuenta, true);
	   }else {
		  console.log("Fallo");
			   $("#movimiento").text("!!");
		   setTimeout(function() {
			   $("#movimiento").text("--");
		   }, 1000);
		   cuenta = 1;
		   error = true;
		  setTimeout(jugar, 1000, 26, 0, false);
		   // si es modo estricto empezar de nuevo
			// si es fallo sin esttricto el contador de aciertos a cero
	   }   
	
	
}