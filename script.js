// =============================================
// ELEMENTOS
// =============================================

const michi = document.getElementById("michi");
const habitacion = document.getElementById("habitacion");
const botonesMovimiento = document.querySelectorAll(".movimiento");
const botonInvestigar = document.getElementById("boton-investigar");
const interaccion = document.getElementById("interaccion");

const dialogo = document.getElementById("dialogo");
const textoDialogo = document.getElementById("texto-dialogo");
const continuarDialogo = document.getElementById("continuar-dialogo");
const pantallaHabitacion = document.getElementById("pantalla-habitacion");

// MEMORIA
const pantallaMemoria = document.getElementById("pantalla-memoria");
const tableroMemoria = document.getElementById("tablero-memoria");
const parejasTexto = document.getElementById("parejas");

// ROMPECABEZAS
const pantallaRompecabezas = document.getElementById("pantalla-rompecabezas");
const tableroRompecabezas = document.getElementById("tablero-rompecabezas");
const mensajeRompecabezas = document.getElementById("mensaje-rompecabezas");
const continuarRompecabezas = document.getElementById("continuar-rompecabezas");

// CIRCUITO
const pantallaCircuito = document.getElementById("pantalla-circuito");
const zonaCircuito = document.getElementById("zona-circuito");
const columnaResultados = document.getElementById("columna-resultados");
const cablesSvg = document.getElementById("cables-svg");
const mensajeCircuito = document.getElementById("mensaje-circuito");
const activarCircuito = document.getElementById("activar-circuito");
const reiniciarCircuito = document.getElementById("reiniciar-circuito");
const continuarCircuito = document.getElementById("continuar-circuito");

// PISTA
const pantallaPista = document.getElementById("pantalla-pista");
const textoPista = document.getElementById("texto-pista");
const numeroPista = document.getElementById("numero-pista");
const codigoPista = document.getElementById("codigo-pista");
const volverHabitacion = document.getElementById("volver-habitacion");
const codigoProgreso = document.getElementById("codigo-progreso");

// CERRADURA
const pantallaCerradura = document.getElementById("pantalla-cerradura");
const visorCodigo = document.getElementById("visor-codigo");
const mensajeCerradura = document.getElementById("mensaje-cerradura");
const numerosTeclado = document.querySelectorAll(".numero-teclado");
const borrarCodigo = document.getElementById("borrar-codigo");
const confirmarCodigo = document.getElementById("confirmar-codigo");
const cerrarCerradura = document.getElementById("cerrar-cerradura");

// FINAL
const pantallaFinal = document.getElementById("pantalla-final");
const jardinLirios = document.getElementById("jardin-lirios");
const petalosFinal = document.getElementById("petalos-final");
const estrellasFinal = document.getElementById("estrellas-final");
const mensajeFinal = document.getElementById("mensaje-final");

// NUEVO FINAL CON ULTIMO.PNG
const michiCartelFinal = document.getElementById("michi-cartel-final");


// =============================================
// ARCHIVOS DEL GATO
// =============================================

const gatoIdle = "Reposo cat.gif";
const gatoDerecha = "Caminata derecha.gif";
const gatoIzquierda = "Caminata izq.gif";

let ultimaDireccion = "derecha";


// =============================================
// MEMORIA
// =============================================

const simbolosMemoria = [
    "Carta 1.png",
    "Carta 2.png",
    "Carta 3.png",
    "Carta 4.png"
];

const cartaFondo = "Carta Fondo.png";


// =============================================
// MAPA
// =============================================

const ANCHO_MAPA = 330;
const ALTO_MAPA = 400;

let x = 150;
let y = 300;

const velocidad = 2;

const anchoMichi = 32;
const altoMichi = 32;

const hitbox = {
    offsetX: 8,
    offsetY: 23,
    ancho: 16,
    alto: 8
};


const limites = {
    izquierda: 22,
    derecha: 307,
    arriba: 180,
    abajo: 370
};


// =============================================
// OBSTÁCULOS
// =============================================

const obstaculos = [
    {
        nombre: "cama",
        x: 20,
        y: 118,
        ancho: 73,
        alto: 102
    },
    {
        nombre: "mesa",
        x: 92,
        y: 135,
        ancho: 61,
        alto: 60
    },
    {
        nombre: "escritorio",
        x: 177,
        y: 115,
        ancho: 132,
        alto: 92
    },
    {
        nombre: "silla",
        x: 218,
        y: 178,
        ancho: 49,
        alto: 50
    },
    {
        nombre: "plantaSuperior",
        x: 280,
        y: 190,
        ancho: 32,
        alto: 59
    },
    {
        nombre: "muebleDerecho",
        x: 262,
        y: 240,
        ancho: 51,
        alto: 89
    },
    {
        nombre: "plantaInferior",
        x: 274,
        y: 313,
        ancho: 39,
        alto: 55
    },
    {
        nombre: "comodaInferior",
        x: 170,
        y: 345,
        ancho: 90,
        alto: 25
    }
];


// =============================================
// ZONAS
// =============================================

const zonaEscritorio = {
    x: 170,
    y: 205,
    ancho: 105,
    alto: 18
};


const zonaCama = {
    x: 25,
    y: 215,
    ancho: 75,
    alto: 25
};


const zonaMuebleDerecho = {
    x: 235,
    y: 245,
    ancho: 27,
    alto: 80
};


const zonaComoda = {
    x: 170,
    y: 325,
    ancho: 90,
    alto: 20
};


// =============================================
// ESTADO
// =============================================

let objetoCercano = null;
let objetoDialogo = null;

let pistaEscritorioConseguida = false;
let pistaCamaConseguida = false;
let pistaCircuitoConseguida = false;


// =============================================
// MOVIMIENTO
// =============================================

function iniciarCaminata(direccion) {

    if (direccion === "izquierda") {
        michi.src = gatoIzquierda;
        ultimaDireccion = "izquierda";
    }

    else if (direccion === "derecha") {
        michi.src = gatoDerecha;
        ultimaDireccion = "derecha";
    }

    else {
        michi.src =
            ultimaDireccion === "izquierda"
                ? gatoIzquierda
                : gatoDerecha;
    }
}


function detenerCaminata() {
    michi.src = gatoIdle;
}


function obtenerHitbox(nuevoX, nuevoY) {

    return {
        x: nuevoX + hitbox.offsetX,
        y: nuevoY + hitbox.offsetY,
        ancho: hitbox.ancho,
        alto: hitbox.alto
    };
}


function rectangulosChocan(a, b) {

    return (
        a.x < b.x + b.ancho &&
        a.x + a.ancho > b.x &&
        a.y < b.y + b.alto &&
        a.y + a.alto > b.y
    );
}


function puedeMoverse(nuevoX, nuevoY) {

    const pies = obtenerHitbox(nuevoX, nuevoY);

    if (
        pies.x < limites.izquierda ||
        pies.x + pies.ancho > limites.derecha ||
        pies.y < limites.arriba ||
        pies.y + pies.alto > limites.abajo
    ) {
        return false;
    }

    for (const obstaculo of obstaculos) {

        if (rectangulosChocan(pies, obstaculo)) {
            return false;
        }
    }

    return true;
}


function mover(direccion) {

    let nuevoX = x;
    let nuevoY = y;

    if (direccion === "arriba") {
        nuevoY -= velocidad;
    }

    if (direccion === "abajo") {
        nuevoY += velocidad;
    }

    if (direccion === "izquierda") {
        nuevoX -= velocidad;
    }

    if (direccion === "derecha") {
        nuevoX += velocidad;
    }

    if (puedeMoverse(nuevoX, nuevoY)) {

        x = nuevoX;
        y = nuevoY;

        actualizarPosicion();
        comprobarInteraccion();
    }
}


function actualizarPosicion() {

    const escalaX =
        habitacion.clientWidth / ANCHO_MAPA;

    const escalaY =
        habitacion.clientHeight / ALTO_MAPA;

    michi.style.left =
        (x * escalaX) + "px";

    michi.style.top =
        (y * escalaY) + "px";

    michi.style.width =
        (anchoMichi * escalaX) + "px";

    michi.style.height =
        (altoMichi * escalaY) + "px";
}


// =============================================
// INTERACCIONES
// =============================================

function comprobarInteraccion() {

    const pies = obtenerHitbox(x, y);

    if (
        rectangulosChocan(
            pies,
            zonaEscritorio
        )
    ) {

        objetoCercano = "escritorio";

        interaccion.textContent =
            "🔎 Investigar escritorio";

        interaccion.style.display =
            "block";

        return;
    }

    if (
        rectangulosChocan(
            pies,
            zonaCama
        )
    ) {

        objetoCercano = "cama";

        interaccion.textContent =
            "🔎 Investigar cama";

        interaccion.style.display =
            "block";

        return;
    }

    if (
        rectangulosChocan(
            pies,
            zonaMuebleDerecho
        )
    ) {

        objetoCercano = "mueble";

        interaccion.textContent =
            "🔎 Investigar mueble";

        interaccion.style.display =
            "block";

        return;
    }

    if (
        rectangulosChocan(
            pies,
            zonaComoda
        )
    ) {

        objetoCercano = "comoda";

        interaccion.textContent =
            "🔎 Investigar cómoda";

        interaccion.style.display =
            "block";

        return;
    }

    objetoCercano = null;

    interaccion.style.display =
        "none";
}


// =============================================
// BOTONES MOVIMIENTO
// =============================================

let intervaloMovimiento = null;

botonesMovimiento.forEach(
    boton => {

        boton.addEventListener(
            "pointerdown",
            evento => {

                evento.preventDefault();

                const direccion =
                    boton.dataset.direccion;

                iniciarCaminata(
                    direccion
                );

                mover(
                    direccion
                );

                detenerMovimientoContinuo();

                intervaloMovimiento =
                    setInterval(
                        () =>
                            mover(
                                direccion
                            ),
                        16
                    );
            }
        );

        boton.addEventListener(
            "pointerup",
            detenerMovimiento
        );

        boton.addEventListener(
            "pointercancel",
            detenerMovimiento
        );

        boton.addEventListener(
            "pointerleave",
            detenerMovimiento
        );
    }
);


function detenerMovimientoContinuo() {

    if (
        intervaloMovimiento !== null
    ) {

        clearInterval(
            intervaloMovimiento
        );

        intervaloMovimiento = null;
    }
}


function detenerMovimiento() {

    detenerMovimientoContinuo();

    detenerCaminata();
}


// =============================================
// TECLADO
// =============================================

const teclasPresionadas =
    new Set();


document.addEventListener(
    "keydown",
    evento => {

        const tecla =
            evento.key.toLowerCase();

        const validas = [
            "w",
            "a",
            "s",
            "d",
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright"
        ];

        if (
            validas.includes(
                tecla
            )
        ) {

            evento.preventDefault();

            teclasPresionadas.add(
                tecla
            );
        }
    }
);


document.addEventListener(
    "keyup",
    evento => {

        teclasPresionadas.delete(
            evento.key.toLowerCase()
        );

        if (
            teclasPresionadas.size === 0
        ) {
            detenerCaminata();
        }
    }
);


function actualizarTeclado() {

    let direccionActual = null;

    if (
        teclasPresionadas.has("w") ||
        teclasPresionadas.has("arrowup")
    ) {

        mover("arriba");

        direccionActual = "arriba";
    }

    if (
        teclasPresionadas.has("s") ||
        teclasPresionadas.has("arrowdown")
    ) {

        mover("abajo");

        direccionActual = "abajo";
    }

    if (
        teclasPresionadas.has("a") ||
        teclasPresionadas.has("arrowleft")
    ) {

        mover("izquierda");

        direccionActual = "izquierda";
    }

    if (
        teclasPresionadas.has("d") ||
        teclasPresionadas.has("arrowright")
    ) {

        mover("derecha");

        direccionActual = "derecha";
    }

    if (
        direccionActual !== null
    ) {

        iniciarCaminata(
            direccionActual
        );
    }

    requestAnimationFrame(
        actualizarTeclado
    );
}


// =============================================
// INVESTIGAR
// =============================================

botonInvestigar.addEventListener(
    "click",
    () => {

        if (
            objetoCercano === null
        ) {
            return;
        }

        detenerMovimiento();

        objetoDialogo =
            objetoCercano;

        dialogo.classList.remove(
            "oculto"
        );


        // ESCRITORIO

        if (
            objetoDialogo ===
            "escritorio"
        ) {

            if (
                pistaEscritorioConseguida
            ) {

                textoDialogo.textContent =
                    "Aquí ya encontraste la primera pista.";

                continuarDialogo.textContent =
                    "Cerrar";
            }

            else {

                textoDialogo.textContent =
                    "Michi encontró unas cartas extrañas sobre el escritorio...";

                continuarDialogo.textContent =
                    "Investigar";
            }
        }


        // CAMA

        if (
            objetoDialogo === "cama"
        ) {

            if (
                pistaCamaConseguida
            ) {

                textoDialogo.textContent =
                    "Michi ya reconstruyó el dibujo que estaba escondido aquí.";

                continuarDialogo.textContent =
                    "Cerrar";
            }

            else {

                textoDialogo.textContent =
                    "Michi encontró varios pedazos de un dibujo escondidos entre las sábanas...";

                continuarDialogo.textContent =
                    "Reconstruir";
            }
        }


        // MUEBLE

        if (
            objetoDialogo === "mueble"
        ) {

            if (
                pistaCircuitoConseguida
            ) {

                textoDialogo.textContent =
                    "El sistema ya funciona. Aquí encontraste la tercera pista.";

                continuarDialogo.textContent =
                    "Cerrar";
            }

            else {

                textoDialogo.textContent =
                    "¿En serio pusieron matemáticas como sistema de seguridad?...";

                continuarDialogo.textContent =
                    "Revisar panel";
            }
        }


        // CÓMODA

        if (
            objetoDialogo === "comoda"
        ) {

            const tieneTodo =
                pistaEscritorioConseguida &&
                pistaCamaConseguida &&
                pistaCircuitoConseguida;

            if (
                tieneTodo
            ) {

                textoDialogo.textContent =
                    "🐱 ¡Tenemos las tres pistas! Esta cerradura debe usar el código que encontramos.";

                continuarDialogo.textContent =
                    "Abrir cerradura";
            }

            else {

                textoDialogo.textContent =
                    "🐱 Está cerrada... Necesitamos encontrar las tres pistas.";

                continuarDialogo.textContent =
                    "Cerrar";
            }
        }
    }
);


// =============================================
// CONTINUAR DIÁLOGO
// =============================================

continuarDialogo.addEventListener(
    "click",
    () => {

        dialogo.classList.add(
            "oculto"
        );

        if (
            objetoDialogo ===
            "escritorio"
        ) {

            if (
                !pistaEscritorioConseguida
            ) {

                abrirMemoria();
            }
        }

        else if (
            objetoDialogo ===
            "cama"
        ) {

            if (
                !pistaCamaConseguida
            ) {

                abrirRompecabezas();
            }
        }

        else if (
            objetoDialogo ===
            "mueble"
        ) {

            if (
                !pistaCircuitoConseguida
            ) {

                abrirCircuito();
            }
        }

        else if (
            objetoDialogo ===
            "comoda"
        ) {

            if (
                pistaEscritorioConseguida &&
                pistaCamaConseguida &&
                pistaCircuitoConseguida
            ) {

                abrirCerradura();
            }
        }

        objetoDialogo = null;
    }
);


// =============================================
// MEMORIA
// =============================================

let primeraCarta = null;
let segundaCarta = null;

let tableroBloqueado = false;

let parejasEncontradas = 0;


function abrirMemoria() {

    pantallaHabitacion.classList.add(
        "oculto"
    );

    pantallaMemoria.classList.remove(
        "oculto"
    );

    crearMemoria();
}


function crearMemoria() {

    tableroMemoria.innerHTML = "";

    parejasEncontradas = 0;

    parejasTexto.textContent = "0";

    primeraCarta = null;
    segundaCarta = null;

    tableroBloqueado = false;

    let cartas = [
        ...simbolosMemoria,
        ...simbolosMemoria
    ];

    mezclarArray(
        cartas
    );

    cartas.forEach(
        imagen => {

            const carta =
                document.createElement(
                    "button"
                );

            carta.className =
                "carta";

            carta.dataset.simbolo =
                imagen;

            carta.innerHTML = `
                <div class="carta-interior">

                    <div class="cara-carta carta-atras">
                        <img
                            src="${cartaFondo}"
                            draggable="false"
                        >
                    </div>

                    <div class="cara-carta carta-frente">
                        <img
                            src="${imagen}"
                            draggable="false"
                        >
                    </div>

                </div>
            `;

            carta.addEventListener(
                "click",
                () =>
                    voltearCarta(
                        carta
                    )
            );

            tableroMemoria.appendChild(
                carta
            );
        }
    );
}
function voltearCarta(
    carta
) {

    if (
        tableroBloqueado ||
        carta === primeraCarta ||
        carta.classList.contains(
            "encontrada"
        )
    ) {
        return;
    }

    carta.classList.add(
        "volteada"
    );

    if (
        primeraCarta === null
    ) {

        primeraCarta = carta;

        return;
    }

    segundaCarta = carta;

    comprobarPareja();
}


function comprobarPareja() {

    const iguales =
        primeraCarta.dataset.simbolo ===
        segundaCarta.dataset.simbolo;

    if (
        iguales
    ) {

        primeraCarta.classList.add(
            "encontrada"
        );

        segundaCarta.classList.add(
            "encontrada"
        );

        parejasEncontradas++;

        parejasTexto.textContent =
            parejasEncontradas;

        primeraCarta = null;
        segundaCarta = null;

        if (
            parejasEncontradas === 4
        ) {

            tableroBloqueado = true;

            setTimeout(
                completarMemoria,
                700
            );
        }
    }

    else {

        tableroBloqueado = true;

        setTimeout(
            () => {

                primeraCarta.classList.remove(
                    "volteada"
                );

                segundaCarta.classList.remove(
                    "volteada"
                );

                primeraCarta = null;
                segundaCarta = null;

                tableroBloqueado = false;
            },
            850
        );
    }
}


function completarMemoria() {

    pistaEscritorioConseguida =
        true;

    pantallaMemoria.classList.add(
        "oculto"
    );

    mostrarPista(
        2,
        "Michi encontró algo escondido entre las cartas..."
    );
}


// =============================================
// MEZCLAR
// =============================================

function mezclarArray(
    array
) {

    for (
        let i =
            array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }
}


// =============================================
// ROMPECABEZAS
// =============================================

let piezasActuales = [];

let primeraPieza = null;

let rompecabezasBloqueado =
    false;

const posicionesNota = [
    "0% 0%",
    "50% 0%",
    "100% 0%",
    "0% 100%",
    "50% 100%",
    "100% 100%"
];


function abrirRompecabezas() {

    pantallaHabitacion.classList.add(
        "oculto"
    );

    pantallaRompecabezas.classList.remove(
        "oculto"
    );

    crearRompecabezas();
}


function crearRompecabezas() {

    tableroRompecabezas.innerHTML =
        "";

    mensajeRompecabezas.textContent =
        "Selecciona una pieza.";

    continuarRompecabezas.classList.add(
        "oculto"
    );

    primeraPieza = null;

    rompecabezasBloqueado =
        false;

    piezasActuales = [
        0,
        1,
        2,
        3,
        4,
        5
    ];

    do {

        mezclarArray(
            piezasActuales
        );

    }
    while (
        rompecabezasResuelto()
    );

    dibujarRompecabezas();
}


function dibujarRompecabezas() {

    tableroRompecabezas.innerHTML = "";

    piezasActuales.forEach(
        (pieza, posicion) => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.className =
                "pieza-nota";

            boton.dataset.posicion =
                posicion;

            boton.style.backgroundPosition =
                posicionesNota[pieza];

            boton.addEventListener(
                "click",
                () =>
                    seleccionarPieza(
                        posicion,
                        boton
                    )
            );

            tableroRompecabezas.appendChild(
                boton
            );
        }
    );
}


function seleccionarPieza(
    posicion,
    boton
) {

    if (rompecabezasBloqueado) {
        return;
    }

    if (primeraPieza === null) {

        primeraPieza = posicion;

        boton.classList.add(
            "seleccionada"
        );

        mensajeRompecabezas.textContent =
            "Ahora toca otra pieza.";

        return;
    }

    if (primeraPieza === posicion) {

        primeraPieza = null;

        boton.classList.remove(
            "seleccionada"
        );

        mensajeRompecabezas.textContent =
            "Selecciona una pieza.";

        return;
    }

    [
        piezasActuales[primeraPieza],
        piezasActuales[posicion]
    ] = [
        piezasActuales[posicion],
        piezasActuales[primeraPieza]
    ];

    primeraPieza = null;

    dibujarRompecabezas();

    if (rompecabezasResuelto()) {

        completarRompecabezas();
    }

    else {

        mensajeRompecabezas.textContent =
            "Selecciona una pieza.";
    }
}


function rompecabezasResuelto() {

    return piezasActuales.every(
        (pieza, indice) =>
            pieza === indice
    );
}


function completarRompecabezas() {

    rompecabezasBloqueado = true;

    mensajeRompecabezas.textContent =
        "🐱 ¡Listo! La imagen está completa.";

    continuarRompecabezas.classList.remove(
        "oculto"
    );
}


continuarRompecabezas.addEventListener(
    "click",
    () => {

        pistaCamaConseguida = true;

        pantallaRompecabezas.classList.add(
            "oculto"
        );

        mostrarPista(
            7,
            "Michi descubrió otro número escondido en el dibujo..."
        );
    }
);


// =============================================
// CIRCUITO
// =============================================

let operacionSeleccionada = null;

let conexionesCircuito = {};


function abrirCircuito() {

    pantallaHabitacion.classList.add(
        "oculto"
    );

    pantallaCircuito.classList.remove(
        "oculto"
    );

    crearCircuito();
}


function crearCircuito() {

    conexionesCircuito = {};

    operacionSeleccionada = null;

    cablesSvg.innerHTML = "";

    mensajeCircuito.textContent =
        "Selecciona una operación.";

    activarCircuito.classList.remove(
        "oculto"
    );

    reiniciarCircuito.classList.remove(
        "oculto"
    );

    continuarCircuito.classList.add(
        "oculto"
    );

    document
        .querySelectorAll(
            ".operacion-circuito"
        )
        .forEach(
            boton =>
                boton.classList.remove(
                    "seleccionado"
                )
        );

    columnaResultados
        .querySelectorAll(
            ".resultado-circuito"
        )
        .forEach(
            elemento =>
                elemento.remove()
        );

    const resultados = [
        "120",
        "7",
        "20",
        "8"
    ];

    mezclarArray(
        resultados
    );

    resultados.forEach(
        resultado => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.className =
                "resultado-circuito";

            boton.dataset.valor =
                resultado;

            boton.innerHTML = `
                <span class="conector conector-resultado"></span>
                <span>${resultado}</span>
            `;

            boton.addEventListener(
                "click",
                () =>
                    seleccionarResultado(
                        boton
                    )
            );

            columnaResultados.appendChild(
                boton
            );
        }
    );

    dibujarCables();
}


document
    .querySelectorAll(
        ".operacion-circuito"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".operacion-circuito"
                        )
                        .forEach(
                            otro =>
                                otro.classList.remove(
                                    "seleccionado"
                                )
                        );

                    operacionSeleccionada =
                        boton;

                    boton.classList.add(
                        "seleccionado"
                    );

                    mensajeCircuito.textContent =
                        "Ahora selecciona el resultado.";
                }
            );
        }
    );


function seleccionarResultado(
    botonResultado
) {

    if (
        operacionSeleccionada === null
    ) {

        mensajeCircuito.textContent =
            "Primero selecciona una operación.";

        return;
    }

    const id =
        operacionSeleccionada.dataset.id;

    const resultado =
        botonResultado.dataset.valor;

    for (
        const otro
        in conexionesCircuito
    ) {

        if (
            conexionesCircuito[otro] ===
            resultado
        ) {

            delete conexionesCircuito[
                otro
            ];
        }
    }

    conexionesCircuito[id] =
        resultado;

    operacionSeleccionada.classList.remove(
        "seleccionado"
    );

    operacionSeleccionada = null;

    dibujarCables();

    mensajeCircuito.textContent =
        "Conexión realizada.";
}


function dibujarCables() {

    cablesSvg.innerHTML = "";

    const zonaRect =
        zonaCircuito.getBoundingClientRect();

    for (
        const id
        in conexionesCircuito
    ) {

        const resultado =
            conexionesCircuito[id];

        const operacion =
            document.querySelector(
                `.operacion-circuito[data-id="${id}"]`
            );

        const botonResultado =
            document.querySelector(
                `.resultado-circuito[data-valor="${resultado}"]`
            );

        if (
            !operacion ||
            !botonResultado
        ) {
            continue;
        }

        const inicio =
            operacion.querySelector(
                ".conector-operacion"
            );

        const final =
            botonResultado.querySelector(
                ".conector-resultado"
            );

        const a =
            inicio.getBoundingClientRect();

        const b =
            final.getBoundingClientRect();

        const x1 =
            a.left +
            a.width / 2 -
            zonaRect.left;

        const y1 =
            a.top +
            a.height / 2 -
            zonaRect.top;

        const x2 =
            b.left +
            b.width / 2 -
            zonaRect.left;

        const y2 =
            b.top +
            b.height / 2 -
            zonaRect.top;

        const mitad =
            (x1 + x2) / 2;

        const path =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );

        path.setAttribute(
            "d",
            `M ${x1} ${y1}
             L ${mitad} ${y1}
             L ${mitad} ${y2}
             L ${x2} ${y2}`
        );

        path.setAttribute(
            "class",
            "cable-linea"
        );

        cablesSvg.appendChild(
            path
        );
    }
}


reiniciarCircuito.addEventListener(
    "click",
    crearCircuito
);


activarCircuito.addEventListener(
    "click",
    () => {

        if (
            Object.keys(
                conexionesCircuito
            ).length < 4
        ) {

            mensajeCircuito.textContent =
                "🐱 Todavía faltan cables.";

            return;
        }

        let correcto = true;

        document
            .querySelectorAll(
                ".operacion-circuito"
            )
            .forEach(
                operacion => {

                    const id =
                        operacion.dataset.id;

                    if (
                        conexionesCircuito[id] !==
                        operacion.dataset.respuesta
                    ) {
                        correcto = false;
                    }
                }
            );

        if (!correcto) {

            mensajeCircuito.textContent =
                "🐱 Creo que acabamos de reprobar matemáticas 😹";

            return;
        }

        pistaCircuitoConseguida = true;

        mensajeCircuito.textContent =
            "⚡ SISTEMA RESTAURADO ⚡";

        activarCircuito.classList.add(
            "oculto"
        );

        reiniciarCircuito.classList.add(
            "oculto"
        );

        continuarCircuito.classList.remove(
            "oculto"
        );
    }
);


continuarCircuito.addEventListener(
    "click",
    () => {

        pantallaCircuito.classList.add(
            "oculto"
        );

        mostrarPista(
            4,
            "¡Michi encontró la última parte del código!"
        );
    }
);


// =============================================
// PISTAS
// =============================================

function mostrarPista(
    numero,
    mensaje
) {

    textoPista.textContent =
        mensaje;

    numeroPista.textContent =
        numero;

    actualizarCodigo();

    codigoPista.textContent =
        "🔐 " +
        obtenerCodigoTexto();

    pantallaPista.classList.remove(
        "oculto"
    );
}


function obtenerCodigoTexto() {

    return (
        (
            pistaEscritorioConseguida
                ? "2"
                : "?"
        )
        +
        " · "
        +
        (
            pistaCamaConseguida
                ? "7"
                : "?"
        )
        +
        " · "
        +
        (
            pistaCircuitoConseguida
                ? "4"
                : "?"
        )
    );
}


function actualizarCodigo() {

    codigoProgreso.textContent =
        "🔐 " +
        obtenerCodigoTexto();
}


volverHabitacion.addEventListener(
    "click",
    () => {

        pantallaPista.classList.add(
            "oculto"
        );

        pantallaHabitacion.classList.remove(
            "oculto"
        );

        actualizarPosicion();

        actualizarCodigo();

        comprobarInteraccion();
    }
);


// =============================================
// CERRADURA
// =============================================

let codigoIntroducido = "";
function abrirCerradura() {

    codigoIntroducido = "";

    actualizarVisorCodigo();

    mensajeCerradura.textContent =
        "Introduce el código de tres dígitos.";

    pantallaHabitacion.classList.add(
        "oculto"
    );

    pantallaCerradura.classList.remove(
        "oculto"
    );
}


numerosTeclado.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                if (
                    codigoIntroducido.length >= 3
                ) {
                    return;
                }

                codigoIntroducido +=
                    boton.dataset.numero;

                actualizarVisorCodigo();
            }
        );
    }
);


function actualizarVisorCodigo() {

    const digitos =
        ["_", "_", "_"];

    for (
        let i = 0;
        i < codigoIntroducido.length;
        i++
    ) {

        digitos[i] =
            codigoIntroducido[i];
    }

    visorCodigo.textContent =
        digitos.join(" ");
}


borrarCodigo.addEventListener(
    "click",
    () => {

        codigoIntroducido =
            codigoIntroducido.slice(
                0,
                -1
            );

        actualizarVisorCodigo();
    }
);


confirmarCodigo.addEventListener(
    "click",
    () => {

        if (
            codigoIntroducido === "274"
        ) {

            mensajeCerradura.textContent =
                "🔓 CLIC...";

            setTimeout(
                iniciarFinal,
                900
            );
        }

        else {

            mensajeCerradura.textContent =
                "🔒 Código incorrecto.";

            codigoIntroducido = "";

            actualizarVisorCodigo();
        }
    }
);


cerrarCerradura.addEventListener(
    "click",
    () => {

        pantallaCerradura.classList.add(
            "oculto"
        );

        pantallaHabitacion.classList.remove(
            "oculto"
        );
    }
);


// =====================================================
// FINAL
// =====================================================

function iniciarFinal() {

    pantallaCerradura.classList.add(
        "oculto"
    );

    pantallaFinal.classList.remove(
        "oculto"
    );


    // LIMPIAR FINAL

    jardinLirios.innerHTML = "";
    estrellasFinal.innerHTML = "";
    petalosFinal.innerHTML = "";


    // REINICIAR POSICIÓN DEL RAMO

    jardinLirios.classList.remove(
        "ramo-mostrar-michi"
    );


    // REINICIAR MENSAJE

    mensajeFinal.classList.remove(
        "mensaje-final-visible",
        "mensaje-final-saliendo"
    );

    mensajeFinal.classList.add(
        "mensaje-final-oculto"
    );


    // REINICIAR MICHI

    michiCartelFinal.classList.remove(
        "michi-cartel-visible",
        "michi-cartel-reposo"
    );

    michiCartelFinal.classList.add(
        "michi-cartel-oculto"
    );


    // DESTELLOS

    crearDestellos();


    // CREAR UN ÚNICO RAMO CENTRAL

    crearJardinLirios();


    // PÉTALOS

    setTimeout(
        crearPetalosVolando,
        3800
    );


    // APARECE CASO RESUELTO

    setTimeout(
        () => {

            mensajeFinal.classList.remove(
                "mensaje-final-oculto"
            );

            mensajeFinal.classList.add(
                "mensaje-final-visible"
            );

        },
        6500
    );


    // CASO RESUELTO EMPIEZA A DESAPARECER

    setTimeout(
        () => {

            mensajeFinal.classList.add(
                "mensaje-final-saliendo"
            );

        },
        12500
    );


    // QUITAR MENSAJE Y SUBIR RAMO

    setTimeout(
        () => {

            mensajeFinal.classList.remove(
                "mensaje-final-visible"
            );

            mensajeFinal.classList.add(
                "mensaje-final-oculto"
            );

            jardinLirios.classList.add(
                "ramo-mostrar-michi"
            );

        },
        13600
    );


    // APARECE MICHI DEBAJO DEL RAMO

    setTimeout(
        () => {

            michiCartelFinal.classList.remove(
                "michi-cartel-oculto"
            );

            michiCartelFinal.classList.add(
                "michi-cartel-visible"
            );

        },
        14000
    );


    // MOVIMIENTO SUAVE DE MICHI

    setTimeout(
        () => {

            michiCartelFinal.classList.add(
                "michi-cartel-reposo"
            );

        },
        15600
    );
}


// =====================================================
// RAMO CENTRAL
// =====================================================

function crearJardinLirios() {

    jardinLirios.innerHTML = "";

    jardinLirios.classList.remove(
        "ramo-mostrar-michi"
    );

    /*
        RAMO DE LIRIOS

        Los grupos nacen prácticamente
        desde el mismo centro.

        Los de los lados se inclinan
        para crear la forma de abanico.
    */

    const grupos = [

        {
            x: 42,
            escala: .66,
            retraso: .20,
            lado: "izquierda"
        },

        {
            x: 47,
            escala: .82,
            retraso: .08,
            lado: "izquierda"
        },

        {
            x: 52,
            escala: .86,
            retraso: 0,
            lado: "derecha"
        },

        {
            x: 57,
            escala: .66,
            retraso: .18,
            lado: "derecha"
        }

    ];

    grupos.forEach(
        datos => {

            crearGrupoLirios(
                datos.x,
                datos.escala,
                datos.retraso,
                datos.lado
            );

        }
    );


    /*
        BASE VERDE DEL RAMO

        Esta parte une visualmente
        todos los tallos.
    */

    const base =
        document.createElement(
            "div"
        );

    base.className =
        "base-verde-ramo";

    jardinLirios.appendChild(
        base
    );


    /*
        HOJAS GRANDES DE LA BASE
    */

    const hojasBase = [

        [-70, 95, -54],
        [-55, 115, -43],
        [-40, 130, -32],
        [-25, 145, -20],
        [-12, 155, -10],

        [0, 165, 0],

        [12, 155, 10],
        [25, 145, 20],
        [40, 130, 32],
        [55, 115, 43],
        [70, 95, 54]

    ];

    hojasBase.forEach(
        (
            hoja,
            indice
        ) => {

            const elemento =
                document.createElement(
                    "div"
                );

            elemento.className =
                "hoja-ramo-central";

            elemento.style.setProperty(
                "--desplazamiento",
                hoja[0] + "px"
            );

            elemento.style.setProperty(
                "--alto",
                hoja[1] + "px"
            );

            elemento.style.setProperty(
                "--rotacion",
                hoja[2] + "deg"
            );

            elemento.style.setProperty(
                "--retraso",
                (
                    .6 +
                    indice * .07
                ) + "s"
            );

            base.appendChild(
                elemento
            );

        }
    );
}


// =====================================================
// GRUPO DE LIRIOS
// =====================================================

function crearGrupoLirios(
    posicionX,
    escala,
    retraso,
    lado
) {

    const grupo =
        document.createElement(
            "div"
        );


    grupo.className =
        "grupo-lirios";


    grupo.style.left =
        posicionX + "%";


    grupo.style.setProperty(
        "--escala-grupo",
        escala
    );


    grupo.style.setProperty(
        "--retraso-grupo",
        retraso + "s"
    );


    jardinLirios.appendChild(
        grupo
    );


    // =================================================
    // TALLOS
    // =================================================

    const tallos = [

        [28, 195, -12, 0],
        [38, 250, -8, .10],
        [48, 315, -3, .20],
        [58, 350, 2, .28],
        [68, 300, 6, .36],
        [78, 265, 10, .46],
        [88, 215, 14, .58]

    ];


    tallos.forEach(
        tallo => {

            crearTalloDetallado(
                grupo,
                tallo[0],
                tallo[1],
                tallo[2],
                retraso + tallo[3]
            );

        }
    );


    // =================================================
    // FOLLAJE INFERIOR
    // =================================================

    const hojasBase = [

        [20, 15, 105, -18, .25],
        [29, 14, 125, 16, .32],

        [38, 15, 145, -10, .40],
        [48, 14, 130, 9, .48],

        [57, 15, 150, -7, .55],
        [66, 14, 135, 12, .62],

        [75, 15, 120, -13, .70],
        [84, 14, 105, 18, .76]

    ];


    hojasBase.forEach(
        hoja => {

            crearHojaBase(
                grupo,
                hoja[0],
                hoja[1],
                hoja[2],
                hoja[3],
                retraso + hoja[4]
            );

        }
    );


    // =================================================
    // HOJAS DE LOS TALLOS
    // =================================================

    const hojas = [

        // ZONA BAJA

        [28, 32, 13, 75, -38, .45],
        [33, 45, 12, 82, 34, .50],

        [39, 58, 12, 88, -35, .58],
        [45, 72, 11, 82, 32, .64],

        [52, 42, 13, 92, -30, .67],
        [58, 58, 12, 88, 30, .72],

        [66, 38, 13, 90, -31, .78],
        [72, 55, 12, 86, 32, .83],

        [80, 35, 12, 78, -35, .88],
        [86, 50, 11, 74, 35, .93],


        // ZONA MEDIA

        [31, 90, 11, 78, -40, .90],
        [37, 108, 10, 74, 37, .98],

        [43, 122, 11, 80, -36, 1.04],
        [49, 140, 10, 76, 34, 1.10],

        [55, 105, 11, 83, -33, 1.15],
        [61, 125, 10, 78, 33, 1.21],

        [68, 112, 11, 80, -35, 1.25],
        [74, 132, 10, 75, 35, 1.31],

        [80, 102, 11, 75, -38, 1.36],
        [86, 120, 10, 70, 38, 1.42],


        // ZONA SUPERIOR

        [39, 165, 9, 67, -40, 1.47],
        [45, 180, 9, 65, 39, 1.53],

        [51, 190, 9, 68, -37, 1.58],
        [58, 205, 9, 65, 36, 1.64],

        [65, 175, 9, 66, -37, 1.70],
        [71, 190, 9, 62, 38, 1.76],

        [77, 160, 9, 64, -40, 1.82],
        [83, 175, 9, 60, 40, 1.88]

    ];


    hojas.forEach(
        hoja => {

            crearHojaDetallada(

                grupo,

                hoja[0],
                hoja[1],

                hoja[2],
                hoja[3],

                hoja[4],

                retraso +
                hoja[5]

            );

        }
    );


    // =================================================
    // RAMAS
    // =================================================

    crearRama(
        grupo,
        43,
        190,
        70,
        -46,
        retraso + 1.15
    );


    crearRama(
        grupo,
        52,
        235,
        78,
        -39,
        retraso + 1.25
    );


    crearRama(
        grupo,
        62,
        220,
        75,
        42,
        retraso + 1.32
    );


    crearRama(
        grupo,
        72,
        180,
        68,
        48,
        retraso + 1.42
    );


    crearRama(
        grupo,
        34,
        145,
        55,
        -52,
        retraso + 1.48
    );


    crearRama(
        grupo,
        81,
        145,
        58,
        52,
        retraso + 1.55
    );


    // =================================================
    // FLORES DEL LADO IZQUIERDO
    // =================================================

    if (
        lado === "izquierda"
    ) {

        crearFlorDetallada(
            grupo,
            58,
            350,
            88,
            -5,
            retraso + 1.85,
            9
        );


        crearFlorDetallada(
            grupo,
            32,
            302,
            76,
            -20,
            retraso + 2.05,
            8
        );


        crearFlorDetallada(
            grupo,
            78,
            300,
            79,
            17,
            retraso + 2.18,
            8
        );


        crearFlorDetallada(
            grupo,
            48,
            260,
            70,
            -10,
            retraso + 2.32,
            9
        );


        crearFlorDetallada(
            grupo,
            84,
            242,
            67,
            16,
            retraso + 2.46,
            8
        );


        crearFlorDetallada(
            grupo,
            25,
            230,
            63,
            -18,
            retraso + 2.58,
            7
        );


        crearFlorDetallada(
            grupo,
            60,
            205,
            58,
            7,
            retraso + 2.68,
            7
        );


        crearFlorDetallada(
            grupo,
            37,
            178,
            53,
            -15,
            retraso + 2.78,
            6
        );


        crearFlorDetallada(
            grupo,
            82,
            168,
            50,
            15,
            retraso + 2.88,
            6
        );
                crearFlorDetallada(
            grupo,
            18,
            270,
            48,
            -25,
            retraso + 2.35,
            5
        );


        crearFlorDetallada(
            grupo,
            92,
            280,
            47,
            24,
            retraso + 2.52,
            5
        );


        crearCapullo(
            grupo,
            19,
            330,
            -24,
            retraso + 2.05,
            18,
            42
        );


        crearCapullo(
            grupo,
            91,
            327,
            22,
            retraso + 2.28,
            18,
            42
        );


        crearCapullo(
            grupo,
            69,
            380,
            8,
            retraso + 2.48,
            17,
            40
        );

    }

    else {

        crearFlorDetallada(
            grupo,
            54,
            348,
            86,
            6,
            retraso + 1.82,
            9
        );


        crearFlorDetallada(
            grupo,
            76,
            310,
            77,
            18,
            retraso + 2.03,
            8
        );


        crearFlorDetallada(
            grupo,
            31,
            288,
            72,
            -18,
            retraso + 2.17,
            8
        );


        crearFlorDetallada(
            grupo,
            62,
            264,
            68,
            9,
            retraso + 2.30,
            9
        );


        crearFlorDetallada(
            grupo,
            87,
            235,
            64,
            19,
            retraso + 2.44,
            7
        );


        crearFlorDetallada(
            grupo,
            29,
            220,
            61,
            -20,
            retraso + 2.57,
            7
        );


        crearFlorDetallada(
            grupo,
            67,
            200,
            57,
            10,
            retraso + 2.70,
            7
        );


        crearFlorDetallada(
            grupo,
            43,
            172,
            51,
            -12,
            retraso + 2.82,
            6
        );


        crearFlorDetallada(
            grupo,
            18,
            260,
            46,
            -27,
            retraso + 2.30,
            5
        );


        crearFlorDetallada(
            grupo,
            94,
            285,
            49,
            25,
            retraso + 2.48,
            5
        );


        crearCapullo(
            grupo,
            20,
            335,
            -22,
            retraso + 2.08,
            18,
            42
        );


        crearCapullo(
            grupo,
            89,
            340,
            21,
            retraso + 2.25,
            18,
            42
        );


        crearCapullo(
            grupo,
            67,
            390,
            7,
            retraso + 2.48,
            17,
            40
        );

    }


    // =================================================
    // BALANCEO
    // =================================================

    setTimeout(
        () => {

            grupo.classList.add(
                "balanceando"
            );

        },

        (
            retraso +
            5.5
        ) * 1000
    );

}


// =====================================================
// TALLO
// =====================================================

function crearTalloDetallado(
    grupo,
    x,
    alto,
    inclinacion,
    retraso
) {

    const tallo =
        document.createElement(
            "div"
        );


    tallo.className =
        "tallo-detallado";


    tallo.style.setProperty(
        "--x-tallo",
        x + "%"
    );


    tallo.style.setProperty(
        "--alto-tallo",
        alto + "px"
    );


    tallo.style.setProperty(
        "--inclinacion",
        inclinacion + "deg"
    );


    tallo.style.setProperty(
        "--retraso-tallo",
        retraso + "s"
    );


    grupo.appendChild(
        tallo
    );

}


// =====================================================
// HOJA DEL TALLO
// =====================================================

function crearHojaDetallada(
    grupo,
    x,
    y,
    ancho,
    alto,
    rotacion,
    retraso
) {

    const hoja =
        document.createElement(
            "div"
        );


    hoja.className =
        "hoja-detallada";


    hoja.style.setProperty(
        "--x-hoja",
        x + "%"
    );


    hoja.style.setProperty(
        "--y-hoja",
        y + "px"
    );


    hoja.style.setProperty(
        "--ancho-hoja",
        ancho + "px"
    );


    hoja.style.setProperty(
        "--alto-hoja",
        alto + "px"
    );


    hoja.style.setProperty(
        "--rotacion-hoja",
        rotacion + "deg"
    );


    hoja.style.setProperty(
        "--retraso-hoja",
        retraso + "s"
    );


    grupo.appendChild(
        hoja
    );

}


// =====================================================
// HOJAS DE LA BASE
// =====================================================

function crearHojaBase(
    grupo,
    x,
    ancho,
    alto,
    rotacion,
    retraso
) {

    const hoja =
        document.createElement(
            "div"
        );


    hoja.className =
        "hoja-base";


    hoja.style.setProperty(
        "--x-base",
        x + "%"
    );


    hoja.style.setProperty(
        "--ancho-base",
        ancho + "px"
    );


    hoja.style.setProperty(
        "--alto-base",
        alto + "px"
    );


    hoja.style.setProperty(
        "--rotacion-base",
        rotacion + "deg"
    );


    hoja.style.setProperty(
        "--retraso-base",
        retraso + "s"
    );


    grupo.appendChild(
        hoja
    );

}


// =====================================================
// RAMA
// =====================================================

function crearRama(
    grupo,
    x,
    y,
    alto,
    rotacion,
    retraso
) {

    const rama =
        document.createElement(
            "div"
        );


    rama.className =
        "rama-lirio";


    rama.style.setProperty(
        "--x-rama",
        x + "%"
    );


    rama.style.setProperty(
        "--y-rama",
        y + "px"
    );


    rama.style.setProperty(
        "--alto-rama",
        alto + "px"
    );


    rama.style.setProperty(
        "--rotacion-rama",
        rotacion + "deg"
    );


    rama.style.setProperty(
        "--retraso-rama",
        retraso + "s"
    );


    grupo.appendChild(
        rama
    );

}


// =====================================================
// FLOR DETALLADA
// =====================================================

function crearFlorDetallada(
    grupo,
    x,
    y,
    tamano,
    rotacion,
    retraso,
    capa = 8
) {

    const flor =
        document.createElement(
            "div"
        );


    flor.className =
        "lirio-detallado";


    flor.style.setProperty(
        "--x-flor",
        x + "%"
    );


    flor.style.setProperty(
        "--y-flor",
        y + "px"
    );


    flor.style.setProperty(
        "--tamano-flor",
        tamano + "px"
    );


    flor.style.setProperty(
        "--rotacion-flor",
        rotacion + "deg"
    );


    flor.style.setProperty(
        "--retraso-flor",
        retraso + "s"
    );


    flor.style.setProperty(
        "--capa-flor",
        capa
    );


    // =================================================
    // RESPLANDOR
    // =================================================

    const resplandor =
        document.createElement(
            "div"
        );


    resplandor.className =
        "resplandor-lirio";


    flor.appendChild(
        resplandor
    );


    // =================================================
    // PÉTALOS EXTERIORES
    // =================================================

    [
        0,
        120,
        240
    ].forEach(
        (
            angulo,
            indice
        ) => {

            const petalo =
                document.createElement(
                    "div"
                );


            petalo.className =
                "petalo-detallado";


            petalo.style.setProperty(
                "--angulo-petalo",
                angulo + "deg"
            );


            petalo.style.setProperty(
                "--retraso-petalo",

                (
                    retraso +
                    .25 +
                    indice * .09
                ) + "s"
            );


            flor.appendChild(
                petalo
            );

        }
    );


    // =================================================
    // PÉTALOS INTERIORES
    // =================================================

    [
        60,
        180,
        300
    ].forEach(
        (
            angulo,
            indice
        ) => {

            const petalo =
                document.createElement(
                    "div"
                );


            petalo.className =
                "petalo-detallado interior";


            petalo.style.setProperty(
                "--angulo-petalo",
                angulo + "deg"
            );


            petalo.style.setProperty(
                "--retraso-petalo",

                (
                    retraso +
                    .48 +
                    indice * .09
                ) + "s"
            );


            flor.appendChild(
                petalo
            );

        }
    );


    // =================================================
    // CENTRO
    // =================================================

    const corazon =
        document.createElement(
            "div"
        );


    corazon.className =
        "corazon-lirio";


    flor.appendChild(
        corazon
    );


    // =================================================
    // ESTAMBRES
    // =================================================

    [
        -40,
        -24,
        -8,
        8,
        24,
        40
    ].forEach(
        (
            angulo,
            indice
        ) => {

            const estambre =
                document.createElement(
                    "div"
                );


            estambre.className =
                "estambre";


            estambre.style.setProperty(
                "--angulo-estambre",
                angulo + "deg"
            );


            estambre.style.setProperty(
                "--retraso-estambre",

                (
                    retraso +
                    1 +
                    indice * .055
                ) + "s"
            );


            flor.appendChild(
                estambre
            );

        }
    );


    // =================================================
    // PISTILO
    // =================================================

    const pistilo =
        document.createElement(
            "div"
        );


    pistilo.className =
        "pistilo";


    flor.appendChild(
        pistilo
    );


    grupo.appendChild(
        flor
    );

}


// =====================================================
// CAPULLO
// =====================================================

function crearCapullo(
    grupo,
    x,
    y,
    rotacion,
    retraso,
    ancho = 20,
    alto = 46
) {

    const capullo =
        document.createElement(
            "div"
        );


    capullo.className =
        "capullo-lirio";


    capullo.style.setProperty(
        "--x-capullo",
        x + "%"
    );


    capullo.style.setProperty(
        "--y-capullo",
        y + "px"
    );


    capullo.style.setProperty(
        "--rotacion-capullo",
        rotacion + "deg"
    );


    capullo.style.setProperty(
        "--retraso-capullo",
        retraso + "s"
    );


    capullo.style.setProperty(
        "--ancho-capullo",
        ancho + "px"
    );


    capullo.style.setProperty(
        "--alto-capullo",
        alto + "px"
    );


    grupo.appendChild(
        capullo
    );

}


// =====================================================
// PÉTALOS VOLANDO
// =====================================================

function crearPetalosVolando() {

    for (
        let i = 0;
        i < 22;
        i++
    ) {

        const petalo =
            document.createElement(
                "div"
            );


        petalo.className =
            "petalo-volando";


        petalo.style.left =
            (
                Math.random() *
                100
            ) + "%";


        petalo.style.animationDelay =
            (
                Math.random() *
                6
            ) + "s";


        petalo.style.animationDuration =
            (
                6 +
                Math.random() *
                4
            ) + "s";


        petalosFinal.appendChild(
            petalo
        );

    }

}


// =====================================================
// DESTELLOS
// =====================================================

function crearDestellos() {

    for (
        let i = 0;
        i < 32;
        i++
    ) {

        const estrella =
            document.createElement(
                "div"
            );


        estrella.className =
            "destello-final";


        estrella.style.left =
            (
                Math.random() *
                100
            ) + "%";


        estrella.style.top =
            (
                Math.random() *
                85
            ) + "%";


        estrella.style.animationDelay =
            (
                Math.random() *
                4
            ) + "s";


        estrella.style.animationDuration =
            (
                1.5 +
                Math.random() *
                2
            ) + "s";


        estrellasFinal.appendChild(
            estrella
        );

    }

}


// =====================================================
// INICIO DEL JUEGO
// =====================================================

window.addEventListener(
    "load",
    () => {

        actualizarPosicion();

        actualizarCodigo();

        comprobarInteraccion();

        actualizarTeclado();

    }
);


window.addEventListener(
    "resize",
    () => {

        actualizarPosicion();

        if (
            !pantallaCircuito.classList.contains(
                "oculto"
            )
        ) {

            dibujarCables();
        }

    }
);