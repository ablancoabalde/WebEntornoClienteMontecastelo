window.onload = iniciar;

// Función inciar es llamada despues de que se haya cargado la página.
function iniciar() {

    validarPrivacidad();
    initCookie();
    textoIntentos(getCookie());
    // Evento a la escucha para el submit btnEnviar cuando se haga click
    document.getElementById("btnEnviar").addEventListener('click', validar, false);
    // Evento a la escucha para el input txtNombre cuando pierda el foco
    document.getElementById("txtNombre").addEventListener('blur', mayusculas);
    // Evento a la escucha para el input chkPrivacidad para saber si ha sido marcado o no
    document.getElementById("chkPrivacidad").addEventListener('click', validarPrivacidad);
}

// Función validar recibe el evento por defecto que luego usaremos
function validar(e) {
    // Llamada a la función limpiarErrores
    limpiarErrores();
    // Recogemos la respuesta de cada función de validación, devuelve true o false
    let vNombre = validarNombre();
    let vEdad = validarEdad();
    let vPassword = validarPassword();
    let cIguales = comprobarIguales();
    let vNIF = validarNIF();
    let vCorreo = validarCorreo();
    let vGenero = validarGenero();
    let vTelf = validarTelf();
    let vFrutas = validarFrutas();

    // Si todos son verdaderos devuelve true y envía el formulario si no, llama a la función setCookie previene el envío del formulario 
    // y devuelve false
    if (vNombre && vEdad && vPassword && cIguales && vNIF && vCorreo && vGenero && vTelf && vFrutas && confirm("Pulsa aceptar si deseas enviar el formulario")) {
        return true
    } else {
        setCookie();
        e.preventDefault();
        return false;
    }
}

// Función que valida que la caja de texto Nombre no esté vacía y no tenga espacio
function validarNombre() {
    // Recuperamos el elemento txtNombre 
    let nombre = document.getElementById("txtNombre");

    // Sí el valor de la caja de texto no está vacia y el valor de la caja no contiene espacios devuelve -1 si no encuentra,
    // si no, llama a las funciones validarCondicionErrorNombre pasandole el elemento nombre que devuelve una cadena
    // y llama  a  textoErrores pasandole la cadena devuelta por la anterior función y devuelve false
    if (nombre.value != "" && nombre.value.indexOf(" ") === -1) {
        return true
    } else {
        let texto = validarCondicionErrorNombre(nombre);
        textoErrores(texto);
        return false;
    }
}

// Función que recibe el elemento nombre
function validarCondicionErrorNombre(nombre) {
    // Si el valor del elemento nombre es igual a vacio devuelve la primera cadena
    // si no devuelve la otra
    if (nombre.value == "") {
        // nombre.parentNode.innerText recoge el valor que tiene escrito del label
        return "La caja " + nombre.parentNode.innerText + " no contiene nada";
    } else {
        return "La caja " + nombre.parentNode.innerText + " contiene un espacio";
    }
}

// Función que convierte el valor de la caja txtNombre en mayusculas e introduce el texto en la caja
function mayusculas() {
    let nombre = document.getElementById("txtNombre");
    let nombreMayus = nombre.value.toUpperCase();
    nombre.value = nombreMayus;
}

function validarEdad() {
    let edad = document.getElementById("txtEdad");
    // Si el valor de la caja de texto es un número y la edad está comprendida entre 18 y 120 años entra
    if (!isNaN(edad.valueAsNumber) && edad.valueAsNumber >= 18 && edad.valueAsNumber < 120) {
        return true
    } else {
        let texto = validarCondicionErrorEdad(edad);
        textoErrores(texto);
        return false
    }
}

function validarCondicionErrorEdad(edad) {
    if (isNaN(edad.valueAsNumber)) {
        return "La caja " + edad.parentNode.innerText + " no contiene un número";
    } else {
        return "La caja " + edad.parentNode.innerText + " no contiene un valor comprendido entre 18 y 120 años";
    }
}


function validarPassword() {
    let password = document.getElementById("txtPass1");
    // \w=([a-zA-Z0-9_]) Encuentra un carácter alfanumérico, incluido el guión bajo ( _ )
    // {6,} n o más veces
    let expLong = /\w{6,}/;

    // Testea que el valor de la contraseña cumpla la expresión regular 
    if (expLong.test(password.value)) {
        return true;
    } else {
        let texto = validarCondicionErrorPassword(password);
        textoErrores(texto);
        return false;
    }
}

function validarCondicionErrorPassword(password) {
    if (password.value == "") {
        return "La caja " + password.parentNode.innerText + " está vacía";
    } else {
        return "La caja " + password.parentNode.innerText + " contiene menos de 6 caracteres.";
    }
}


function comprobarIguales() {
    let password1 = document.getElementById("txtPass1");
    let password2 = document.getElementById("txtPass2");

    // Comprueba que el valor de la contraseña 1 es igual a la contraseña 2
    if (password1.value == password2.value) {
        return true;
    } else {
        let texto = "Las contraseñas no son iguales.";
        textoErrores(texto);
        return false;
    }
}

function validarNIF() {
    let nif = document.getElementById("txtNIF");
    //^(\d{8}) agrupación de 8 números seguida por una letra al final ([a_zA-Z])$
    let expNif = /^(\d{8})([a_zA-Z])$/;
    // Testea que el valor del nif que cumpla la expresión regular y que la función validarLetra devuelva true
    if (expNif.test(nif.value) && validarLetra(nif)) {
        return true;
    } else {
        let texto = validarCondicionErrorNIF(expNif, nif);
        textoErrores(texto);
        return false;
    }
}

// Valida que el dni introducido tenga la letra que le corresponde
function validarLetra(nif) {
    var nif_letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    // parseInt(nif.value, 10) convierte el valor introducido en base 10 sin la letra el resultado lo divide entre 23 y se queda el resto
    // el resto es una posición que busca .charAt en el array de letras y la almacena
    var letra = nif_letras.charAt(parseInt(nif.value, 10) % 23);
    // si la letra calculada es igual a la introducida por el usuario es correcto, si no no
    if (letra == nif.value.charAt(8)) {
        return true;
    } else {
        return false;
    }

}

function validarCondicionErrorNIF(expNif, nif) {

    if (nif.value == "") {
        return "Caja NIF vacía.";
    } else if (!expNif.test(nif.value)) {
        return "Formato " + nif.parentNode.innerText + " erroneo .";
    } else {
        return "Letra no corresponde con el NIF introducido.";
    }
}


function validarCorreo() {
    let correo = document.getElementById("txtEmail");

    let expCorreo = /\w+([-+.']\w+)*@ciclosmontecastelo\.com$/;
    // Testea que el valor del correo cumpla la expresión regular
    if (expCorreo.test(correo.value)) {
        return true;
    } else {
        let texto = validarCondicionErrorCorreo(correo);
        textoErrores(texto);
        return false;
    }
}

function validarCondicionErrorCorreo(correo) {

    if (correo.value == "") {
        return "Caja correo vacía.";
    } else {
        return "La caja " + correo.parentNode.innerText + " contiene un dominio distinto de ciclosmontecastelo.com.";
    }
}

function validarGenero() {
    // Recogemos todos los elementos cuyo nombre sea genero
    let rdbGenero = document.getElementsByName("genero");

    // Creo una variable condicionante para saber si algún genero está seleccionado
    let seleccionado = false;
    // Recorremos el array
    for (var i = 0; i < rdbGenero.length; i++) {
        // Si el elemento esta checked entra y cambia el valor de la variable condicionante a true
        if (rdbGenero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    // Sí algún elemento esta checked la variable condicionante sera true y entrará, si no hay ninguna seleccionada pues dará false
    if (seleccionado) {
        return true;
    } else {
        let texto = "No ha seleccionado ningún genero.";
        textoErrores(texto);
        return false;
    }

}

function validarTelf() {
    let telefono = document.getElementById("txtTelf");

    // ^\d{9}$ desde el principio solo puede contener números 9 veces hasta el final
    let expTelf = /^\d{9}$/;
    // Testea que el valor del telefono cumpla la expresión regular
    if (expTelf.test(telefono.value)) {
        return true;
    } else {
        let texto = validarCondicionErrorTelf(telefono);
        textoErrores(texto);
        return false;
    }

}

function validarCondicionErrorTelf(telefono) {

    if (telefono.value == "") {
        return "Caja teléfono vacía.";
    } else {
        return "La caja " + telefono.parentNode.innerText + " solo puede contener 9 números.";
    }
}


function validarFrutas() {
    let checkFrutas = document.getElementById("frutas");

    // Si los elementos seleccionados son 2 o 3
    if (checkFrutas.selectedOptions.length == 2 || checkFrutas.selectedOptions.length == 3) {
        return true;
    } else {
        let texto = validarCondicionErrorFrutas(checkFrutas);
        textoErrores(texto);
        return false;
    }

}

function validarCondicionErrorFrutas(checkFrutas) {

    if (checkFrutas.selectedOptions.length < 2) {
        return "Número de frutas seleccionado menor que 2.";
    } else {
        return "Número de frutas seleccionado mayor que 3.";
    }
}


function validarPrivacidad() {
    let checkPrivacidad = document.getElementById("chkPrivacidad");

    // Si el checkPrivacidad está marcado habilita el botón envían si no,no
    if (checkPrivacidad.checked) {
        document.getElementById("btnEnviar").disabled = false;
    } else {
        document.getElementById("btnEnviar").disabled = true;
    }

}

// Función para aumentar y guardar la variable contador en una cookie
function setCookie() {
    let contador = document.cookie;
    contador = parseInt(contador) + 1;
    document.cookie = contador;
    textoIntentos(contador);
}

// Inicializa la cookie a 0
function initCookie() {
    document.cookie = 0;
}

// Recupera el valor de la cookie y la devuelve
function getCookie() {
    return document.cookie;
}

// Función que recibe un texto inserta parrafos dentro de un div
function textoErrores(texto) {
    let divErrores = document.getElementById("errores");
    let pErrores = document.createElement("p");
    let textoErrorP = document.createTextNode(texto);
    pErrores.appendChild(textoErrorP);
    divErrores.appendChild(pErrores);
}

// Función que recibe un texto y modifica el valor texto del div intentos
function textoIntentos(contador) {
    let divIntentos = document.getElementById("intentos");
    let texto = "Se ha enviado el formulario " + contador + " veces.";
    divIntentos.innerHTML = texto;
}

// Limpia la lista de errores generados
function limpiarErrores() {
    // Recuperamos el div errores
    let arrayErrores = document.getElementById("errores");

    // Mientras el array tenga nodos hijos los recorre y va eleminando del array el primer hijo hasta que no quede ninguno
    while (arrayErrores.hasChildNodes()) {
        arrayErrores.removeChild(arrayErrores.firstChild);
    }

}
