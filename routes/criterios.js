const { Router } = require('express');
const router = Router();
const { crearcriterios, eliminarcriterios , consultarcriterios, buscarcriterio } =require('../controlers/criterios') ;

router.post('/crear', crearcriterios )
router.post('/eliminar', eliminarcriterios )
router.post('/buscaruno', buscarcriterio )
router.get('/', consultarcriterios )

module.exports = router