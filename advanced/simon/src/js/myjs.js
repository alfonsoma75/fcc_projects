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
   
   if ($("#start").text() === "Start") {
      
      contenido = "Stop";
      $("#0, #1, #2, #3").removeClass("noclick").addClass("siclick").on("click", function() {
        });
   }else {
      
      contenido = "Start";
      $("#0, #1, #2, #3").removeClass("siclick").addClass("noclick").off("click");
   }
   $("#start").html(contenido);
}


