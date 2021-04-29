const { Schema, model } = require ('mongoose');

const EvaluacionSchema = Schema({
    
    fecha: {
        type: Date
    },
    evaluador: {
        type: String
    },
    proveedor: {
        type: String
    },


    criterios: [
    {
        descripcion: {
            type:String
        },
        calificacion: {
            type: Number
        }
    }],


})


module.exports = model('Evaluacion', EvaluacionSchema);