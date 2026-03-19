import express from 'express'
import cursosController from '../controllers/cursosController';
const router = express.Router();

router.get('/',cursosController.consultar)
router.post('/',cursosController.ingresar)
router.post('/registroEstudiantes',cursosController.asociarEstudiante)

router.route('/:id')
    .get(cursosController.consultarDetalle)
    .put(cursosController.actualizar)
    .delete(cursosController.borrar)

/* router.post('/',profesoresController.ingresar)
router.put('/', profesoresController.actualizar)
router.delete('/', profesoresController.borrar) */
export default router;