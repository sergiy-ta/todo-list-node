import express from 'express';

import { UserModel } from '../../model/user/user.model';
import { AuthModel } from '../../model/auth.model';

import { User } from '../../interface/object/user.interface';

const user_api: express.Router = express.Router();
const jsonParser = express.json();

user_api.post('/api/user', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let last_name: string = req.body.last_name;
    let first_name: string = req.body.first_name;
    let email: string = req.body.email;
    let password: string = req.body.password;

    if (typeof last_name === 'string') last_name = last_name.trim();
    if (typeof first_name === 'string') first_name = first_name.trim();
    if (typeof email === 'string') email = email.trim();
    if (typeof password === 'string') password = password.trim();

    if (last_name && first_name && email && password) {
        let userModel: UserModel = new UserModel();
        let user: User | null = await userModel.create(last_name, first_name, email, password);

        if (user) {
            let authModel: AuthModel = new AuthModel();
            let token: string = await authModel.login(user._id.toString()) ?? '';

            res.status(200).send({token});
        } else {
            res.status(200).send('');
        }
    } else {
        res.status(200).send('');
    }
});

export default user_api;