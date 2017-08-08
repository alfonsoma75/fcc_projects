

$("document").ready(function() {
  
   $("#onoff").on("click", inicia);
});

//activa o desactiva el juego. NO INICIA PARTIDA.
function inicia() {
   
   var contenido = "";
   var arranque = "";
   
   // Cambiamos texto de boton en funcion si esta on/off
   if ($("#onoff").text() === "On") {
      
      contenido = "Off";
      arranque = "--";
      // Habilitamos el boton
      $("#start").removeAttr("disabled").on("click", play);
   }else {
      if ($("#start").text("Stop")) {
         $("#start").click();
      }
      contenido = "On";
      arranque = "";
      $("#start").attr("disabled", "disabled").off("click");
   }
   
   $("#onoff").html(contenido);
   $("#movimientos").html(arranque);
}

// inicia partida
function play() {
   
   var contenido = "";
   var jugador = false;
   jugada = [];
   cuenta = 1;
   var colores = ["azul", "amarillo", "rojo", "verde"];
   var number;
   var texto;
   var i = 0;
   
   if ($("#start").text() === "Start") {
      
      contenido = "Stop";
      //while (cuenta < 20) {
        
         if (jugador === false) {
            jugador = true;
           // cuenta ++;
                     
           cpu(texto, number, i, colores, cuenta);
              //$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
           }

       

            $("#0, #1, #2, #3").removeClass("noclick").addClass("siclick").on("click", function() {
                  console.log(this.id);
               });
   }else {
      
      contenido = "Start";
      $("#0, #1, #2, #3").removeClass("siclick").addClass("noclick").off("click");
      $("#movimientos").text("--");
   }
   $("#start").html(contenido);
    console.log(jugada);
}

function cpu(texto, number, i, colores, cuenta) {
   if (cuenta < 5) {
   texto = "";

   number = Math.floor(Math.random() * 4); // color de jugada
   
   jugada.push(number); // guardamos jugada

   // si la jugada es menor de 10 agregar un cero
   if (cuenta < 10) {
      texto = "0";
   }

   $("#movimientos").text(texto + cuenta.toString());
   // mostramos la pulsacion del color
      setTimeout(function() {
         
   $("#" + number.toString()).removeClass(colores[number]).addClass(colores[number]+"click");
      }, 1000);

setTimeout(function() {$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);}, 2000);
   //$("#" + number.toString()).delay(20000).removeClass(colores[number]+"click").addClass(colores[number]);
  setTimeout(cpu, 2000, texto, number, i, colores, cuenta+1);
   }
}
