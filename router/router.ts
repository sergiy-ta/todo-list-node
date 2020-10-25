import express from 'express';
import path from 'path';

import api_user from './api/user.router';
import api_login from './api/login.router';

const router: express.Router = express.Router();

router.use('/', api_user);
router.use('/', api_login);

router.get('*', (req: express.Request, res: express.Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../todo-list-angular/dist/todo-list-angular/index.html'));
});

export default router;