const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({msg: 'Consulta de estudiantes'})
})
router.post('/',(req,res)=>{
    res.json({msg:'Ingreso estudiantes'})
})
router.put('/',(req,res)=>{
    res.json({msg:'Actualización estudiantes'})
})
router.delete('/',(req,res)=>{
    res.json({msg:'Borrado de estudiantes'})
})
module.exports = router;