//Boton de homepage
const botonInicio = document.getElementById('botonInicio');
botonInicio.addEventListener("click", function(){ 
    toggleDiv("inicio");
    toggleDiv("conf");
});





const formulario = document.getElementById('formulario');


// Variables para el juego
let nombres = [];
let tamanoCarton;
let cantidadJugadores;
let turnoActual = 0;
let numerosSacados = [];
let opciones = [];



for (let i = 1; i <= 50; i++) {
    opciones.push(i);
}





//Event listener del formulario
formulario.addEventListener("submit",function(e) {
    e.preventDefault();
    cantidadJugadores = document.getElementById("jugadores").value;
    tamanoCarton = document.getElementById("tamano").value
    for (let i = 0; i <cantidadJugadores; i++) {
        nombres.push("Jugador " + (i + 1));
    }
    let jugadores = [];

    for (let i = 0; i < cantidadJugadores; i++) {
        jugadores.push(new Jugador(nombres[i]));
    }
    toggleDiv("conf");
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


//################################################################ 
//Classes

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.carton = new Carton(tamanoCarton);
        this.puntos = 0;
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
