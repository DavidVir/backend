const express = require('express')
const Evaluaciones = require('../models/evaluaciones');


const crearevaluaciones = async (req, res = express.response) => {

    try {

        const data = req.body;
        const evaluacion = new Evaluaciones(data);
        await evaluacion.save();  
        return res.json({
            ok: 'true', 
            resultado: 'evaluacion almacenada'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            resultado: 'Algo ha salido mal :P'
        });

    }

}


const eliminarevaluacion = (req, res = express.response) => {


    try {

    const { id } = req.body;

    Evaluaciones.findOneAndDelete({ _id: id }, (err, doc) => {
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
                    resultado: 'No se ha encontrado ninguna evaluacion con ese identificador'
                })
            } else {
                console.log(doc)
                return res.json({
                    ok: 'true',
                    resultado: 'evaluacion Eliminada'
                })
            }
        }
    });
        
    } catch (error) {
        console.log(error);
    }

}

const consultarevaluaciones = (req, res = express.response) => {

    Evaluaciones.find({}, "fecha evaluador proveedor", (err, docs) => {

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


const generarreporte = (req, res = express.response) => {

    
    const { proveedor } = req.body;

    Evaluaciones.find({ proveedor : proveedor },"fecha evaluador",(err,docs) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal :P '
            })
        } else {
            if (docs == null ) {
                return res.json({
                    ok: 'false',
                    resultado: 'No se ha encontrado informacion alguna relacionada con el proveedor seleccionado'
                })
            } else {
                return res.json({
                    ultimosevaluadores : docs,
                })  
            }
        }
    }).sort({_id:-1}).limit(5);
}


 const contarregistros =  (req, res = express.response )=>{ 

    const { proveedor } = req.body;

      var evaluaciones =  Evaluaciones.find({ proveedor : proveedor },(err,docs) => {

        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: 'false',
                resultado: 'Algo ha salido mal :P '
            })
        } else {
            if (docs == null ) {
                return res.json({
                    ok: 'false',
                    resultado: 'No se ha encontrado informacion alguna relacionada con el proveedor seleccionado'
                })
            } 
        }

        evaluaciones.countDocuments((err, count)=> {

            if(err){
                return res.status(500).json({
                    ok: 'false',
                    resultado: 'Algo ha salido mal :P '
                })
            }else{
                console.log(count);
                return res.json({
                    ok: 'true',
                    resultado: count
                })
            }
        })
    })

 }


 const promedioacumulado = (req , res = express.response) => {

    const {proveedor} =  req.body ;

    console.log(proveedor)
    
    Evaluaciones.aggregate([ 
        {
            $unwind : "$criterios"
        },
        {
            $group :
                {
                 _id: proveedor, 
                 "promedioGeneral": { $avg : "$criterios.calificacion"}, 
                }
        }

        ]).exec((err, promedio) => {

            if (err) {
                res.status(500).json({ error : 'Error algo anda mal'+ err});
            } else {
                res.json(
                {ok:true,
                resultado: promedio })
            }
        });
}

promedioacumuladototal = (req , res=express.response) => {

    const {proveedor} = req.body 
    var evaluaciones = [];
    var nota  = 0;
    var contador = 0;

    Evaluaciones.find({proveedor : proveedor }, (err, evaluacion) => { 

        if(err){
            res.status(500).json({ err : "algo anda mal" + err})
        }else{

            if(evaluacion == null || evaluacion.length == 0 ){
                res.status(400).json({ err : "No se ha encontrado ningún registro con esos valores"})
            }else{
                evaluaciones = evaluacion;
                for(var i=0; i < evaluaciones.length; i ++){
                    for(var j=0; j < evaluacion[i].criterios.length ; j++ ){
                        nota = nota + parseInt(evaluacion[i].criterios[j].calificacion);
                        contador = contador + 1;
                    }
                }
                var promedio = nota/contador; 
                console.log(nota);
                console.log(contador);
                res.json({ok: true,
                promedio: promedio})
            }
        }
        })

}

module.exports = {
    crearevaluaciones,
    eliminarevaluacion,
    consultarevaluaciones,
    generarreporte,
    contarregistros,
    promedioacumulado,
    promedioacumuladototal

}


