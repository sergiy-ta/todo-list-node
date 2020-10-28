import express from 'express';

import { UserModel } from '../../model/user/user.model';
import { AuthModel } from '../../model/auth.model';

import { User } from '../../interface/object/user.interface';

const user_api: express.Router = express.Router();
const jsonParser = express.json();

user_api.post('/api/user', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let last_name: string = req.body.last_name.trim();
    let first_name: string = req.body.first_name.trim();
    let email: string = req.body.email.trim();
    let password: string = req.body.password.trim();

    if (last_name && first_name && email && password) {
        let userModel: UserModel = new UserModel();
        let user: User | null = await userModel.create(last_name, first_name, email, password);

        if (user) {
            let authModel: AuthModel = new AuthModel();
            let token: string = await authModel.login(user._id.toString()) ?? '';

            res.status(200).send({token});
        } else {
            res.status(401).send('');
        }
    } else {
        res.status(401).send('');
    }
});

export default user_api;