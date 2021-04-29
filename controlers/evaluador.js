
const express = require('express')
const Evaluador = require('../models/evaluador');


const crearevaluador = async (req, res = express.response) => {

    try {

        const { Email } = req.body;
        const data = req.body;
        console.log(data);
        const evaluador = new Evaluador(data);


        Evaluador.find({ Email: Email }, async (err, doc) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    ok: 'false',
                    resultado: 'Algo ha salido mal :P '
                })

            } else {
                console.log(doc.length);
                if (doc.length == 0) {
                    console.log(data);
                    await evaluador.save();
                    return res.json({
                        ok: 'true', 
                        resultado: 'evaluador almacenado'
                    })
                } else {

                    Evaluador.updateOne({ Email: Email }, { $set: data }, (err, doc) => {

                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                ok: 'false',
                                resultado: 'Algo ha salido mal :P '
                            })
                        } else {
                            console.log(data);
                            return res.status(200).json({
                                ok: 'true',
                                resultado: 'El evaluador a sido actualizado con exito',
                                evaluador: doc
                            })
                        }


                    })

                }
            }
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            resultado: 'Algo ha salido mal :P'
        });

    }

}


const eliminarevaluador = (req, res = express.response) => {

    const { Email } = req.body;

    Evaluador.findOneAndDelete({ Email: Email }, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal :P '
            })
        } else {
            if (doc == null) {
                return res.json({
                    ok: 'false',
                    resultado: 'No se ha encontrado ningun evaluador con ese correo electronico'
                })
            } else {
                console.log(doc)
                return res.json({
                    ok: 'true',
                    resultado: 'evaluador Eliminado'
                })
            }
        }
    });


}

const consultarevaluador = (req, res = express.response) => {

    Evaluador.find({}, (err, docs) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal :P '
            })
        } else {
            console.log(docs)
            return res.json({
                docs
            })
        }
    });

}

const buscarEvaluador = (req , res = express.response) => {

    const { Email } = req.body;

    Evaluador.findOne({Email: Email}, (err, doc) =>{

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal:P '
            })
        } else {
            if(doc == null){
                return res.status(200).json({
                    resultado: 'No se ha encontrado resultados con ese Email'
                })
            }else{
                console.log(doc)
                return res.json({
                doc
                })
            }    
        }


    });

}

module.exports = {
    crearevaluador,
    eliminarevaluador,
    consultarevaluador,
    buscarEvaluador
}