// Objeto para controlar los jugadores, fichas y puntuacion
var jugadores = {};

// Objeto donde se insertan las jugadas
var intercambio = {};

// Jugador actual en la partida
var actual = "";

$("document").ready(function() {
   
   // Llamada a iniciar variables
   reset();
   
   // control de pulsacion de inicio de partida
   $("#play").on("click", function(e) {
      $("#presentacion").hide(500);
      $("#jugadores").fadeIn(500);    
   });
   
   // Control de muestra de jugadores
   $("#unjugador, #dosjugadores").on("click", function(e) {
      if (this.id === "dosjugadores") {
         jugadores["jugador2"]["nombre"] = "jugador 2"
      }else {
         jugadores["jugador2"]["nombre"] = "cpu"
      }
      $("#jugadores").hide(500);
      $("#ficha").fadeIn(500);
   });
   
   // Control de seleccion de ficha
   $("#equis, #circulo").on("click", function() {
      if (this.id === "equis") {
         jugadores["jugador1"]["ficha"] = "X";
         jugadores["jugador2"]["ficha"] = "O";
      }else {
         jugadores["jugador1"]["ficha"] = "O";
         jugadores["jugador2"]["ficha"] = "X";
      }
      $("#ficha").hide(500);
      $(".tablero").fadeIn(500);      
   });
   
   // Control de clicks en el tablero
   $("#uno, #dos, #tres, #cuatro, #cinco, #seis, #siete, #ocho, #nueve").on("click", function(e) {
      
      $(this).html(jugadores[actual]["ficha"]);
      intercambio[this.id] = jugadores[actual]["ficha"];
      
      // Se revisa si se ha terminado el juego
      if (comprueba(intercambio)) {
         // revisar forma en la que ha terminado
         //fin();
         // Se reinicia la partida
         reset(); // controlar puntuacion
      }else {
         // si la partida continua se cambia de jugador
         cambiarjugador();
      }
   })
   
});
function reset() {
   
   // inicializar variables
   jugadores = {
      jugador1: {
         nombre: "jugador1",
         ficha: "",
         puntos: 0
      },
      jugador2: {
         nombre: "",
         ficha: "",
         puntos: 0
      }
   };
   
   actual = "jugador1";
   
   var intercambio = {
      uno: "",
      dos: "",
      tres: "",
      cuatro: "",
      cinco: "",
      seis: "",
      siete: "",
      ocho: "",
      nueve: ""
   };
   
   // ocultar el tablero si es reset de partida
   $(".tablero").hide();
   
   // mostrar presentacion
   $("#presentacion").fadeIn(1000);
}



function cambiarjugador() {
   // revisar si el jugador es el 2 o la cpu
   // Cambia de jugador.
   if (actual === "jugador1") {
      actual = "jugador2";
   }else {
      actual = "jugador1";
   }
}

function comprueba(intercambio) {
   var array = []
   // variable contador
   
   // Comprueba la ficha y en los lugares puesta
   for (var i in intercambio) {
      // si no es "" se suma el contador
      
      if (intercambio[i] === jugadores[actual]["ficha"]) {
         array.push(i);
      }
   }
   
   // Revisa si se hace tres en raya
   // horizontal
   if (array.indexOf("uno")>=0 && array.indexOf("dos")>=0 && array.indexOf("tres")>=0) {
      return true
   }
   if (array.indexOf("cuatro")>=0 && array.indexOf("cinco")>=0 && array.indexOf("seis")>=0) {
      return true
   }
   if (array.indexOf("siete")>=0 && array.indexOf("ocho")>=0 && array.indexOf("nueve")>=0) {
      return true
   }
   
   // vertical
   if (array.indexOf("uno")>=0 && array.indexOf("cuatro")>=0 && array.indexOf("siete")>=0) {
      return true
   }
   if (array.indexOf("dos")>=0 && array.indexOf("cinco")>=0 && array.indexOf("ocho")>=0) {
      return true
   }
   if (array.indexOf("tres")>=0 && array.indexOf("seis")>=0 && array.indexOf("nueve")>=0) {
      return true
   }
   
   // Diagonal
   if (array.indexOf("uno")>=0 && array.indexOf("cinco")>=0 && array.indexOf("nueve")>=0) {
      return true
   }
   if (array.indexOf("tres")>=0 && array.indexOf("cinco")>=0 && array.indexOf("siete")>=0) {
      return true
   }
   //
   // si el contador es igual a la longitud del objeto y despues de comprobar la partida se acaba
   
   return false
}