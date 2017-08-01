// Objeto para controlar los jugadores, fichas y puntuacion
var jugadores = jugadores = {
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

      // Este if controla que no se pueda pulsar nada si está jugando la cpu
      if ((e.button === 0 && jugadores[actual]["nombre"] !== "cpu") || (jugadores[actual]["nombre"] === "cpu" && typeof e.button === "undefined")) {
         
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
      }
   });
   
});
function reset() {
   
   // inicializar variables
   jugadores["jugador1"]["ficha"] = ""
   jugadores["jugador2"]["nombre"] = ""
   jugadores["jugador2"]["ficha"] = ""

   // Siempre empieza jugador1
   actual = "jugador1";
   
   // Vaciamos el controlador de las fichas del tablero
   intercambio = {
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
   
   // mostrar puntuación
   $("#playerone").html(jugadores["jugador1"]["puntos"]);
   $("#playertwo").html(jugadores["jugador2"]["puntos"]);
   
   // ocultar el tablero si es reset de partida
   $(".tablero").hide();
   
   // Vaciar tablero
   $("#uno, #dos, #tres, #cuatro, #cinco, #seis, #siete, #ocho, #nueve").html("");
   
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
   if (jugadores[actual]["nombre"] === "cpu") {
      juegacpu();

      
   }
}

function juegacpu() {   
   var myarray = [];
  
   // creamos una tabla con las partes en blanco
   for (var i in intercambio) {
      if (intercambio[i] === "") {
         myarray.push(i);
      }
   }
   var aleatorio = Math.floor(Math.random() * myarray.length) ;

   setTimeout(function() {
      $("#" + myarray[aleatorio]).click();
   }, 1000);
   
   
}

function comprueba(intercambio) {
   var array = []; // Utilizada para revisar si hay tres en raya
   var completo = []; // utilizada para saber si el tablero está completo y finalizar la partida
   
   // Comprueba la ficha y en los lugares puesta
   for (var i in intercambio) {
      // si no es "" se suma el contador
      
      if (intercambio[i] === jugadores[actual]["ficha"]) {
         array.push(i);
      }
      if (intercambio[i] === "") {
         completo.push(i);
      }
   }
   
   // Revisa si se hace tres en raya
   // horizontal
   if (array.indexOf("uno")>=0 && array.indexOf("dos")>=0 && array.indexOf("tres")>=0) {
      $("#uno, #dos, #tres").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
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
   // Si no hay ganador y el tablero está completo finalizar
   if (completo.length === 0) {
      return true;
   }
   // si el contador es igual a la longitud del objeto y despues de comprobar la partida se acaba
   
   return false
}