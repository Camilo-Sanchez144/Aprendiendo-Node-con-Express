import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // Solución para manejar el caso en que 'authHeader' sea undefined
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    // Solución para asegurar que 'token' no sea undefined
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Solución para asegurar que 'token' sea un string válido
        const decoded = jwt.verify(token, 'secret') as { [key: string]: any };

        // Solución para extender el tipo de 'req' y agregar 'user'
        (req as any).user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};