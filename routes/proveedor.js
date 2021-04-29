const { Router } = require('express');
const router = Router();
const { crearproveedor, eliminarproveedor , consultarproveedor , buscarProveedor } =require('../controlers/proveedores') ;

router.post('/crear', crearproveedor )
router.post('/eliminar', eliminarproveedor )
router.post('/buscaruno', buscarProveedor )
router.get('/', consultarproveedor )

module.exports = router