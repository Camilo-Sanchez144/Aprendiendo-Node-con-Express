/* Comandos para iniciar un proyecto con express:
npm init -y -> Crea el package.json
npm install express -> Instala express
npm install cors -> Permisos de dominis que acceden a la api
*/
const express = require('express');
const app = express();
const cors = require('cors');
const estudiantes = require('./routes/estudiantesRoutes.js')
const profesores = require('./routes/profesoresRoutes.js')
const cursos = require('./routes/cursosRoutes.js')

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hola mundo');
})

app.use('/cursos',cursos)
app.use('/estudiantes', estudiantes)
app.use('/profesores', profesores )

app.listen(6500,()=>{
    console.log('Servidor activo')
})