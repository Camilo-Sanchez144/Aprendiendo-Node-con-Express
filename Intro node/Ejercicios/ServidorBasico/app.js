const express = require('express')

const app = express();

const PUERTO = 3000;
app.get('/saludo/:nombre', (req,res)=>{
    const nombre = req.params.nombre;
    const saludo = `Hola ${nombre}`
    const tamano = nombre.length;
    res.json({mensaje: saludo, longitudNombre: tamano})
})
app.listen(PUERTO,()=>{
    console.log('API funcionando correctamente');
});