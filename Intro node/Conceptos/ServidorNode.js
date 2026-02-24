const http = require('http');

const servidor = http.createServer((req,res)=>{
    res.end('Hola mundo!');
});

const puerto = 3000;
servidor.listen(puerto, ()=>{
    console.log('El servidor esta escuchando...')
});