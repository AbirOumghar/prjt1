function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var moyenne_saisonniere = document.getElementById("uimoyenne_saisonniere");
  var Heures_de_pointe = document.getElementById("uiheures_de_pointe");
  var Heures_pleines = document.getElementById("uiheures_pleines");
  var Heures_creuses = document.getElementById("uiHeures_creuses");
  var mois = document.getElementById("uimois");
  var estPrice = document.getElementById("uiEstimatedPrice");

  // var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  var url = "http://127.0.0.1:5000/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      moyenne_saisonniere: parseFloat(moyenne_saisonniere.value),
      Heures_de_pointe: Heures_de_pointe,
      Heures_creuses: Heures_creuses,
      Heures_pleines: Heures_pleines,
      mois: mois.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/get_months_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "http://127.0.0.1:5000/get_months_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_months_names request");
      if(data) {
          var mois = data.mois;
          var uimois = document.getElementById("uimois");
          $('#uimois').empty();
          for(var i in mois) {
              var opt = new Option(mois[i]);
              $('#uimois').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
