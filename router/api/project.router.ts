import express from 'express';

import { AuthModel } from '../../model/auth.model';
import { ProjectModel } from '../../model/project/project.model';
import { UserModel } from '../../model/user/user.model';

import { Project } from '../../interface/object/project.interface';
import { User } from '../../interface/object/user.interface';

const project_api: express.Router = express.Router();
const jsonParser = express.json();

project_api.post('/api/project', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let token: string | undefined = req.headers.authorization;

    let name: string = req.body.name;

    if (typeof name === 'string') name = name.trim();

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let project: Project | null = null;
                let projectModel: ProjectModel = new ProjectModel();
                if (authData) project = await projectModel.create(name, { _id: authData?.id });

                res.status(200).send(project ? true : false);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }

});

project_api.put('/api/project', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let token: string | undefined = req.headers.authorization;

    let id: string = req.body._id.toString();
    let name: string = req.body.name;

    if (typeof id === 'string') id = id.trim();
    if (typeof name === 'string') name = name.trim();

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let is_update: boolean = false;
                let projectModel: ProjectModel = new ProjectModel();
                if (authData) is_update = await projectModel.edit(id, name);

                res.status(200).send(is_update);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }

});

project_api.get('/api/project/list', async (req: express.Request, res: express.Response) => {
    let token: string | undefined = req.headers.authorization;

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let project_list: Project[] = [];
                let taskModel: ProjectModel = new ProjectModel();
                let userModel: UserModel = new UserModel();

                if (authData) {
                    let user: User | null = await userModel.get(authData.id);

                    if (user) {
                        project_list = await taskModel.getList(user);
                    }
                }

                res.status(200).send(project_list);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

project_api.get('/api/project/:id', async (req: express.Request, res: express.Response) => {
    let token: string | undefined = req.headers.authorization;

    let id: string = req.params.id;

    if (typeof id === 'string') id = id.trim();

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let taskModel: ProjectModel = new ProjectModel();
                let project: Project | null = await taskModel.get(id);

                res.status(200).send(project);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

project_api.delete('/api/project/:id', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let token: string | undefined = req.headers.authorization;

    let id: string = req.params.id;

    if (typeof id === 'string') id = id.trim();

    let authModel: AuthModel = new AuthModel();
    if (token) {
        token = token.replace('Bearer ', '');

        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let is_delete: boolean = false;
                let projectModel: ProjectModel = new ProjectModel();
                if (authData) is_delete = await projectModel.delete(id);

                res.status(200).send(is_delete);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }

});

export default project_api;