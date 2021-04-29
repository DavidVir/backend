
const express = require('express')
const Criterios = require('../models/criterios');


const crearcriterios = async (req, res = express.response) => {

    try {

        const { nombre } = req.body;
        const data = req.body;
        console.log(data);
        const criterios = new Criterios(data);


        Criterios.find({ nombre: nombre }, async (err, doc) => {

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
                    await criterios.save();
                    return res.json({
                        ok: 'true',
                        resultado: 'criterio almacenado'
                    })
                } else {

                    Criterios.updateOne({ nombre: nombre }, { $set: data }, (err, doc) => {

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
                                resultado: 'El criterio a sido actualizado con exito',
                                criterios: doc
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


const eliminarcriterios = (req, res = express.response) => {

    const { nombre } = req.body;

    Criterios.findOneAndDelete({ nombre: nombre }, (err, doc) => {
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
                    resultado: 'No se ha encontrado ningun criterio con ese nombre'
                })
            } else {
                console.log(doc)
                return res.json({
                    ok: 'true',
                    resultado: 'criterio Eliminado'
                })
            }
        }
    });


}

const consultarcriterios = (req, res = express.response) => {

    Criterios.find({}, (err, docs) => {

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

const buscarcriterio = (req , res = express.response) => {

    const { nombre } = req.body;

    Criterios.findOne({nombre: nombre}, (err, doc) =>{

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal:P '
            })
        } else {
            if(doc == null){
                return res.status(200).json({
                    resultado: 'No se ha encontrado resultados con ese nombre'
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
    crearcriterios,
    eliminarcriterios,
    consultarcriterios,
    buscarcriterio
}