function validarFormulario() {
    let campoNombre = document.getElementById('input_nombre');
    let campoCorreo = document.getElementById('input_correo');
    let campoContrasena = document.getElementById('input_contrasena');
    let campoRepetirContrasena = document.getElementById('input_rep_contrasena');
    let selectGenero = document.getElementById('selectGenero');
    let campoFechaNacimiento = document.getElementById('inputNacimiento');
    let campoArchivo = document.getElementById('inputFoto');
    let campoError = document.getElementById('errorFormulario');
    let listaErrores = document.getElementById('listaErrores');
    let mensajeError = '';
    let formularioValido = true;

    if (campoNombre.value == '') {
        campoNombre.classList.add('is-invalid');
        mensajeError += '<li>El campo NOMBRE es requerido.</li>';
        formularioValido = false;
    } else {
        campoNombre.classList.remove('is-invalid');
        campoNombre.classList.add('is-valid');
    }

    if (campoCorreo.value == '') {
        campoCorreo.classList.add('is-invalid');
        mensajeError += '<li>El campo EMAIL es requerido.</li>';
        formularioValido = false;
    } else {
        campoCorreo.classList.remove('is-invalid');
        campoCorreo.classList.add('is-valid');
    }

    if (!validarCorreo(campoCorreo.value)) {
        campoCorreo.classList.add('is-invalid');
        mensajeError += '<li>EMAIL inválido.</li>';
        formularioValido = false;
    } else {
        campoCorreo.classList.remove('is-invalid');
        campoCorreo.classList.add('is-valid');
    }

    if (campoContrasena.value == '') {
        campoContrasena.classList.add('is-invalid');
        mensajeError += '<li>El campo CONTRASEÑA es requerido.</li>';
        formularioValido = false;
    } else {
        campoContrasena.classList.remove('is-invalid');
        campoContrasena.classList.add('is-valid');
    }

    if (campoContrasena.value == '' || campoContrasena.value != '' && !validarContrasenaSegura(campoContrasena.value)) {
        campoContrasena.classList.add('is-invalid');
        mensajeError += '<li>La CONTRASEÑA ingresada no es segura.</li>';
        formularioValido = false;
    } else {
        campoContrasena.classList.remove('is-invalid');
        campoContrasena.classList.add('is-valid');
    }

    if (campoRepetirContrasena.value == '') {
        campoRepetirContrasena.classList.add('is-invalid');
        mensajeError += '<li>El campo REPETIR CONTRASEÑA es requerido.</li>';
        formularioValido = false;
    } else {
        campoRepetirContrasena.classList.remove('is-invalid');
        campoRepetirContrasena.classList.add('is-valid');
    }

    if (campoRepetirContrasena.value == '' || campoContrasena.value != '' && campoRepetirContrasena.value != campoContrasena.value) {
        campoRepetirContrasena.classList.add('is-invalid');
        mensajeError += '<li>Las CONTRASEÑAS no coinciden.</li>';
        formularioValido = false;
    } else {
        campoRepetirContrasena.classList.remove('is-invalid');
        campoRepetirContrasena.classList.add('is-valid');
    }

    if (selectGenero.value == '') {
        selectGenero.classList.add('is-invalid');
        mensajeError += '<li>El campo GÉNERO es requerido.</li>';
        formularioValido = false;
    } else {
        selectGenero.classList.remove('is-invalid');
        selectGenero.classList.add('is-valid');
    }

    if (campoFechaNacimiento.value == '') {
        campoFechaNacimiento.classList.add('is-invalid');
        mensajeError += '<li>El campo FECHA DE NACIMIENTO es requerido.</li>';
        formularioValido = false;
    } else {
        campoFechaNacimiento.classList.remove('is-invalid');
        campoFechaNacimiento.classList.add('is-valid');
    }

    if (formularioValido) {
        campoError.style.display = 'none';
        alert('Formulario válido. Enviando datos...');
    } else {
        listaErrores.innerHTML = mensajeError;
        campoError.style.display = 'block';
    }
}

function validarCorreo(email) {
    const expresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expresion.test(email)
};

function validarContrasenaSegura(contrasena) {
    const expresionRegular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return expresionRegular.test(contrasena)
}

function validarElemento(elemento) {
    if (elemento.value != '') {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    }
};

function validarCampoCorreo(elemento) {
    if (elemento.value != '' && validarCorreo(elemento.value)) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    }
};

function validarCampoContrasena(elemento) {
    if (elemento.value != '' && validarContrasenaSegura(elemento.value)) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    }
};

function validarCampoRepetirContrasena(elemento) {
    if (elemento.value != '' && elemento.value == document.getElementById('input_contrasena').value) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    }
};