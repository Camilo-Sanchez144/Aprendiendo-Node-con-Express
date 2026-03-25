import express from 'express'
import cursosController from '../controllers/cursosController';
import { authMiddleware } from '../JWT/userAuthentication';

const router = express.Router();

router.get('/',authMiddleware,cursosController.consultar)
router.post('/',authMiddleware,cursosController.ingresar)
router.post('/registroEstudiantes',authMiddleware,cursosController.asociarEstudiante)

router.route('/:id')
    .get(authMiddleware,cursosController.consultarDetalle)
    .put(authMiddleware,cursosController.actualizar)
    .delete(authMiddleware,cursosController.borrar)

/* router.post('/',profesoresController.ingresar)
router.put('/', profesoresController.actualizar)
router.delete('/', profesoresController.borrar) */
export default router;