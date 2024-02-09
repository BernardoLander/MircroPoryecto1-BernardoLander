

// Variables para el juego
let jugadores = [];
let tamanoCarton;
let cartones;
let numerosSacados = [];
let turnoActual = 1;
let puntosJugadores = {};




const botonInicio = document.getElementById('botonInicio');
botonInicio.addEventListener("click", function(){ 
    toggleDiv("inicio");
    toggleDiv("conf");
});



function toggleDiv(id) {
    var div = document.getElementById(id);
    if (getComputedStyle(div).display === "none") {
        div.style.display = "block";
    }
    else{
        div.style.display = "none";
    }

}