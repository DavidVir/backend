const { Schema, model } = require ('mongoose');

const EvaluadorSchema = Schema({ 

    nombre: {
        type: String
    },
    cargo: {
        type: String
    }, 
    telefono: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },


})


module.exports = model('Evaluador', EvaluadorSchema);
