//Boton de homepage
const botonInicio = document.getElementById('botonInicio');
botonInicio.addEventListener("click", function(){ 
    toggleDiv("inicio");
    toggleDiv("conf");
});




const storage = window.localStorage;
const formularioInicial = document.getElementById('formulario');
const formularioNombre = document.getElementById('formularioNombres');
const botonEmpezarJuego = document.getElementById("empezarJuego");
const divSimulacion = document.getElementById('simulacion');


// Variables para el juego
let nombres = [];
let tamanoCarton;
let cantidadJugadores;
let turnoActual = 0;
let numerosSacados = [];
let opciones = [];
let jugadores = [];
let isFormValid = false;
let leaderboard = [];



for (let i = 1; i <= 50; i++) {
    opciones.push(i);
}






//Event listener del formulario
formularioInicial.addEventListener("submit",function(e) {
    e.preventDefault();
    toggleDiv("formularioNombres");
    cantidadJugadores = document.getElementById("jugadores").value;
    tamanoCarton = document.getElementById("tamano").value
    document.getElementById("formularioNombres").innerHTML ="";

    var dynamicForm = document.createElement("form");


  for (var i = 1; i <= cantidadJugadores; i++) {
    var input = document.createElement("input");
    input.type = "text";
    input.name = "Jugador" + i;
    input.placeholder = "Nombre Jugador " + (i);
    input.id = "jugador"+i;
    dynamicForm.appendChild(input);
    dynamicForm.appendChild(document.createElement("br"));
  }


  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Agregar Jugadores";
  submitButton.id = "submitNombres";
  dynamicForm.appendChild(submitButton);
  dynamicForm.onsubmit = function(e) {
    e.preventDefault();

    // Validar inputs
    var inputs = dynamicForm.querySelectorAll('input[type="text"]');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        alert("Por favor, rellene todos los campos.");
        return false; 
      }
    }
    isFormValid = true;
    return true;
  };
  document.getElementById("formularioNombres").appendChild(dynamicForm);
});

formularioNombre.addEventListener("submit", function(e){
    if(!isFormValid) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    toggleDiv("conf");
    toggleDiv("formularioNombres");
    //Creamos Jugadores

    for (let i = 1; i <= cantidadJugadores; i++) {
        nombres.push(document.getElementById("jugador" + i).value);
    }


    for (let i = 0; i < cantidadJugadores; i++) {
        jugadores.push(new Jugador(nombres[i]));
    }

    //Seguimos a la pagina de leaderboard
    crearLeaderboard();
});


botonEmpezarJuego.addEventListener("click", function(e){
    toggleDiv("leaderboard");
    toggleDiv("simulacion");
//Empezar simulacion de juego
    crearJuego();
});










//################################################################################################
//Functions
function toggleDiv(id) {
    var div = document.getElementById(id);
    if (getComputedStyle(div).display === "none") {
        div.style.display = "block";
    }
    else{
        div.style.display = "none";
    }

}

function obtenerVictorias(nombre){
    let victorias =  storage.getItem(nombre);
    if(victorias == null){
        return 0;
    }
    return victorias;
}

function crearLeaderboard(){
    leaderboard = storage.getItem("leaderboard");
    toggleDiv("leaderboard")
    //al div de leaderboard le agregamos la tabla para el leaderboard si no esta null.
    if(leaderboard != null){
        console.log(leaderboard);
    }else{
        var noPlayers = document.createElement("title");
        noPlayers.textContent = "No hay jugadores previos.";
        document.getElementById("leaderboard").appendChild(noPlayers);
        noPlayers.style.display = "block";
    }

}


function crearJuego(){

    //creamos las tablas respectivas
    
    
    let player = jugadores[0];
    table = crearTabla(player);

    //Creamos el boton para cada jugador
    for (let j = 0; j< jugadores.length; j++) {
    var playerButton = document.createElement("button");
    playerButton.type = "button";
    playerButton.textContent = jugadores[j].nombre;
    playerButton.id = "boton" + jugadores[j].nombre;
    divSimulacion.appendChild(playerButton);
    playerButton.addEventListener("click",function(){
        crearTabla(jugadores[j]);
    });
    }


    
    divSimulacion.appendChild(table);


}

function crearTabla(player){
    
    console.log("Creating table" + player.nombre);
    const bingo = "BINGO";
    let table = document.createElement("table");
    let headerRow = document.createElement("tr");

    //Creamos el header row
    for (let j = 0; j< tamanoCarton; j++) {
        const headerCell = document.createElement("th");
        headerCell.textContent = bingo[j];
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    // Creamos las siguientes filas y celdas subsequentes
    for (let i = 0; i < player.carton.numeros.length; i++) {
        let numberRow = document.createElement("tr");
        for (let j = 0; j < tamanoCarton; j++) {
        const bingoCell = document.createElement("td");
        bingoCell.textContent = player.carton.numeros[i * tamanoCarton + j];
        numberRow.appendChild(bingoCell);
        }
        table.appendChild(numberRow);
    }

    table.id = "carton" + player.nombre;
    table.style.display = "block";
    return table;
    }



//################################################################ 
//Classes

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.carton = new Carton(tamanoCarton);
        this.puntos = 0;
        this.victorias = obtenerVictorias(nombre);
    }
}

class Carton {
    constructor(tamano) {
        let opcionesTemp = opciones;
        this.numeros = [];
        for (let i = 0; i < tamano * tamano; i++) {
            this.numeros.push(opcionesTemp.splice(Math.floor(Math.random() * opcionesTemp.length), 1)[0]);
        }
        this.marcados = Array(tamano * tamano).fill(false);
    }
}
