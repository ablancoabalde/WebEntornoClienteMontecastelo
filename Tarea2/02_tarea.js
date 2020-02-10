
window.addEventListener("load", carga);

function carga() {
    // Llamada para el Apartado 1
    let btnColor = document.getElementById("btnColor");
    btnColor.addEventListener("click", cambiarColor);

    // Llamada para el Apartado 2
    var encabezadoH4 = document.getElementById("heaCumbres");
    encabezadoH4.addEventListener("click", insertarTabla);

    // Llamadas para el Apartado 3
    var addList = document.getElementById("btnAnadir");
    addList.addEventListener("click", addLista);
    var deleteList = document.getElementById("btnBorrar");
    deleteList.addEventListener("click", borrarLista);
    // Llamadas para el Apartado 3
    var txtEuro = document.getElementById("txtEuro");
    txtEuro.addEventListener("keyup", cambioDolar);
    var txtDolar = document.getElementById("txtDolar");
    txtDolar.addEventListener("keyup", cambioEuro);

}

// Funciónes para el Apartado 1
function cambiarColor() {
    // Recogemos el elemento txtColor
    let txtcolor = document.getElementById("txtColor");
    // Creamo variable color para almacenar el color
    let color;
    // Creamos un Switch para comparar lo que escribe el usuario con nuestros valores por defecto
    // y dependiendo de la opción almacenará el color en la variable
    switch (txtcolor.value) {
        case "rojo":
            color = "red"
            break;
        case "verde":
            color = "green"
            break;
        case "azul":
            color = "blue"
            break;
        case "amarillo":
            color = "yellow"
            break;
        default:
            alert("Color no soportado")
            break;
    }
    // Llamada a la función
    limpiarCajaTexto(txtcolor);
    // Obtenemos todos lo elementos que contienen la clase color_submarino
    let arrayColor = document.getElementsByClassName("color_submarino");
    // Recorremos el array de los elementos
    for (let field of Array.from(arrayColor)) {
        // Insertamos el stylo y el color elegido por teclado
        field.style.color = color;
    }
}
// Función para limpiar la caja de texto
function limpiarCajaTexto(txtcolor) {
    txtcolor.value = "";
}

// Funciónes para el Apartado 2
function insertarTabla() {
    // Obtenemos el div donde debemos insertar la Tabla
    let div = document.getElementById("cumbres");
    // Creamos las etiquetas table, table Header y table body
    let tabla = document.createElement("table");
    let tblHeader = document.createElement("thead");
    let tblBody = document.createElement("tbody");
    // Array para almacenar las claves de todos los objetos
    let arrayTitulos = [];
    // Recorremos el array cumbres para poder recorrer cada objeto que haya en su interior
    for (let field of Array.from(cumbres)) {
        // Recorremos el objeto que contiene varias clave - valor y sacamos solo la clave
        for (let titulo of Object.keys(field)) {
            // Llamada a la función capitalizar que recibe el valor de la clave la primera según el ejemplo es nombre
            let tituloCapitalizado = capitalizar(titulo);
            // Añadimos todas las claves que encuentre en el array ya estén repetidos o no
            arrayTitulos.push(tituloCapitalizado);

        }

    }

    // Creamos una fila
    let fila = document.createElement("tr");
    // Clonamos el arrayTitulos pero en este caso con el new Set nos lo crea sin valores repetidos
    let arrayTitulosCopia = new Set(arrayTitulos);
    // Recorremos el arrayTitulosCopia para ir creando las columnas de cada fila insertando las claves que contienen el array orginal
    for (let valor of arrayTitulosCopia) {
        // Creamos la celda de la columna puede ser th si queremos que sea en negrita o td para que sea igual que el resto
        let celda = document.createElement("td");
        // Creamos el contendido de cada celda
        let textoCelda = document.createTextNode(valor);
        // Anexamos el texto a la celda
        celda.appendChild(textoCelda);
        // Anexamos la celda a la fila
        fila.appendChild(celda);
    }
    // Anexamos la fila al zona del encabezado
    tblHeader.appendChild(fila);

    /* El motivo por el cual realice el ejercicio de esta forma tan larga es para hacer la tabla lo más dinámica posible, quiero decir que si al array 02_cumbre.js se le agrega esto
    
    ,{
        nombre: "Manzaneda",
        altura: 1697,
        pais: "España",
        bonito:"si"
    }
    la tabla se crea sin problema con la columna a más donde corresponda
    */

    // Volvemos a obtener los objetos del array
    for (let field of Array.from(cumbres)) {
        // Creamos una fila
        let fila = document.createElement("tr");
        // Volvemos a recorrer el objeto
        for (let titulos of Object.keys(field)) {
            // Creamos la celda
            let celda = document.createElement("td");
            // Creamos el contendido de cada celda
            /*
            El motivo por el qué volvi a hacer un doble bucle es por el contenido de cada celda.
            Lo normal es que se hubiese hecho en un bucle poniendo field.nombre, field.altura, etc. Dependiendo de los campos que haya, pero eso quiere indicar que,
            tienes que saber los campos que vas a mostrar de antemano y conocer sus nombres, de la manera que yo lo hice, no lo necesita va guardando el valor de cada 
            clave que haya en cada objeto de manera dinámica.
            */
            let textoCelda = document.createTextNode(field[titulos]);
            // Anexamos el texto a la celda
            celda.appendChild(textoCelda);
            // Anexamos la celda a la fila
            fila.appendChild(celda);
        }
        // Anexamos la fila al zona del cuerpo
        tblBody.appendChild(fila);
    }
    // Anexamos el encabezado <theader> a la tabla
    tabla.appendChild(tblHeader);
    // Luego anexamos el cuerpo <tbody> debajo del elemento <theader>
    tabla.appendChild(tblBody);
    // Y por último la tabla <table> al div <div>  indicado
    div.appendChild(tabla);

    // Para remover el evento click del h4, así solo se puede pulsar una vez
    document.getElementById("heaCumbres").removeEventListener("click", insertarTabla);

}

//Lo que hace esta función capitalize(string) es, dada una cadena, convierte su primer carácter en su equivalente mayúscula.
function capitalizar(string) {
    // Coge la posición 0 del string, la pasa a mayúscula y slice devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Funciones para el Apartado 3

function addLista() {
    // Obtenemos el elemeto ul padre
    let ul = document.getElementById("listaActividades");
    // Obtenemos el texto escrito por el usuario
    let txtAdd = document.getElementById("txtAnadir").value;
    // Condición sí el campo de texto no está vacío que introduzca el valor en la lista
    if (txtAdd != "") {
        // Creamos un elemento li
        let li = document.createElement('li');
        // Creamos el texto que se añadirá al elemento li
        let textoLi = document.createTextNode(txtAdd);
        // Anexamos el texto al li
        li.appendChild(textoLi);
        // Anexamos el li al ul
        ul.appendChild(li);
        // Limpiamos caja de texto txtAnadir
        document.getElementById("txtAnadir").value = "";
    }
}

function borrarLista() {
    // Obtenemos el texto escrito por el usuario
    let txtDelete = document.getElementById("txtBorrar").value;
    // Obtenemos el elemeto ul padre
    let nodoPadre = document.getElementById("listaActividades");
    // Obtenemos un array que contiene cada elemento li del padre
    let arrayLista = document.getElementById("listaActividades").getElementsByTagName("li");
    // Recorremos el array
    for (let i = 0; i < arrayLista.length; i++) {
        // Sí el texto de algún elemento li es igual a lo que introdujo el usuario por pantalla
        if (arrayLista[i].textContent == txtDelete) {
            // Remove el hijo del elemento padre (arrayLista[i]) = es un elemento hijo
            nodoPadre.removeChild(arrayLista[i]);
            // Limpiamos caja de texto txtBorrar
            document.getElementById("txtBorrar").value = "";
        }
    }
    // Limpiamos caja de texto txtBorrar
    document.getElementById("txtBorrar").value = "";
}

// Funciones para el Apartado 4

function cambioDolar() {
    // Obtenemos el texto escrito por el usuario
    let valorTxtEuro = document.getElementById("txtEuro").value;
    // Obtenemos el elemento con id txtDolar
    let valorTxtDolar = document.getElementById("txtDolar");
    // Sí el valor introducido es un número y no está vacía la caja
    if (!isNaN(valorTxtEuro) & valorTxtEuro != "") {
        // Añade a la caja de texto el valor calculado con solo 2 decimales
        valorTxtDolar.value = (valorTxtEuro * 1.12).toFixed(2);
    } else {
        // Si no, muestra la caja vacía
        valorTxtDolar.value = "";
    }
}

function cambioEuro() {
    // Lo mismo que el anterior pero pasando dolares a euros
    let valorTxtDolar = document.getElementById("txtDolar").value;

    if (!isNaN(valorTxtDolar) & valorTxtDolar != "") {
        document.getElementById("txtEuro").value = (valorTxtDolar / 1.12).toFixed(2);
    } else {
        document.getElementById("txtEuro").value = "";
    }

}