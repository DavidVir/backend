const { Schema, model } = require ('mongoose');

const CriteriosSchema = Schema({ 

    nombre: {
        type: String
    },
    descripcion: {
        type: String
    } 


})

module.exports = model('Criterios', CriteriosSchema);