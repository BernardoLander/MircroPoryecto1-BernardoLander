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
    console.log("click");
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
    console.log("Creando Juego");
    let bingo = "BINGO";

    //creamos las tablas respectivas
    for (let i = 0; i < jugadores.length; i++) {
        console.log(jugadores[i].nombre);

        let table = document.createElement("table");
        const headerRow = document.createElement("tr");
        let player = jugadores[i];

        //Creamos el header row
        for (let j = 0; j< tamanoCarton; i++) {
            const headerCell = document.createElement("th");
            headerCell.textContent = bingo[j];
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);
        //creamos las siguientes lineas y celdas subsequentes
        const numberRow = document.createElement("tr");

        for (let j = 1; j <= tamanoCarton; i++) {
            const bingoCell = document.createElement("th");
            bingoCell.textContent = player.carton.numeros[j - 1];
            numberRow.appendChild(bingoCell);

            if(j%tamanoCarton == 0){
                //Appendamos la linea y seguimos a la proxima
                table.appendChild(numberRow);
                numberRow = document.createElement("tr"); 
            }
        
        }

        table.id = "carton" + player.nombre;
        console.log(table);
        console.log("appending child table");
        var playerButton = document.createElement("button");
        playerButton.type = "button";
        playerButton.textContent = player.nombre;
        playerButton.id = "boton" + player.nombre;
        divSimulacion.appendChild(playerButton);
        table.style.display = "none";
        divSimulacion.appendChild(table);
        console.log("Creado" + player.nombre);
    }
    playerButton.style.display = "none";
    table.style.display = "block";
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
