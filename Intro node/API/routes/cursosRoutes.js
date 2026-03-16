const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController.js')

router.get('/',cursosController.consultar)
router.post('/',cursosController.ingresar)
router.post('/resgistroEstudiantes',cursosController.asociarEstudiante)

router.route('/:id')
    .get(cursosController.consultarDetalle)
    .put(cursosController.actualizar)
    .delete(cursosController.borrar)

/* router.post('/',profesoresController.ingresar)
router.put('/', profesoresController.actualizar)
router.delete('/', profesoresController.borrar) */
module.exports = router;