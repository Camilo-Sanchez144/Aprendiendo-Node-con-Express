const https = require('http');
const cursos = require('./cursos.js');
const { type } = require('os');

const servidor = https.createServer((req,res)=>{
    const {method} = req;
    switch(method){
        case 'GET':
            return manejarSolicitudGET(req,res);
        case 'POST':
            return manejarSolicitudPOST(req,res);
        default:
            res.statusCode=501;
            console.log(`el metodo no puede ser usado por el servidor ${method}`)
    }
});

function manejarSolicitudGET(req,res){
    let path = req.url;
    if(path === '/'){
        res.statusCode=200;
        res.end('Bienvenidos a mi primer servidor y API creado con node js')
    }else if(path==='/cursos'){
        res.end(JSON.stringify(cursos.infoCursos));
    }else if(path === '/cursos/programacion'){
        res.end(JSON.stringify(cursos.infoCursos.matematicas))
    }else if(path === '/cursos/matematicas'){
        res.end(JSON.stringify(cursos.infoCursos.matematicas))
    }else{
        res.statusCode = 404;
        res.end('El recurso solicitaod no existe')
    }
};
function manejarSolicitudPOST(req,res){
    const path = req.url;

    if(path==='/cursos/programacion'){
        let cuerpo = '';
        req.on('data', contenido =>{
            cuerpo += contenido.toString();
        });
        req.on('end', ()=>{
            console.log(cuerpo);
            console.log(typeof cuerpo);
            //Convertir a un objeto de JavaScript
            cuerpo = JSON.parse(cuerpo);
            console.log(typeof cuerpo);
            console.log(cuerpo.nombre, cuerpo.titulo)
            res.end('El servidor recibió una solicitud POST para /cursos/programacion');
        })
        // return res.end('El servidor recibió una solicitud POST para /cursos/programacion')
    }
}

const puerto = 3000;
servidor.listen(puerto, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${puerto}`)
});