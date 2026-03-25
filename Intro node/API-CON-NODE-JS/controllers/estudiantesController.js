const db = require('../database/conexion.js')

class EstudiantesController{
/*     constructor(){

    } */
    consultar(req,res){
        try{
            db.query(`SELECT * FROM estudiantes`,
                (err, rows)=>{
                    if(err){
                        res.status(400).send(err)
                    }
                    res.status(200).json({rows})
                }
        )}catch(err){
            res.status(500).send(err.message);
        }
    }
    consultarDetalle(req,res){
        const id = req.params.id
        try{
            db.query(`SELECT * FROM estudiantes where id=?`,[id],
                (err, rows)=>{
                    if(err){
                        res.status(400).send(err)
                    }
                    res.status(200).json({rows})
                }
        )}catch(err){
            res.status(500).send(err.message);
        }
        
    }
    ingresar(req,res){
        try{
            const {dni, nombre, apellido, email} = req.body
            db.query(`INSERT INTO cursos.estudiantes(id,dni,nombre,apellido, email) VALUES (null,?,?,?,?)`,
                [dni,nombre,apellido, email],(err, rows)=>{
                    if(err){
                        res.status(400).send(err)
                    }
                    res.status(201).json({id:rows.insertId})
                }
            )
        }catch(err){
            res.status(500).send(err.message);
        }
    }
    actualizar(req,res){
        const id = req.params.id
        try{
            const{dni,nombre,apellido,email}=req.body;
            db.query(`UPDATE cursos.estudiantes SET dni=?, nombre=?, apellido=?, email=? WHERE id=?`,[dni,nombre,apellido,email,id],(err,rows)=>{
                if(err){
                    res.status(400).send(err);
                }
                if(rows.affectedRows===1){
                    res.status(201).json({respuesta:'Registro actualizado con éxito'})
                }
            }
        )}catch(err){
            res.status(500).send(err.message)
        }
    }
    borrar(req,res){
        const id = req.params.id
        try{
            db.query(`DELETE FROM cursos.estudiantes WHERE id = ?`,[id],(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                if(rows.affectedRows===1){
                    res.status(200).json({respuesta: 'registro eliminado correctamente'})
                }
            }
        )}catch(err){
            res.status(500).send(err.message)
        }
    }

}
module.exports = new EstudiantesController();