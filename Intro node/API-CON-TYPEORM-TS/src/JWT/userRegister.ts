import bcrypt from 'bcrypt';
import { CreateUser } from '../models/usersModel'
import { Request, Response } from 'express'
import { register } from 'node:module';

export class UserRegister{
    async register(req:Request, res:Response) {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new CreateUser();
        user.email = email;
        user.password = hashedPassword;

        await user.save();

        res.json({ msg: 'Usuario creado' });

    } catch (err:any) {
        res.status(500).send(err.message);
    }
}
}

export default new UserRegister();
