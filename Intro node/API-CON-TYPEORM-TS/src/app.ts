import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from 'express';

import estudiantes from './routes/estudiantesRoutes';
import profesores from './routes/profesoresRoutes';
import cursos from './routes/cursosRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/cursos', cursos);
app.use('/estudiantes', estudiantes);
app.use('/profesores', profesores);

app.get('/', (req:Request, res:Response) => {
    res.send('Hola mundo');
});


export default app;