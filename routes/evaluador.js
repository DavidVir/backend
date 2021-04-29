const { Router } = require('express');
const router = Router();
const { crearevaluador, eliminarevaluador , consultarevaluador , buscarEvaluador } =require('../controlers/evaluador') ;

router.post('/crear', crearevaluador )
router.post('/eliminar', eliminarevaluador )
router.post('/buscaruno', buscarEvaluador )
router.get('/', consultarevaluador )

module.exports = router