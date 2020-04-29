/* Se delega los eventos al documento, para que cuando se recargue la lista de paises
con AJAX los elementos nuevos creados se le asocie el evento click.
Si estos eventos los llamaras dentro de la función inicio(), solo funcionarian hasta que 
recargaras los elementos,porque al ser elementos que se cargan/crean después de haber cargado el script,
estos  ya no se ven afectados.
*/
$(document)
    .on("click", "ul.countryList li", functionEnabled)
    .on("click", "li#Spain", function () { alert(this.innerText) })
    .on("click", "li#USA", function () { alert(this.innerText) });

$(document).ready(inicio);
// Función que se llama una vez se haya cargado la página
function inicio() {

    $("a.remove").click(borrarPaises);

    $("input.q").keyup(buscar);

    $("a.reload").click(recargarPaises);

}

// Función que añade o remueve la clase enabled a los elemetos li de ul.countryList
function functionEnabled() {
    // $(this)="ul.countryList li"

    // Sí el elemento tiene la clase enabled, remueve esta, si no, se la añade.
    if ($(this).hasClass("enabled")) {
        $(this).removeClass("enabled")
    } else {
        $(this).addClass("enabled")
    }
}

// Función que elimina los elementos li que tengan la clase enabled
function borrarPaises() {
    /*
    Al haber 2 div continente queremos que cuándo se pulse borrar en el div continent Europa, solo elimine los elementos
    li con la clase enabled que estén dentro de este div.
    */
    /*
    Para ello usamos la condición de que el texto que contiene el padre (this.parentNode.innerText) siendo el hijo (this=a.remove), sea igual al string EUROPE. $.trim elimina cualquier espacio que puediera traer.
    */
    if ($.trim(this.parentNode.innerText) == "EUROPE") {
        /*
        find busca en el div con el id Europe todos los elementos li con la clase enabled y para cada uno de ellos realiza la 
        función de eliminarlos.
        */
        $("div#Europe").find("li.enabled").each(function () {
            $(this).remove();
        })
    } else {
        $("div#NorthAmerica").find("li.enabled").each(function () {
            $(this).remove();
        })
    }
}

// Función que busca los paises que contengan la letra/letras introducidas en el input
function buscar() {
    // Recogemos el valor string del input
    let txtBuscador = $(this).val()
    // Recogemos todos los elementos li que están dentro de la lista countryList
    let array = $("ul.countryList li")
    // Recorremos el bucle
    $.each(array, function () {
        // Recogemos el texto que contiene el elemento que se está recorriendo
        let nombrePais = this.innerText
        // Si se cumple la condición de que nombrePais (convertido a minuscula) no contiene (indexOf), la letra o letras txtBuscador (convertido a minuscula), oculta el elemento si no muestralo
        if (nombrePais.toLowerCase().indexOf(txtBuscador.toLowerCase()) == -1) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
}

// Función que hace una petición AJAX al documento getCountries.php
function recargarPaises() {

    // Indentificación de los div de la misma manera que en la función borrarPaises
    if ($.trim(this.parentNode.innerText) == "EUROPE") {

        $.ajax({
            url: "getCountries.php", //URL donde realizamos la petición
            data: { continent: "Europe" }, //Datos a enviar, como objeto o como cadena
            dataType: "json", // Tipo de datos 
            type: "GET", // Tipo de Petición
            success: function (respuesta) { //Función si la petición ha ido bien

                // Eliminamos todos los elementos li que estén dentro del div Europa
                $("div#Europe  ul.countryList  li").remove();
                // Obtenemos la lista a la que se le añadiran los elementos li
                var listCountries = $("div#Europe ul.countryList");
                // Recorremos la respuesta de AJAX, un json que contiene un elemento result que contiene todos los paises
                $.each(respuesta.result, function (index, elemento) {
                    // elemento = nombre del pais
                    /*
                    Condición para que si el elemento es igual a Spain le añada el id Spain, para el evento Click llamada en la línea 9, si no los genera de manera estandar
                    */
                    if (elemento == "Spain") {
                        listCountries.append(
                            '<li class="country inline-block" id="Spain">' +
                            '<a href="#" class="inline-block">' + elemento + '</a>' +
                            '</li>'
                        );
                    } else {
                        listCountries.append(
                            '<li class="country inline-block">' +
                            '<a href="#" class="inline-block">' + elemento + '</a>' +
                            '</li>'
                        );
                    }

                });
            },
            error: function (xhr, status) { //Función si la petición ha fallado
                alert("Ha ocurrido un error");
            }
        });
    } else {

        $.ajax({
            url: "getCountries.php", //URL donde realizamos la petición
            data: { continent: "NorthAmerica" }, //Datos a enviar, como objeto o como cadena
            dataType: "json",
            type: "GET",
            success: function (respuesta) { //Función si la petición ha ido bien
                $("div#NorthAmerica  ul.countryList  li").remove();
                var listCountries = $("div#NorthAmerica ul.countryList");
                $.each(respuesta.result, function (index, elemento) {
                    if (elemento == "United States of America") {
                        listCountries.append(
                            '<li class="country inline-block" id="USA">' +
                            '<a href="#" class="inline-block">' + elemento + '</a>' +
                            '</li>'
                        );
                    } else {
                        listCountries.append(
                            '<li class="country inline-block">' +
                            '<a href="#" class="inline-block">' + elemento + '</a>' +
                            '</li>'
                        );
                    }
                });

            },
            error: function (xhr, status) { //Función si la petición ha fallado
                alert("Ha ocurrido un error");
            }

        });
    }

}

