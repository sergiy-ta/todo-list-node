import express from 'express';
import http from 'http';
import path from 'path';

import router from './router/router';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../todo-list-angular/dist/todo-list-angular')));
app.use('/', router);

var server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is starting = ' + port);
});