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
            .send({ name: "name", description: "description", execution_date_time: (new Date()).toString(), project: 'inbox', tag_list: ['tag'] })
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization PUT /api/task', () => {
        request(app)
            .put("/api/task")
            .send({ name: "name", description: "description", execution_date_time: (new Date()).toString(), project: 'inbox', tag_list: ['tag'] })
            .expect(401).end((err: any, res: any) => {
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





describe("index route works /api/task/:id", () => {
    it('GET /api/task/:id', () => {
        request(app)
            .get("/api/task/:id")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/task/:id', () => {
        request(app)
            .post("/api/task/:id")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/task/:id', () => {
        request(app)
            .put("/api/task/:id")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/task/:id', () => {
        request(app)
            .delete("/api/task/:id")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});





describe("index route works /api/task/today/list", () => {
    it('GET /api/task/today/list', () => {
        request(app)
            .get("/api/task/today/list")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/task/today/list', () => {
        request(app)
            .post("/api/task/today/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/task/today/list', () => {
        request(app)
            .put("/api/task/today/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/task/today/list', () => {
        request(app)
            .delete("/api/task/today/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});





describe("index route works /api/task/:project/list", () => {
    it('GET /api/task/:project/list', () => {
        request(app)
            .get("/api/task/:project/list")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/task/:project/list', () => {
        request(app)
            .post("/api/task/:project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/task/:project/list', () => {
        request(app)
            .put("/api/task/:project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/task/:project/list', () => {
        request(app)
            .delete("/api/task/:project/list")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});





describe("index route works /api/task/:id/complete", () => {
    it('GET /api/task/:id/complete', () => {
        request(app)
            .get("/api/task/:id/complete")
            .expect(401).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('without authorization POST /api/task/:id/complete', () => {
        request(app)
            .post("/api/task/:id/complete")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('PUT /api/task/:id/complete', () => {
        request(app)
            .put("/api/task/:id/complete")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });



    it('DELETE /api/task/:id/complete', () => {
        request(app)
            .delete("/api/task/:id/complete")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});