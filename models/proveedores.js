const { Schema, model } = require ('mongoose');

const ProveedorSchema = Schema({

    nombre: {
        type: String
    },
    DNI: {
        type: String
    }, 
    razon: {
        type: String
    },
    direccion: {
        type: String
    },
    codigopostal:{
        type: String
    },
    ciudad:{
        type: String
    },
    departamento: {
        type: String
    },
    pais: {
        type: String
    },
    telefono: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Descripcion: {
        type: String
    }

});

module.exports = model('Proveedor', ProveedorSchema );