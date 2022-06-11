
//Creacion de variables
let tablero;
let aux;
let bordesV;
let bordesH;
let color;
let cuadros;
let personajes;
let jugadores;
let resultado;
let turnoTexto;
let turnos = Array();
let cont = 0;
//Carga de inicio
window.onload = iniciarJuego;
//Funcion encargada de generar el inicio de juego
//Redirige a index si los jugadores no están cargados por localStorage
function iniciarJuego() {
	if (localStorage.getItem('colorines') != null && localStorage.getItem('personajes') != null) {
		personajes = Array(localStorage.getItem('colorines').split(","), localStorage.getItem('personajes').split(","));
		tablero = document.getElementsByTagName('tablero')[0];
		jugadores = document.getElementsByTagName('jugadores')[0];
		resultado = document.getElementsByTagName('resultado')[0];
		turnoTexto = document.getElementsByTagName('h1')[0];
		generarTablero();
		insertarJugadores();
		iniciarTurno();
		juego();
		document.getElementById("audioDuelo").play();
	} else {
		window.location.href = "index.html";
	}

}
//Genera el tablero de forma automatica en el html y da valor a las variables
//El valor de las variables generadas en esta función será útil y necesario para el resto de funciones
function generarTablero() {
	for (let i = 0; i < 17; i++) {
		if (i % 2 == 0) {
			aux = "";
			aux += "<linea id='" + Math.trunc(i / 2) + "'><div class='punto'></div>";
			for (let j = 1; j < 17; j++) {
				if (j % 2 == 0) {
					aux += "<div class='punto'></div>";
				} else {
					aux += "<div class='bordeH' id='" + Math.trunc(i / 2) + Math.trunc(j / 2) + "'></div>";
				}
			}
			aux += "</linea>";
			agTab(aux);
		} else {
			aux = "";
			aux += "<fila id='" + Math.trunc(i / 2) + "'><div class='bordeV' id='" + Math.trunc(i / 2) + 0 + "'></div>";
			for (let j = 1; j < 17; j++) {
				if (j % 2 == 0) {
					aux += "<div class='bordeV' id='" + Math.trunc(i / 2) + Math.trunc(j / 2) + "'></div>";
				} else {
					aux += "<div class='cuadro' style='background-color: lightgrey 'id='" + Math.trunc(i / 2) + Math.trunc(j / 2) + "'>" +
						"<img src='../images/coin/coinbLarge.gif' width='60' height='60'></div>";
				}
			}
			aux += "</fila>";
			agTab(aux);
		}
	}
	bordesV = document.getElementsByClassName('bordeV');
	bordesH = document.getElementsByClassName('bordeH');
	cuadros = document.getElementsByClassName('cuadro');
}
//Agrega elementos en el HTML de la etiqueta 'tablero'
function agTab(elemento) {
	tablero.innerHTML += elemento;
}
//Inserta los jugadores en el juego que se hayan introducido anteriormente en el index
function insertarJugadores() {
	for (let i = 0; i < personajes[0].length; i++) {
		let jugador = document.createElement('div');
		jugador.className = 'j' + (i + 1);
		jugador.innerHTML = "<img id='j" + (i + 1) + "' src='../images/toys/" + personajes[0][i] + ".png' width='260' height='260'>" +
			"<h3 class='nombreJugador'>" + personajes[1][i] + "</h3></img>";
		if (i % 2 == 0) {
			jugadores.insertBefore(jugador, tablero);
		} else {
			jugadores.appendChild(jugador);
		}
	}
}
//Funcion de colorear los bordes, según el turno, tendrá color u otro.
//El juego terminará cuando se hayan coloreado todos los bordes
function juego() {
	for (let i = 0; i < bordesH.length; i++) {
		bordesH[i].addEventListener("click", colorearH);
	}
	for (let i = 0; i < bordesV.length; i++) {
		bordesV[i].addEventListener("click", colorearV);
	}
}
//Funcion encargada de colorear el borde horizontal señalado
//Al igual que pinta el borde o bordes izquierda y/o derecha de los cuadros pegados a los bordes coloreados
function colorearH(e) {
	if (e.target.style.backgroundColor == '') {
		num = e.target.id;
		e.target.style.backgroundColor = color;
		if (num.charAt(0) != 0) {
			cuadros[Number.parseInt(num - 10, 8)].style.borderBottomColor = color;
		}
		if (num.charAt(0) != 8) {
			cuadros[Number.parseInt(num, 8)].style.borderTopColor = color;
		}
		comprobarCuadros();
	}
}
//Funcion encargada de colorear el borde vertical señalado
//Al igual que pinta el borde o bordes superior y/o inferior de los cuadros pegados a los bordes coloreados
function colorearV(e) {
	if (e.target.style.backgroundColor == '') {
		num = e.target.id;
		e.target.style.backgroundColor = color;
		if (num.charAt(1) != 0) {
			cuadros[Number.parseInt(num - 1, 8)].style.borderRightColor = color;
		}
		if (num.charAt(1) != 8) {
			cuadros[Number.parseInt(num, 8)].style.borderLeftColor = color;
		}
		comprobarCuadros();
	}

}
//Comprueba al array de cuadros para colorear y dar la moneda al jugador correspondiente si se han coloreado sus 4 bordes
function comprobarCuadros() {
	turno = true;
	for (let i = 0; i < cuadros.length; i++) {
		if (cuadros[i].style.backgroundColor == 'lightgrey') {
			if (cuadros[i].style.borderBottomColor != '' &&
				cuadros[i].style.borderTopColor != '' &&
				cuadros[i].style.borderLeftColor != '' &&
				cuadros[i].style.borderRightColor != '') {
				cuadros[i].style.backgroundColor = devolverColor(personajes[0][cont % personajes[0].length]);
				insertarMoneda(turnos[cont % personajes[0].length]);
				borrarMoneda(cuadros[i].firstChild);
				turno = false;
			}
		}
	}
	esFinalJuego();
	cambiarTurno(turno);
}
//Realiza el orden de turnos que seguirá durante la partida y le da turno a quien lo empiece
function iniciarTurno() {
	for (let i = 0; i < personajes[0].length; i++) {
		turnos[i] = i;
	}
	turnos.sort(function () {
		return Math.random() - 0.5;
	});
	turnoTexto.innerHTML = "Turno de " + personajes[1][turnos[0]];
	color = personajes[0][turnos[0]];
	document.getElementById('j' + (turnos[0] + 1)).src = "../images/toys/" + personajes[0][turnos[0]] + ".gif"
}
//Funcion encargada de cambiar el turno si en la acción anterior no se ha coloreado ningún cuadrado
function cambiarTurno(turno) {
	document.getElementById("efectoClick").play();
	if (turno) {
		num = cont % personajes[0].length;
		document.getElementById('j' + (turnos[num] + 1)).src = "../images/toys/" + personajes[0][turnos[num]] + ".png"
		cont++;
		num = cont % personajes[0].length;
		document.getElementById('j' + (turnos[num] + 1)).src = "../images/toys/" + personajes[0][turnos[num]] + ".gif"
		color = personajes[0][turnos[num]];
		turnoTexto.innerHTML = "Turno de " + personajes[1][turnos[num]];
	}
}
//Devuelve el color con el que rellenará un cuadro dependiendo del color del jugador
function devolverColor() {
	if (color == 'green')
		return "lightgreen";
	else if (color == 'red') {
		return "rgb(207, 128, 128)";
	} else if (color == 'yellow') {
		return "rgb(252, 252, 200)";
	} else {
		return "violet";
	}
}
//Inserta una moneda al jugador correspondiente
function insertarMoneda(num) {
	personaje = document.getElementsByClassName('j' + (num + 1))[0];
	moneda = document.createElement('img');
	moneda.setAttribute('src', '../images/coin/coinStatic.png');
	moneda.setAttribute('width', '20');
	moneda.setAttribute('height', '20');
	personaje.appendChild(moneda);

}
//Borra una moneda en el tablero de juego
function borrarMoneda(elemento) {
	elemento.src = "../images/coin/coinBrillo.gif";
	elemento.animate([
		{ transform: "translateY(0px)" }, { transform: "translateY(-600px)" }
	], { duration: 800, fill: 'backwards', ease: "ease-out" });
	setTimeout(() => {
		elemento.parentElement.removeChild(elemento);
	}, 800);
	document.getElementById("efectoMoneda").play();

}
//Funcion encargada de finalizar el juego
//Finaliza cuando no queda ningun cuadro por colorear y lleva a la pantalla de resultados
function esFinalJuego() {
	final = true;
	for (let i = 0; i < cuadros.length && true; i++) {
		if (cuadros[i].style.backgroundColor == 'lightgrey') {
			final = false;
		}
	}
	if (final) {
		mostrarResultados();
	}
}
//Genera y muestra los resultados obtenidos durante la partida
function mostrarResultados() {
	document.getElementById("audioDuelo").pause();
	document.getElementById("audioResultado").play();
	resultados = devolverArray(personajes[0].length);
	for (let i = 0; i < personajes[0].length; i++) {
		resultados[i][0] = personajes[0][i];
		resultados[i][1] = personajes[1][i];
		resultados[i][2] = (document.getElementsByClassName('j' + (i + 1))[0].children.length) - 2;
	}
	resultados.sort(function (a, b) {
		return a[2] - b[2]
	}).reverse();
	turnoTexto.innerHTML = "";
	jugadores.innerHTML = "";
	for (let i = 0; i < personajes[0].length; i++) {
		if (resultados[0][2] == resultados[i][2]) {
			formato = ".gif";
		} else {
			formato = ".png";
		}
		resultado.innerHTML += "<div style='z-index: -" + i + "'><img src='../images/toys/" + resultados[i][0] + formato + "'></img>" +
			resultados[i][1] + ": " + resultados[i][2] + "<img src='../images/coin/coinBrillo.gif'></img></div>";
		if (resultados[0][2] == resultados[i][2]) {
			setTimeout(() => {
				resultado.children[i].animate([
					{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }
				], { duration: 1000 });
			}, 400 * personajes[0].length);

		}
	}
	resultado.innerHTML += "<div class='boton' onclick='salir()'>SALIR</div>"
	for (let i = 1; i < personajes[0].length; i++) {
		resultado.children[i].animate([
			{ transform: "translateY(-" + 200 * i + "px)" }, { transform: "translateY(0px)" }
		], { duration: 400 * i, fill: 'backwards' });
	}
}

//Devuelve un array dependiendo de la cantidad de jugadores que haya jugando
function devolverArray(num) {
	if (num == 2) {
		return Array(Array(), Array());
	} else if (num == 3) {
		return Array(Array(), Array(), Array());
	} else {
		return Array(Array(), Array(), Array(), Array());
	}
}
//Te redirige a index y limpia la pantalla y localStorage
function salir() {
	document.getElementById("audioResultado").pause();
	resultado.innerHTML = "";
	localStorage.removeItem('colorines');
	localStorage.removeItem('personajes');
	window.location.href = 'index.html';
}
