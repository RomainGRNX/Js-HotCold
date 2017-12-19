console.log("Début du script JS...");

document.getElementById("indications").value = "";
var values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
var tableau = document.getElementById("tableau");
var tWidth = 50;
var tHeight = 20;
var secret_number = secretNumber();
console.log("Le nombre choisi par l'ia: "+secret_number);
var finish = false;
var reset_game = false;
var on_test = false;
var win = false;
var quit = false;
var jsEnd = false;
var tests = [];
var win = false;

var test_button = document.getElementById("test_button");
test_button.onclick = function(){
  on_test = true;
};

document.onkeydown = function(e) {
    if(e) {
      if(finish && e.keyCode == 78) { reset_game = true; }
    }
};

initTable();

window.addEventListener("load", function(){setInterval(refreshGame, 10);}, false);
function refreshGame(){
  if(on_test && !finish && !jsEnd){
    var number = parseInt(document.getElementById("tested_number").value);
    if(isNaN(number)) alert("Erreur: Ne rentrez que des nombres !");
    else if(number > 100 || number <= 0) alert("Le nombre mystère est compris entre 1 et 100!");
    else{
      verifyNumber(number);
      tests.push(number);
      console.log("Le nombre saisie par l’utilisateur: "+number+"\n Le nombre de tour: "+tests.length);
      document.getElementById("title").innerHTML = "Hot Cold Game - tour: "+tests.length;
      document.getElementById("tested").innerHTML += tests[tests.length-1]+"/";
      if(tests.length == 5) AddMiddleIndications();
      else if(tests.length == 10 && !finish){
        alert("Vous avez perdu !!!");
        finish = true;
      }
    }
    on_test = false;
  }

  if(win){
    randomBgColors();
    document.getElementById("victory_msg").style.color = "#FFF";
  }
  if(reset_game) resetGame();
}

function verifyNumber(p_number){
  var indices = document.getElementById("indications");
  var bg_color = "";
  indices.value += "Tour "+(tests.length+1)+": ";
  if(p_number == 69) indices.value += "Mmmmh mon conchon... ";
  if(p_number==secret_number){
    indices.value += "Bravo!!!\nAppuyez sur n pour lancer une nouvelle partie";
    finish = true;
    win = true;
    bg_color = "#FFF0";
  }
  else if(p_number<secret_number){
    indices.value += "C'est plus!";
    bg_color = "#900";
  }
  else{
    indices.value += "c'est moins!";
    bg_color = "#09F";
  }
  indices.value += "\n";
  changeBGColor(bg_color);
}

function resetGame(){
  document.getElementById("indications").value = "";
  document.getElementById("title").innerHTML = "Hot Cold Game";
  document.getElementById("tested").innerHTML = "";
  secret_number = secretNumber();
  console.log("Le nombre choisi par l'ia: "+secret_number);
  tests = [];
  win = false;
  finish = false;
  resetBGColors();
  changeBGColor("#FFF5");
  document.getElementById("victory_msg").style.color = "#FFF0";
  reset_game = false;
}

function AddMiddleIndications()
{
  var sn = Math.floor((secret_number-1)/10);
  switch(sn){
    case 0:
      alert("Indice: Le nombre est compris entre 1 et 10 !");
      break;
    case 1:
      alert("Indice: Le nombre est compris entre 11 et 20 !");
      break;
    case 2:
      alert("Indice: Le nombre est compris entre 21 et 30 !");
      break;
    case 3:
      alert("Indice: Le nombre est compris entre 31 et 40 !");
      break;
    case 4:
      alert("Indice: Le nombre est compris entre 41 et 50 !");
      break;
    case 5:
      alert("Indice: Le nombre est compris entre 51 et 60 !");
      break;
    case 6:
      alert("Indice: Le nombre est compris entre 61 et 70 !");
      break;
    case 7:
      alert("Indice: Le nombre est compris entre 71 et 80 !");
      break;
    case 8:
      alert("Indice: Le nombre est compris entre 81 et 90 !");
      break;
    case 9:
      alert("Indice: Le nombre est compris entre 91 et 100 !");
      break;
  }
}

function changeBGColor(p_newColor){
  document.getElementById("title").style.backgroundColor = p_newColor;
  document.getElementById("game").style.backgroundColor = p_newColor;
  document.getElementById("tested").style.backgroundColor = p_newColor;
  document.getElementById("indications").style.backgroundColor = p_newColor;
}

function secretNumber(){
  return getRandom(1, 100);
}

function initTable(){
  for(var i=0; i<tHeight; i++){
    var row = tableau.insertRow(-1);
    for(var j=0; j<tWidth; j++){
      var cell = row.insertCell(-1);
      cell.style.backgroundColor = "#FFF";
    }
  }
}

function resetBGColors(){
  for(var i=0; i<tHeight; i++){
    var row = tableau.rows[i];
    for(var j=0; j<tWidth; j++){
      var cell = row.cells[j];
      cell.style.backgroundColor = "#FFF";
    }
  }
}

function randomBgColors(){
  for(var i=0; i<tHeight; i++){
    var row = tableau.rows[i];
    for(var j=0; j<tWidth; j++){
      var cell = row.cells[j];
      cell.style.backgroundColor = randomColor();
    }
  }
}

function randomColor(){
  var randomColor = "#";
  for(var i=0; i<6; i++) {
    randomColor += symboleAleatoire();
  }
  return randomColor;
}

function symboleAleatoire() {
  return values[getRandom(0, 15)];
}

function getRandom(p_min, p_max) {
  return Math.round(Math.random() * (p_max - p_min) + p_min);
}
