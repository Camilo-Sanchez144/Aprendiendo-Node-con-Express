const db = require('../database/conexion.js')

class CursosController{

    consultar(req,res){
        try{
            db.query(`SELECT * FROM cursos.cursos`,(err,rows)=>{
                if(err){
                    return res.status(400).send(err)
                }
                return res.status(200).json({rows})
            }
        )}catch(err){
            res.status(400).send(err.message)
        }
    }
    consultarDetalle(req,res){
        const id = req.params.id
        try{
            db.query(`SELECT * FROM cursos.cursos WHERE id = ?`, [id], (err, rows)=>{
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
            const {nombre,descripcion,profesor_id} = req.body;
            db.query(`INSERT INTO cursos.cursos(id,nombre,descripcion,profesor_id) VALUES (null,?,?,?)`, [nombre,descripcion,profesor_id],(err,rows)=>{
                if(err){
                    res.status(400).send(err)
                }
                if(affectedRows===1){
                    res.status(201).json({id:rows.insertId})
                }
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
    asociarEstudiante(req,res){
        try{
            const {curso_id,estudiante_id} = req.body;
            db.query(`INSERT INTO cursos_estudiantes(curso_id,estudiantes_id) VALUES (?,?)`, [curso_id, estudiante_id],(err,rows)=>{
                if(err){
                    return res.status(400).send(err)
                }
                if(rows.affectedRows===1){
                    return res.status(201).json({respuesa: 'Estudiante registrado con exito'})
                }
                return res.status(400).json({
                    respuesta: 'No se pudo registrar'})
            })
        }catch(err){
            res.status(400).send(err.message)
        }
    }
}
module.exports = new CursosController();