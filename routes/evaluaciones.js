const { Router } = require('express');
const router = Router();
const { crearevaluaciones, eliminarevaluacion , promedioacumuladototal,  consultarevaluaciones, generarreporte , contarregistros , promedioacumulado } =require('../controlers/evaluaciones') ;

router.post('/crear', crearevaluaciones )
router.post('/eliminar' , eliminarevaluacion)
router.post('/reporte' , generarreporte)
router.post('/numeroevaluaciones' , contarregistros)
router.get('/' , consultarevaluaciones )
router.post('/acumulado', promedioacumulado)
router.post('/acumuladototal', promedioacumuladototal)

module.exports = router