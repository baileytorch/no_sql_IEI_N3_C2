function validarFormulario() {
    let campoNombre = $('#input_nombre');
    let campoCorreo = $('#input_correo');
    let campoContrasena = $('#input_contrasena');
    let campoRepetirContrasena = $('#input_rep_contrasena');
    let selectGenero = $('#selectGenero');
    let campoFechaNacimiento = $('#inputNacimiento');
    let campoArchivo = $('#inputFoto');
    let campoError = $('#errorFormulario');
    let listaErrores = $('#listaErrores');
    let mensajeError = '';
    let formularioValido = true;

    if (campoNombre.val() == '') {
        campoNombre.addClass('is-invalid');
        mensajeError += '<li>El campo NOMBRE es requerido.</li>';
        formularioValido = false;
    } else {
        campoNombre.removeClass('is-invalid');
        campoNombre.addClass('is-valid');
    }

    if (campoCorreo.val() == '') {
        campoCorreo.addClass('is-invalid');
        mensajeError += '<li>El campo EMAIL es requerido.</li>';
        formularioValido = false;
    } else {
        campoCorreo.removeClass('is-invalid');
        campoCorreo.addClass('is-valid');
    }

    if (!validarCorreo(campoCorreo.val())) {
        campoCorreo.addClass('is-invalid');
        mensajeError += '<li>EMAIL inválido.</li>';
        formularioValido = false;
    } else {
        campoCorreo.removeClass('is-invalid');
        campoCorreo.addClass('is-valid');
    }

    if (campoContrasena.val() == '') {
        campoContrasena.addClass('is-invalid');
        mensajeError += '<li>El campo CONTRASEÑA es requerido.</li>';
        formularioValido = false;
    } else {
        campoContrasena.removeClass('is-invalid');
        campoContrasena.addClass('is-valid');
    }

    if (campoContrasena.val() == '' || campoContrasena.val() != '' && !validarContrasenaSegura(campoContrasena.val())) {
        campoContrasena.addClass('is-invalid');
        mensajeError += '<li>La CONTRASEÑA ingresada no es segura.</li>';
        formularioValido = false;
    } else {
        campoContrasena.removeClass('is-invalid');
        campoContrasena.addClass('is-valid');
    }

    if (campoRepetirContrasena.val() == '') {
        campoRepetirContrasena.addClass('is-invalid');
        mensajeError += '<li>El campo REPETIR CONTRASEÑA es requerido.</li>';
        formularioValido = false;
    } else {
        campoRepetirContrasena.removeClass('is-invalid');
        campoRepetirContrasena.addClass('is-valid');
    }

    if (campoRepetirContrasena.val() == '' || campoContrasena.val() != '' && campoRepetirContrasena.val() != campoContrasena.val()) {
        campoRepetirContrasena.addClass('is-invalid');
        mensajeError += '<li>Las CONTRASEÑAS no coinciden.</li>';
        formularioValido = false;
    } else {
        campoRepetirContrasena.removeClass('is-invalid');
        campoRepetirContrasena.addClass('is-valid');
    }

    if (selectGenero.val() == '') {
        selectGenero.addClass('is-invalid');
        mensajeError += '<li>El campo GÉNERO es requerido.</li>';
        formularioValido = false;
    } else {
        selectGenero.removeClass('is-invalid');
        selectGenero.addClass('is-valid');
    }

    if (campoFechaNacimiento.val() == '') {
        campoFechaNacimiento.addClass('is-invalid');
        mensajeError += '<li>El campo FECHA DE NACIMIENTO es requerido.</li>';
        formularioValido = false;
    } else {
        campoFechaNacimiento.removeClass('is-invalid');
        campoFechaNacimiento.addClass('is-valid');
    }

    if (formularioValido) {
        campoError.show();
        alert('Formulario válido. Enviando datos...');

        const formulario = $('#formularioRegistro');
        const dataForm = new FormData(formulario);
        const datos = Object.fromEntries(dataForm.entries());

        const enviarFormulario = async () => {
            try{
                const respuesta = await fetch('http://localhost:3000/guardarUsuario',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                const data = await respuesta.json();
                console.log('Datos alcenados correctamente: ', data);
                if (respuesta.ok){
                    window.location.href = './listado.html';
                }
            }catch(error){
                console.log('Ha ocurrido un error: ', error);
            }
        }
        enviarFormulario();
    } else {
        listaErrores.html(mensajeError);
        campoError.show();
    }
}

function validarCorreo(email) {
    const expresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expresion.test($(email).val())
};

function validarContrasenaSegura(contrasena) {
    const expresionRegular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return expresionRegular.test($(contrasena).val())
}

function validarElemento(elemento) {
    elemento = $(elemento);
    if (elemento.val() != '') {
        elemento.removeClass('is-invalid');
        elemento.addClass('is-valid');
    }
};

function validarCampoCorreo(elemento) {
    elemento = $(elemento);
    if (elemento.val() != '' && validarCorreo(elemento.val())) {
        elemento.removeClass('is-invalid');
        elemento.addClass('is-valid');
    }
};

function validarCampoContrasena(elemento) {
    elemento = $(elemento);
    if (elemento.val() != '' && validarContrasenaSegura(elemento.val())) {
        elemento.removeClass('is-invalid');
        elemento.addClass('is-valid');
    }
};

function validarCampoRepetirContrasena(elemento) {
    elemento = $(elemento);
    if (elemento.val() != '' && elemento.val() == $('#input_contrasena').val()) {
        elemento.removeClass('is-invalid');
        elemento.addClass('is-valid');
    }
};