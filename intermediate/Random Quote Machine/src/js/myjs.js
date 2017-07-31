$(document).ready(function() {
	txtHeader = "";
	txtArticle = "";
	txtFooter = "";
	recuperaJson();
	$("#buttonJson").on("click", recuperaJson);
	$("#buttonAjax").on("click", recuperaAjax);
	$("#btnTweet").on("click", escribeTweet);
});


// Muestra los datos
function updateQuote(datos) {
	myquote = datos.quoteText;
	$("header").text(txtHeader);
	$("#artquote").text(myquote).hide().fadeIn(1000);
	$("#author").text(datos.quoteAuthor);

 
}

// Manejamos errores
function handleErr(xhr, ajaxOptions, thrownError) {
	console.log("Error: " + thrownError);
}

//Usando getJSON
function recuperaJson() {
    txtHeader = "Retieving with JSON";
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?")
    .done(updateQuote)
    .fail(handleErr);
}

// Usando Ajax
function recuperaAjax() {
  txtHeader = "Retieving with AJAX";
  $.ajax({
          url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
  })
    .done(updateQuote)
    .fail(handleErr);
}

//escribir un tweet
function escribeTweet() {
	var redirect = "https://twitter.com/intent/tweet/?text=" + myquote
	$("#enlaceTweet").attr("href", redirect);
	window.open(redirect, "_blank","height=400, width=980, menubar=no, top=200, left=200");
}
