import express from 'express';
import path from 'path';

import api_user from './api/user.router';
import api_task from './api/task.router';
import api_login from './api/login.router';
import api_project from './api/project.router';

const router: express.Router = express.Router();

router.use('/', api_user);
router.use('/', api_task);
router.use('/', api_login);
router.use('/', api_project);

router.get('*', (req: express.Request, res: express.Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../todo-list-angular/dist/todo-list-angular/index.html'));
});

export default router;