import { expect } from 'chai';
import express from 'express';
import request from 'supertest';

import router from '../../../router/api/user.router';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);




describe("index route works /api/user", () => {
    it('GET /api/user', () => {
        request(app)
            .get("/api/user")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('POST /api/user', () => {
        request(app)
            .post("/api/user")
            .send({ last_name: "last_name", first_name: "first_name", email: "email@gmail.com", password: "password" })
            .expect("Authorization")
            .expect(200)
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without last name POST /api/user', () => {
        request(app)
            .post("/api/user")
            .send({ first_name: "first_name", email: "email@gmail.com", password: "password" })
            .expect(200, '').end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without first name POST /api/user', () => {
        request(app)
            .post("/api/user")
            .send({ last_name: "last_name", email: "email@gmail.com", password: "password" })
            .expect(200, '')
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without email POST /api/user', () => {
        request(app)
            .post("/api/user")
            .send({ last_name: "last_name", first_name: "first_name", password: "password" })
            .expect(200, '')
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('without password POST /api/user', () => {
        request(app)
            .post("/api/user")
            .send({ last_name: "last_name", first_name: "first_name", email: "email@gmail.com",})
            .expect(200, '')
            .end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/user', () => {
        request(app)
            .put("/api/user")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/user', () => {
        request(app)
            .delete("/api/user")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});