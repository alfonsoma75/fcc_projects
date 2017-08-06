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

// controla empate
var empate;

$("document").ready(function() {
   
   // Llamada a iniciar variables
   reset(true);
   
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
      $("#cuadricula").fadeIn(500);
      $("#juega").html(jugadores[actual]["nombre"]).fadeIn(500);
   });
   
   // Boton de reinicio del juego
   $("#resetea").on("click", function() {
      $("#jugadores, #ficha").hide();
      reset(true);
   });
   
   // Control de clicks en el tablero
   $("#uno, #dos, #tres, #cuatro, #cinco, #seis, #siete, #ocho, #nueve").on("click", function(e) {

      // Este if controla que no se pueda pulsar nada si está jugando la cpu
      if ((e.button === 0 && jugadores[actual]["nombre"] !== "cpu") || (jugadores[actual]["nombre"] === "cpu" && typeof e.button === "undefined")) {
         
         // Se pone la ficha siempre que no haya una ya puesta
         if ($(this).html() === "") {
            $(this).html(jugadores[actual]["ficha"]);
            intercambio[this.id] = jugadores[actual]["ficha"];

            // Se revisa si se ha terminado el juego
            if (comprueba(intercambio)) {

               // Revancha o reinicio
               fin();
            }else {

               // si la partida continua se cambia de jugador
               cambiarjugador();
            }
         }
      }
   });
   
});
function reset(hardreset) {
   

   
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
   
   // ocultar el tablero si es reset de partida
   $("#cuadricula").hide();
     
   // Vaciar tablero
   $("#uno, #dos, #tres, #cuatro, #cinco, #seis, #siete, #ocho, #nueve").html("").css("background-color", "transparent");
   
   // Si no se hace reset se continua con nueva partida
   if (hardreset) {
      jugadores["jugador1"]["ficha"] = "";
      jugadores["jugador2"]["nombre"] = "";
         // inicializar variables
      jugadores["jugador1"]["ficha"] = "";
      jugadores["jugador2"]["nombre"] = "";
      jugadores["jugador2"]["ficha"] = "";
      jugadores["jugador1"]["puntos"] = 0;
      jugadores["jugador2"]["puntos"] = 0;

      // Siempre empieza jugador1
      actual = "jugador1";
      
      // mostrar presentacion
      $("#presentacion").fadeIn(1000);
   }else {
      $("#cuadricula").fadeIn(500);
   }
   
   // mostrar puntuación
   $("#playerone p").html(jugadores["jugador1"]["puntos"]);
   $("#playertwo p").html(jugadores["jugador2"]["puntos"]);
   
   // Ocultar de inicio quien juega
   $("#juega").hide();
   
   // inicia empate en falso
   empate = false;
}



function cambiarjugador() {

   // oculta el jugador anterior
   $("#juega").hide(500);
   
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
   setTimeout(function() {     
      $("#juega").html(jugadores[actual]["nombre"]).fadeIn(500);
   }, 500);
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
      $("#cuatro, #cinco, #seis").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   if (array.indexOf("siete")>=0 && array.indexOf("ocho")>=0 && array.indexOf("nueve")>=0) {
      $("#siete, #ocho, #nueve").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   
   // vertical
   if (array.indexOf("uno")>=0 && array.indexOf("cuatro")>=0 && array.indexOf("siete")>=0) {
      $("#uno, #cuatro, #siete").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   if (array.indexOf("dos")>=0 && array.indexOf("cinco")>=0 && array.indexOf("ocho")>=0) {
      $("#dos, #cinco, #ocho").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   if (array.indexOf("tres")>=0 && array.indexOf("seis")>=0 && array.indexOf("nueve")>=0) {
      $("#tres, #seis, #nueve").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   
   // Diagonal
   if (array.indexOf("uno")>=0 && array.indexOf("cinco")>=0 && array.indexOf("nueve")>=0) {
      $("#uno, #cinco, #nueve").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   if (array.indexOf("tres")>=0 && array.indexOf("cinco")>=0 && array.indexOf("siete")>=0) {
      $("#tres, #cinco, #siete").css("background-color", "blue");
      jugadores[actual]["puntos"] += 1;
      return true
   }
   // Si no hay ganador y el tablero está completo finalizar con empate
   if (completo.length === 0) {
      empate = true;
      return true;
   }
   // si el contador es igual a la longitud del objeto y despues de comprobar la partida se acaba
   
   return false
}

function fin() {
   if (empate) {
      alert("empate");
   }else {
      alert("Gana " + jugadores[actual]["nombre"]);
   }
   setTimeout(function() {
       reset(false);
   }, 1000);
}