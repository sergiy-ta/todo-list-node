import express from 'express';
import path from 'path';

const router: express.Router = express.Router();

router.get('*', (req: express.Request, res: express.Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../todo-list-angular/dist/todo-list-angular/index.html'));
});

export default router;