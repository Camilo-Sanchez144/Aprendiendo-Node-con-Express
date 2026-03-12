/* Comandos para iniciar un proyecto con express:
npm init -y -> Crea el package.json
npm install express -> Instala express
npm install cors -> Permisos de dominis que acceden a la api
*/
const express = require('express');
const app = express();
const estudiantes = require('./routes/estudiantesRoutes.js')

app.get('/',(req,res)=>{
    res.send('Hola mundo');
})
app.use('/estudiantes', estudiantes)

app.listen(6500,()=>{
    console.log('Servidor activo')
})