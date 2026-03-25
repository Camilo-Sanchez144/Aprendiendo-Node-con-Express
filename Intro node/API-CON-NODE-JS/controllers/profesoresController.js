const db = require('../database/conexion.js')

class profesoresController{
    constructor(){

    }
    consultar(req,res){
        try{
            db.query(`SELECT * FROM profesores`,(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                res.status(200).json({rows})
            }
        )}catch(err){
            res.status(400).send(err.message)
        }
    }
    consultarDetalle(req,res){
        const id = req.params.id
        try{
            db.query(`SELECT * FROM cursos.profesores WHERE id = ?`, [id], (err, rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                res.status(200).json({rows})
            })
        }catch(err){
            res.status(400).send(err.message)
        }
    }
    ingresar(req,res){
        try{
            const {dni,nombre,apellido,email,profesion,telefono} = req.body;
            db.query(`INSERT INTO cursos.profesores(id, dni, nombre, apellido,email,profesion,telefono) VALUES (null,?,?,?,?,?,?)`, [dni,nombre,apellido,email,profesion,telefono],(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                res.status(201).json({rows})
            }

            )
        }catch(err){
            res.status(400).send(err.message)
        }
    }
    actualizar(req,res){
        const id= req.params.id
        try{
            const {dni,nombre,apellido,email,profesion,telefono} = req.body
            db.query(`UPDATE cursos.profesores SET dni=?, nombre=?, apellido=?, email=?,profesion=?,telefono=? WHERE id =?`,[dni,nombre,apellido,email,profesion,telefono,id],(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                if(rows.affectedRows===1){
                    res.status(200).json({respuesta:`Se ha actualizado`})
                }
            })
        }catch(err){
            res.status(400).send(err.message)
        }
    }
    borrar(req,res){
        const id= req.params.id
        try{
            db.query(`DELETE FROM cursos.profesores WHERE id= ?`,[id],(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                if(rows.affectedRows===1){
                    res.status(200).json({respuesta:`Se ha eliminado exitosamente`})
                }
            })
        }catch(err){
            res.status(400).send(err.message)
        }
    }

}
module.exports = new profesoresController();