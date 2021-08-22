function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

$("#search-output").hide();
$(".spinner-border").hide();

function buttonPress() {
  $("#cep-not-found").hide();
  $("#wrong-value").hide();
  $("#server-error").hide();
  let cep = document.getElementById("CEP").value;
  if (cep.length == 8 && /^\d+$/.test(cep)) { //validate cep before request
    request(cep);
  } else {
    $("#wrong-value").show();
  }
}

function request(cepValue) {
  $.ajax({
    url: "http://localhost:3000",
    type: "post",
    data: { cep: cepValue },
    beforeSend: function () { //load spinner
      $(".spinner-border").show();
    },
    success: function (res) { //return data and show output menu
      if (res.hasOwnProperty("erro") == false) {
        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            let id = "#" + key;
            let label = capitalize(key) + ": ";
            $(id).html(label + res[key]);
          }
        }

        $("#search-input").hide();
        $("#search-output").show();
      } else {
        $("#cep-not-found").show();
      }
    },
    complete: function () {
      $(".spinner-border").hide();
    },
    fail: function (res) { //show server error
      $("#server-error").show();
      console.log(res);
    },
  });
}
