import express from 'express';

import { AuthModel } from '../../model/auth.model';
import { TaskModel } from '../../model/task/task.model';
import { UserModel } from '../../model/user/user.model';

import { Task } from '../../interface/object/task.interface';
import { User } from '../../interface/object/user.interface';

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

user_api.get('/api/task/list', async (req: express.Request, res: express.Response) => {
    let token: string | undefined = req.headers.authorization;

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let task_list: Task[] = [];
                let taskModel: TaskModel = new TaskModel();
                let userModel: UserModel = new UserModel();

                if (authData) {
                    let user: User | null = await userModel.get(authData.id);

                    if (user) {
                        task_list = await taskModel.getList(user);
                    }
                }

                res.status(200).send(task_list);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

export default user_api;