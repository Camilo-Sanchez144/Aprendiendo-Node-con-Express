import express from 'express';
import  UserRegister  from '../JWT/userRegister';
import UserLogin from '../JWT/userLogin';

const router = express.Router();


router.post('/authenticate',UserRegister.register)
router.post('/',UserLogin.UserLogin)

/* router.post('/',estudiantesController.ingresar)
router.put('/', estudiantesController.actualizar)
router.delete('/', estudiantesController.borrar) */
export default router;