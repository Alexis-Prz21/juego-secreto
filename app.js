let numeroSecreto = 0;
// Por lo menos se realizará una vez el intento, por eso es uno
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    /** En el querySelector(), cuando se hace explícito a cuál elemento
     * se le quiere indicar, se usa las comillas. Pero ahora que es una
     * variable (asimismo en el innerHTML), se coloca el nombre de la
     * variable (no valor explícito).
     */
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    /** Llamando por el id del elemento con getElementById() */
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);

        // Se habilita el boton de "Nuevo juego" solo cuando el usuario acierta
        // Removiendo el atributo "disabled" con el metodo removeAttribute
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }

        // Se incrementa en uno, cuando el usuario falla el intento
        intentos++;

        // Si el usuario no acierta, se limpia la caja para que siga ingresando valores
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    // El # es para indicarle al querySelector que se manipulará el elemento por su id
    document.querySelector('#valorUsuario').value = '';
    return;
}

/** Se coloca solo return sin almacenar en una variable para ahorrar líneas
 * de código
 */
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();

    // Indicar mensaje de intervalo de números
    // Generar el número aleatorio
    // Inicializar el número de intentos
    condicionesIniciales();

    // Deshabilitar el botón de nuevo juego
    /** Setando el valor del atributo "disabled" con el valor true */
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

    return;
}

/** Se llama el método en el punto donde se está fuera
 * de un bloque de código o fuera de unas llaves. Incluso
 * se puede llamar dentro de otra función.
 */
condicionesIniciales();
