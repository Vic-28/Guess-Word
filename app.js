var DOM = {
    palabra: document.querySelector("#palabra"),
    intentos: document.querySelector("#intentos > div"),
    fallos: document.querySelector("#fallos"),
    respuestas: document.querySelector("#respuesta")
};
var correcta = palabraAleatoria();
var respuestas = Array(correcta.length).fill('_'); // Inicializamos las respuestas con guiones bajos
mostrarPalabra(correcta);
mostrarRespuestas();
console.log("Palabra correcta: ".concat(correcta));
DOM.intentos.textContent = '5';
function pulsaTecla(event) {
    if (parseInt(DOM.intentos.textContent) > 0) {
        if (/^[a-zA-Z]$/.test(event.key)) {
            if (correcta.includes(event.key)) {
                for (var i = 0; i < correcta.length; i++) {
                    if (correcta[i] === event.key) {
                        respuestas[i] = event.key;
                    }
                }
                mostrarRespuestas();
                console.log("La palabra contiene: " + event.key);
            }
            else {
                if (!DOM.fallos.textContent.includes(event.key)) {
                    DOM.fallos.textContent += event.key + " ";
                    var intentosRestantes = parseInt(DOM.intentos.textContent) - 1;
                    DOM.intentos.textContent = intentosRestantes.toString();
                    if (intentosRestantes === 0) {
                        mostrarPalabra(correcta, true); // Mostrar la palabra ordenada
                        document.removeEventListener('keydown', pulsaTecla);
                    }
                }
                console.log("La palabra NO contiene: " + event.key);
            }
            console.log("Tecla presionada: ".concat(event.key));
        }
    }
}
document.addEventListener('keydown', pulsaTecla);
function palabraAleatoria() {
    var palabras = [
        "hola",
        "adios",
        "palabra"
    ];
    return palabras[Math.floor(Math.random() * palabras.length)];
}
function mostrarPalabra(palabra, ordenar) {
    if (ordenar === void 0) { ordenar = false; }
    var palabraMostrar = ordenar ? palabra : mezclarPalabra(palabra);
    DOM.palabra.textContent = palabraMostrar;
}
function mezclarPalabra(palabra) {
    var _a;
    var letras = palabra.split('');
    for (var i = letras.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [letras[j], letras[i]], letras[i] = _a[0], letras[j] = _a[1];
    }
    return letras.join('');
}
function mostrarRespuestas() {
    DOM.respuestas.textContent = respuestas.join(' ');
}
