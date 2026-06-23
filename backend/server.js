// Importar depedencias del backend, cada librería se almacenará en una constante
// La dependencia se almacenará como un objeto
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Iniciamos nuestra aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciamos las depedencias de nuetra aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Conexion a MongoDB
mongoose.connect('mongodb://localhost:27017/IEI_N3_C2')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse a la DB: ', excepcion));

// Testtear si efectivamente la APP está corriendo en el puerto especificado
const PORT = process.env.PORT || 3000;
aplicacion.listen(PORT, () => console.log(`Corriendo en el puerto: ${PORT}`));

const usuario = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    genero: String,
    fechaNacimiento: String
});

const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

// Método POST para guardar datos de USUARIO
// Definimos el "ENDPOINT" o ruta final donde se canalizará la REQUEST (solicitud)
aplicacion.post('/guardarUsuario', async (request, response) => {
    try {
        //
        const { nombre, correo, contrasena, genero, fechaNacimiento } = request.body;
        const nuevoUsuario = new Usuario({ nombre, correo, contrasena, genero, fechaNacimiento });

        await nuevoUsuario.save();
        response.status(200).json({ message: 'Datos Ingresados Correctamente' });
    }
    catch (excepcion) {
        response.status(500).json({ message: 'No ha sido posible guardar los datos: ', excepcion });
    }
});

// Método GET para leer datos de USUARIOS
aplicacion.get('/obtenerUsuarios', async (request, response) => {
    try {
        // Obtenemos una lista de objetos de tipo Usuario
        const usuarios = await Usuario.find();
        // En la RESPONSE (res) formateamos los usuarios como JSON y los enviamos
        response.json(usuarios);
    } catch (excepcion) {
        response.status(500).json({ message: 'No ha sido posible obtener los datos. ', excepcion });
    }
});

// Si hay un error ERR_CONNECTION_REFUSED, puede ser porque el puerto estaba en uso...
// Usando el terminal de windows, buscamos el ID de la aplicación: netstat -ano | findstr :3000
// Teniendo el ID de la aplicación: taskkill /PID id_app /F