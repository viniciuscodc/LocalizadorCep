function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

$("#search-output").hide();
$(".spinner-border").hide();

function search() {
  $("#cep-not-found").hide();
  $("#wrong-value").hide();
  $("#server-error").hide();
  
  let cep = document.getElementById("CEP").value;
  //validate cep before request
  if (cep.length == 8 && /^\d+$/.test(cep)) {
    request(cep);
  } else {
    $("#wrong-value").show();
  }
}

function newSearch() {
  $("#search-output").hide();
  $("#search-input").show(600);
}

function request(cepValue) {
  $.ajax({
    url: "http://localhost:3000",
    type: "post",
    crossDomain: true,
    data: { cep: cepValue },
    beforeSend: function () {
      //load spinner
      $(".spinner-border").show();
    },
    success: function (res) {
      //return data and show output menu
      if (res.hasOwnProperty("erro") == false) {
        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            let id = "#" + key;
            let label = capitalize(key) + ": ";
            $(id).html(label + res[key]);
          }
        }

        $("#search-input").hide();
        $("#search-output").fadeIn("slow");
      } else {
        $("#cep-not-found").show();
      }
    },
    complete: function () {
      $(".spinner-border").hide();
    },
    error: function () {
      $("#server-error").show();
    },
  });
}
