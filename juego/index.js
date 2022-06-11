//cargado de inicio
window.addEventListener("load", inicio);
function inicio() {
    localStorage.removeItem('colorines');
    localStorage.removeItem('personajes');
    document.getElementsByClassName("boton")[0].addEventListener("click", pulsar);
    document.getElementById("2player").addEventListener("click", formularioboton2);
    document.getElementById("3player").addEventListener("click", formularioboton3);
    document.getElementById("4player").addEventListener("click", formularioboton4);
    for (let i = 0; i < document.getElementsByClassName("boton").length; i++) {
        document.getElementsByClassName("boton")[i].addEventListener("click", efecto);
    }
    for (let i = 0; i < document.getElementsByClassName("formBoton").length; i++) {
        document.getElementsByClassName("formBoton")[i].addEventListener("click", efecto);
    }
    document.querySelector('#F1 .formBoton#l').addEventListener('click', left);
    document.querySelector('#F1 .formBoton#r').addEventListener('click', rigth);
    document.querySelector('#F2 .formBoton#l').addEventListener('click', left);
    document.querySelector('#F2 .formBoton#r').addEventListener('click', rigth);
    document.querySelector('#F3 .formBoton#l').addEventListener('click', left);
    document.querySelector('#F3 .formBoton#r').addEventListener('click', rigth);
    document.querySelector('#F4 .formBoton#l').addEventListener('click', left);
    document.querySelector('#F4 .formBoton#r').addEventListener('click', rigth);

    document.querySelector('#F1 input').addEventListener('input', validarForm);
    document.querySelector('#F2 input').addEventListener('input', validarForm);
    document.querySelector('#F3 input').addEventListener('input', validarForm);
    document.querySelector('#F4 input').addEventListener('input', validarForm);
}
/**
 *  funcion que añade efecto de sonido y animacion al boton de inicio
 *  oculta toda la panlla de inicio y visualiza en modo flex los botones de players
 */
function pulsar() {
    document.getElementById("efectoStart").play();
    document.getElementById("inicio").animate([
        // keyframes
        { opacity: 0 },
        { opacity: 100 },
        { opacity: 0 },
    ], {
        // timing options
        duration: 500,
    });
    setTimeout(() => {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("players").style.display = "flex";
    }, 1000);
}
/**
 * funcion encargada de dar animacion a cda uno de todos los botones
 * @param e el boton en cuestion 
 */
function efecto(e) {
    elem = e.target;
    elem.animate([
        // keyframes
        { transform: "scale(1)" },
        { transform: "scale(0.8)" },
        { transform: "scale(1)" }
    ], {
        // timing options
        duration: 100
    });
}
/**
 * funcion que añade sonido al crear el formulario para dos jugadores
 * pone por defecto el boton start en opacidad 50%
 * visualiza los formularios 1 y 2
 * y mantiene la escala de los formularios responsive
 */
function formularioboton2() {
    document.getElementById("efectoClick").play();
    document.getElementById("start").style.opacity = "0.5";
    document.getElementById("F3").Nombre.value = "";
    document.getElementById("F4").Nombre.value = "";
    document.getElementById("F1").style.display = "flex";
    document.getElementById("F2").style.display = "flex";
    document.getElementById("F3").style.display = "none";
    document.getElementById("F4").style.display = "none";
    document.getElementById("pie").style.display = "flex";
    if (screen.availWidth <= 1600) {
        document.getElementById('form').style.transform = "scale(1)";
    }
    validarForm();
}
/**
 * funcion que añade sonido al crear el formulario para tres jugadores
 * pone por defecto el boton start en opacidad 50%
 * visualiza los formularios 1 ,2 y 3
 * y mantiene la escala de los formularios normal
 */
function formularioboton3() {
    document.getElementById("efectoClick").play();
    document.getElementById("start").style.opacity = "0.5";
    document.getElementById("F4").Nombre.value = "";
    document.getElementById("F1").style.display = "flex";
    document.getElementById("F2").style.display = "flex";
    document.getElementById("F3").style.display = "flex";
    document.getElementById("F4").style.display = "none";
    document.getElementById("pie").style.display = "flex";
    if (screen.availWidth <= 1600) {
        document.getElementById('form').style.transform = "scale(1)";
    }
    validarForm();
}
/**
 * funcion que añade sonido al crear el formulario para cuatro jugadores
 * pone por defecto el boton start en opacidad 50%
 * visualiza los formularios 1 ,2, 3 y 4
 * y mantiene la escala de los formularios normal
 */
function formularioboton4() {
    document.getElementById("efectoClick").play();
    document.getElementById("start").style.opacity = "0.5";
    document.getElementById("F1").style.display = "flex";
    document.getElementById("F2").style.display = "flex";
    document.getElementById("F3").style.display = "flex";
    document.getElementById("F4").style.display = "flex";
    document.getElementById("pie").style.display = "flex";
    if (screen.availWidth <= 1600 && window.innerWidth >= 1400) {
        document.getElementById('form').style.transform = "scale(0.8)";
    }
    validarForm();
}
/**
 * funcion que valida los formularios cada vez que escribimos en los input, 
 * cuando se visualizan los formularios
 * y cada vez que se clickan los botones para cambiar de personaje
 * segun este validado o no se cambia la opacidad del boton para jugar 
 */
function validarForm() {
    var boton = document.getElementById("start");
    if (comprobarErrores(contarHijos())) {
        boton.style.opacity = "0.5";
        boton.removeEventListener('click', juego);
    } else {
        boton.style.opacity = "1";
        boton.addEventListener('click', juego);
    }
}
/**
 * funcion que cuanta los hijos no visibles que hay dentro del contenedor de formulalrios
 * @returns numero de hijos no visibles
 */
function contarHijos() {
    var formulario = document.getElementById('form').children;
    var cont = 0;
    for (let i = 0; i < formulario.length; i++) {
        if (formulario[i].style.display == "none") {
            cont++;
        }
    }
    return cont;
}
/**
 * funcion que comprueba que en cada input de los formularios haya algo escrito
 * y todos los personajes sean distintos
 * @param num numero de hijos no visibles pasado por contarHijos()
 * @returns booleano 
 */
function comprobarErrores(num) {
    var nombre1 = document.getElementById("F1").Nombre.value;
    var nombre2 = document.getElementById("F2").Nombre.value;
    var nombre3 = document.getElementById("F3").Nombre.value;
    var nombre4 = document.getElementById("F4").Nombre.value;
    muniecos = document.getElementsByClassName('munieco');
    if (num == 2) {
        return (nombre1 == "" || nombre2 == "") || (muniecos[0].id == muniecos[1].id);
    } else if (num == 1) {
        return (nombre1 == "" || nombre2 == "" || nombre3 == "")
            || (muniecos[0].id == muniecos[1].id)
            || (muniecos[1].id == muniecos[2].id)
            || (muniecos[0].id == muniecos[2].id);
    } else {
        return (nombre1 == "" || nombre2 == "" || nombre3 == "" || nombre4 == "")
            || (muniecos[0].id == muniecos[1].id)
            || (muniecos[1].id == muniecos[2].id)
            || (muniecos[0].id == muniecos[2].id)
            || (muniecos[3].id == muniecos[1].id)
            || (muniecos[3].id == muniecos[2].id)
            || (muniecos[3].id == muniecos[0].id);
    }
}
/**
 * funcion que maneja un array de colores
 * añade efecto a los botones de cambio de personaje
 * y valiendose del id del formulario y del personaje recorre el array para cambiarlo a izquierda
 */
var arrayToy = ["green", "purple", "red", "yellow"];
function left(e) {
    document.getElementById("efectoClick").play();
    var padre = e.target.parentNode;
    var abuelo = padre.parentNode.getAttribute('id');
    if (abuelo == "F1") {
        var toy = document.querySelector('#F1 .munieco');
    } else if (abuelo == "F2") {
        var toy = document.querySelector('#F2 .munieco');
    } else if (abuelo == "F3") {
        var toy = document.querySelector('#F3 .munieco');
    } else {
        var toy = document.querySelector('#F4 .munieco');
    }
    for (let i = 0; i < arrayToy.length; i++) {
        if (toy.getAttribute('id') == arrayToy[0]) {
            toy.setAttribute('id', arrayToy[3]);
            break;
        }
        else if (toy.getAttribute('id') == arrayToy[i]) {
            toy.setAttribute('id', arrayToy[i - 1]);
            break;
        }
    }
    validarForm();
}
/**
 * funcion que maneja un array de colores
 * añade efecto a los botones de cambio de personaje
 * y valiendose del id del formulario y del personaje recorre el array para cambiarlo a derecha
 */
function rigth(e) {
    document.getElementById("efectoClick").play();
    var padre = e.target.parentNode;
    var abuelo = padre.parentNode.getAttribute('id');
    if (abuelo == "F1") {
        var toy = document.querySelector('#F1 .munieco');
    } else if (abuelo == "F2") {
        var toy = document.querySelector('#F2 .munieco');
    } else if (abuelo == "F3") {
        var toy = document.querySelector('#F3 .munieco');
    } else {
        var toy = document.querySelector('#F4 .munieco');
    }
    for (let i = 0; i < arrayToy.length; i++) {
        if (toy.getAttribute('id') == arrayToy[3]) {
            toy.setAttribute('id', arrayToy[0]);
            break;
        }
        else if (toy.getAttribute('id') == arrayToy[i]) {
            toy.setAttribute('id', arrayToy[i + 1]);
            break;
        }
    }
    validarForm();
}
// funcion que segun la opacidad del boton para jugar añade un sonido de negacion
function negativo() {
    if (document.getElementById("start").style.opacity == 0.5) {
        document.getElementById('efectoNegativo').play();
    }
}
// funcion que guarda los valores webstorage del colores de personaje y el nombre
// redirige al archivo del juego
function juego() {
    var colores = obtenerColores();
    localStorage.setItem('colorines', colores.join(","));
    var nombres = obtenerNombres();
    localStorage.setItem('personajes', nombres.join(","));
    document.getElementById("efectoStart").play();
    setTimeout(() => {
        window.location.assign('./juego.html')
    }, 1000);
}
/**
 * funcion que guarda los nombres introducidos en los formularios en un array
 * @returns array de nombres
 */
function obtenerNombres() {
    var nombres = Array();
    var nombre1 = document.getElementById("F1").Nombre.value;
    nombres.push(nombre1);
    var nombre2 = document.getElementById("F2").Nombre.value;
    nombres.push(nombre2);
    var nombre3 = document.getElementById("F3").Nombre.value;
    if (nombre3 != "") {
        nombres.push(nombre3);
        var nombre4 = document.getElementById("F4").Nombre.value;
        if (nombre4 != "") {
            nombres.push(nombre4);
        }
    }
    return nombres;
}
/**
 * funcion que guarda los colores introducidos en los formularios en un array
 * @returns array de colores
 */
function obtenerColores() {
    var colores = Array();
    var color1 = document.getElementsByClassName("munieco")[0].id;
    colores.push(color1);
    var color2 = document.getElementsByClassName("munieco")[1].id;
    colores.push(color2);
    if (document.getElementById("F3").Nombre.value != "") {
        var color3 = document.getElementsByClassName("munieco")[2].id;
        colores.push(color3);
        var color4 = document.getElementsByClassName("munieco")[3].id;
        if (document.getElementById("F4").Nombre.value != "") {
            colores.push(color4);
        }
    }
    return colores;
}