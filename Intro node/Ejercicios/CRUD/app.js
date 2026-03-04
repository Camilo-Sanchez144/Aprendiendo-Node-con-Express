const express = require('express');

const app = express();

app.use(express.json())

let tareas = {
    'tarea' :[{
        id : 1,
        materia : "ingles"
    },
    {
        id: 2,
        materia: 'español'
    }]
}
const tarea = tareas.tarea
app.get('/tareas',(req,res)=>{
    res.json(tarea)
})
app.post('/tareas',(req,res)=>{
    if(!tareaNueva.materia){
        return res.status(400).json({error:'Bad request'})
    }
    const tareaNueva = {
        id: tarea.length + 1,
        materia: req.body.materia
    }
    tarea.push(tareaNueva)
    res.send(JSON.stringify(tarea))
})
app.put('/tareas/:id',(req,res)=>{
    const tareaActualizada = req.body
    const id = req.params.id
    const index = tarea.findIndex(tarea => tarea.id == id)
    if(index >= 0){
        tarea[index]= tareaActualizada
    }
    else{
        res.status(404).json({error:'No se encontró la tarea'})
    }
    res.json(tarea)
})
app.delete('/tareas/:id', (req,res)=>{
    const tareaBorrada = req.body
    const id = req.params.id
    const index = tarea.findIndex(tarea => tarea.id == id)
    if(index >= 0 ){
        tarea.splice(index,1)
    }
    else{
        
        res.status(404).json({error:'No se encontró la tarea'})
    }
    res.json(tarea)
})
const PUERTO = 3000
app.listen(PUERTO,()=>{
    console.log(`Escuhando puerto ${PUERTO}`)
})