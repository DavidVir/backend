
const express = require('express')
const Proveedor = require('../models/proveedores');


const crearproveedor = async (req, res = express.response) => {

    try {

        const { Email } = req.body;
        const data = req.body;
        console.log(data);
        const proveedor = new Proveedor(data);


        Proveedor.find({ Email: Email }, async (err, doc) => {

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
                    await proveedor.save();
                    return res.json({
                        ok: 'true',
                        resultado: 'Proveedor almacenado'
                    })
                } else {

                    Proveedor.updateOne({ Email: Email }, { $set: data }, (err, doc) => {

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
                                resultado: 'El proveedor a sido actualizado con exito',
                                proveedor: doc
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


const eliminarproveedor = (req, res = express.response) => {

    const { Email } = req.body;

    Proveedor.findOneAndDelete({ Email: Email }, (err, doc) => {
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
                    resultado: 'No se ha encontrado ningun proveedor con ese correo electronico'
                })
            } else {
                console.log(doc)
                return res.json({
                    ok: 'true',
                    resultado: 'Proveedor Eliminado'
                })
            }
        }
    });


}

const consultarproveedor = (req, res = express.response) => {

    Proveedor.find({}, (err, docs) => {

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

const buscarProveedor = (req, res= express.response) => {

    const { Email } = req.body;

    Proveedor.findOne({Email: Email}, (err, doc) =>{

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal:P '
            })
        } else {
            if(doc == null){
                return res.status(200).json({
                    resultado: 'No se ha encontrado resultados con ese correo'
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
    crearproveedor,
    eliminarproveedor,
    consultarproveedor,
    buscarProveedor
}