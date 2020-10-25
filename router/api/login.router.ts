import express from 'express';

import { UserModel } from '../../model/user/user.model';

import { User } from '../../interface/object/user.interface';
import { LoginModel } from '../../model/user/login.model';

const user_api: express.Router = express.Router();
const jsonParser = express.json();

user_api.post('/api/login', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let email: string = req.body.email;
    let password: string = req.body.password;

    if (email && password) {
        let userModel: UserModel = new UserModel();
        let user: User | null = await userModel.getEmail(email);

        if (user) {
            let loginModel: LoginModel = new LoginModel(email, password);
            let token: string = await loginModel.login() ?? '';

            res.status(200).send({token});
        } else {
            res.status(200).send('');
        }
    } else {
        res.status(200).send('');
    }
});

export default user_api;