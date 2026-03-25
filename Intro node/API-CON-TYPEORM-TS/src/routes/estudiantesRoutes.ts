import express from 'express';
import estudiantesController from '../controllers/estudiantesController'
import { authMiddleware } from '../JWT/userAuthentication';
const router = express.Router();

router.get('/',authMiddleware, estudiantesController.consultar)
router.post('/',authMiddleware, estudiantesController.ingresar)
router.route('/:id')
    .get(authMiddleware, estudiantesController.consultarDetalle)
    .put(authMiddleware, estudiantesController.actualizar)
    .delete(authMiddleware, estudiantesController.borrar)

/* router.post('/',estudiantesController.ingresar)
router.put('/', estudiantesController.actualizar)
router.delete('/', estudiantesController.borrar) */
export default router;