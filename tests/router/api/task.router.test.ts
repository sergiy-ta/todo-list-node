import { expect } from 'chai';
import express from 'express';
import request from 'supertest';

import router from '../../../router/api/task.router';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);




describe("index route works /api/task", () => {
    it('GET /api/task', () => {
        request(app)
            .get("/api/task")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/task', () => {
        request(app)
            .post("/api/task")
            .send({ name: "name", description: "description" })
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/task', () => {
        request(app)
            .put("/api/task")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/task', () => {
        request(app)
            .delete("/api/task")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});