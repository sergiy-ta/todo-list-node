import express from 'express';

import { UserModel } from '../../model/user/user.model';

import { User } from '../../interface/object/user.interface';

const user_api: express.Router = express.Router();
const jsonParser = express.json();

user_api.post('/api/user', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let last_name: string = req.body.last_name;
    let first_name: string = req.body.first_name;
    let email: string = req.body.email;
    let password: string = req.body.password;
    console.log("work");

    if (last_name && first_name && email && password) {
        let userModel: UserModel = new UserModel();
        let is_create: User = await userModel.create(last_name, first_name, email, password);

        res.status(200).send(is_create ? true : '');
    } else {
        res.status(200).send();
    }
});

export default user_api;