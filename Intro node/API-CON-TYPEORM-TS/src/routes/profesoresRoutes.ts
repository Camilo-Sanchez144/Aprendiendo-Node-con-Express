import express from 'express'
import profesoresController from '../controllers/profesoresController';
import { authMiddleware } from '../JWT/userAuthentication';
const router = express.Router();

router.get('/',authMiddleware, profesoresController.consultar)
router.post('/',authMiddleware,profesoresController.ingresar)
router.route('/:id')
    .get(authMiddleware,profesoresController.consultarDetalle)
    .put(authMiddleware,profesoresController.actualizar)
    .delete(authMiddleware,profesoresController.borrar)

/* router.post('/',profesoresController.ingresar)
router.put('/', profesoresController.actualizar)
router.delete('/', profesoresController.borrar) */
export default router;