import express from 'express';

import { AuthModel } from '../../model/auth.model';
import { ProjectModel } from '../../model/project/project.model';

import { Project } from '../../interface/object/project.interface';

const project_api: express.Router = express.Router();
const jsonParser = express.json();

project_api.post('/api/project', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let token: string | undefined = req.headers.authorization;

    let name: string = req.body.name;

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

export default project_api;