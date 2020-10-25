import express from 'express';
import request from 'supertest';

import router from '../../../router/api/login.router';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);




describe("index route works /api/login", () => {
    it('GET /api/login', () => {
        request(app)
            .get("/api/user")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('POST /api/login', () => {
        request(app)
            .post("/api/login")
            .send({ email: "email@gmail.com", password: "password" })
            .expect(200)
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without email POST /api/login', () => {
        request(app)
            .post("/api/login")
            .send({ password: "password" })
            .expect(200, '')
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without password POST /api/login', () => {
        request(app)
            .post("/api/login")
            .send({ email: "email@gmail.com", })
            .expect(200, '')
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/login', () => {
        request(app)
            .put("/api/login")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/login', () => {
        request(app)
            .delete("/api/login")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});