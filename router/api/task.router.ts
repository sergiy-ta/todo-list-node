import express from 'express';

import { AuthModel } from '../../model/auth.model';
import { TaskModel } from '../../model/task/task.model';

import { Task } from '../../interface/object/task.interface';

const user_api: express.Router = express.Router();
const jsonParser = express.json();

user_api.post('/api/task', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let token: string | undefined = req.headers.authorization;

    let name: string = req.body.name;
    let description: string = req.body.description;

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');
        console.log(token);

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let task: Task | null = null;
                let taskModel: TaskModel = new TaskModel();
                if (authData) task = await taskModel.create(name, description, { _id: authData?.id });

                res.status(200).send(task ? true : false);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
    
});

export default user_api;