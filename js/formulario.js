window.onload = function(){
}

function validarFormulario(){
    let datoNombre = document.getElementById('input_nombre').value;
    let datoCorreo = document.getElementById('input_correo').value;
    let datoContrasena = document.getElementById('input_contrasena').value;
    let datoRepetirContrasena = document.getElementById('input_rep_contrasena').value;
    let datoGenero = document.getElementById('selectGenero').value;
    let datoFechaNacimiento = document.getElementById('inputNacimiento').value;
    let datoArchivo = document.getElementById('inputFoto').value;

    console.log(
        datoNombre + '\n' +
        datoCorreo + '\n' +
        datoContrasena + '\n' +
        datoRepetirContrasena + '\n' +
        datoGenero + '\n' +
        datoFechaNacimiento + '\n' +
        datoArchivo
    )
}