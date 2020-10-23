import express from 'express';
import request from 'supertest';

import router from '../../router/router';

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);




describe("index route works /", () => {
    it('GET /', () => {
        request(app)
            .get("/")
            .expect("Content-Type", 'text/html; charset=UTF-8')
            .expect(200).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('POST /', () => {
        request(app)
            .post("/")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('PUT /', () => {
        request(app)
            .put("/")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('DELETE /', () => {
        request(app)
            .delete("/")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});




describe("index route works /sign-up", () => {
    it('GET /sign-up', () => {
        request(app)
            .get("/sign-up")
            .expect("Content-Type", 'text/html; charset=UTF-8')
            .expect(200).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('POST /sign-up', () => {
        request(app)
            .post("/sign-up")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('PUT /sign-up', () => {
        request(app)
            .put("/sign-up")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('DELETE /sign-up', () => {
        request(app)
            .delete("/sign-up")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});




describe("index route works /login", () => {
    it('GET /login', () => {
        request(app)
            .get("/login")
            .expect("Content-Type", 'text/html; charset=UTF-8')
            .expect(200).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('POST /login', () => {
        request(app)
            .post("/login")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('PUT /login', () => {
        request(app)
            .put("/login")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('DELETE /login', () => {
        request(app)
            .delete("/login")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});
    



describe("index route works /inbox", () => {
    it('GET /inbox', () => {
        request(app)
            .get("/inbox")
            .expect("Content-Type", 'text/html; charset=UTF-8')
            .expect(200).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('POST /inbox', () => {
        request(app)
            .post("/inbox")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('PUT /inbox', () => {
        request(app)
            .put("/inbox")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });

    it('DELETE /inbox', () => {
        request(app)
            .delete("/inbox")
            .expect(404).end((err: any, res: any) => {
                if (err) throw err;
            });
    });
});