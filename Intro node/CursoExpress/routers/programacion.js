const express = require('express')
const routerProgramacion = express.Router();

const {programacion} = require('../datos/cursos');

routerProgramacion.get('/', (req,res)=>{
    res.send(JSON.stringify(programacion))
})
//Middleware
routerProgramacion.use(express.json())

routerProgramacion.get('/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(cursos=>cursos.lenguaje === lenguaje)

    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    res.send(JSON.stringify(resultados))

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas - a.vistas)))
    }else{
        res.send(JSON.stringify(resultados))
    }
})
routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel

    const resultados = programacion.filter(curso =>curso.lenguaje===lenguaje && curso.nivel ===nivel)

    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados))
})
routerProgramacion.post('/', (req,res)=>{
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion))
});
routerProgramacion.put('/:id',(req,res)=>{
    const cursoAtualizado =req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id ==id);
    if(indice){
        programacion[indice]=cursoAtualizado;
    }
    res.send(JSON.stringify(programacion))
});
routerProgramacion.patch('/:id',(req,res)=>{
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id)
    if(indice >= 0){
        const cursoAModificar = programacion[indice]
        Object.assign(cursoAModificar,infoActualizada)
    }
    res.send(JSON.stringify(programacion))
});
routerProgramacion.delete('/:id', (req,res)=>{
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice>=0){
        programacion.splice(indice,1)
    }
    res.send(JSON.stringify(programacion))
});
module.exports = routerProgramacion 