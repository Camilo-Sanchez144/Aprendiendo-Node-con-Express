const http = require('http')

const servidor = http.createServer((req,res)=>{
    console.log('===> req (solicitud)');
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    console.log('respuestaaaaaaaa',res.statusCode)
    res.end('Hola mundo')
});
const puerto = 3000;
servidor.listen(puerto, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${puerto}`)
})