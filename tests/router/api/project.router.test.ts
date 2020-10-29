import { expect } from 'chai';
import express from 'express';
import request from 'supertest';

import router from '../../../router/api/project.router';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);




describe("index route works /api/project", () => {
    it('GET /api/project', () => {
        request(app)
            .get("/api/project")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/project', () => {
        request(app)
            .post("/api/project")
            .send({ name: "name" })
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization PUT /api/project', () => {
        request(app)
            .put("/api/project")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/project', () => {
        request(app)
            .delete("/api/project")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});






describe("index route works /api/project/list", () => {
    it('GET /api/project/list', () => {
        request(app)
            .get("/api/project/list")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('POST /api/project/list', () => {
        request(app)
            .post("/api/project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/project/list', () => {
        request(app)
            .put("/api/project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/project/list', () => {
        request(app)
            .delete("/api/project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});






describe("index route works /api/project/:id", () => {
    it('GET /api/project/:id', () => {
        request(app)
            .get("/api/project/:id")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/project/:id', () => {
        request(app)
            .post("/api/project/:id")
            .send({ name: "name", description: "description" })
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/project/:id', () => {
        request(app)
            .put("/api/project/:id")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/project/:id', () => {
        request(app)
            .delete("/api/project/:id")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});