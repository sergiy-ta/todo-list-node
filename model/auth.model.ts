import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { secretKeyAuthToken } from '../const';

interface VerifyTokenCallback {
    (access: boolean, authData: { id: string } | undefined): void;
}

export class AuthModel {
    constructor() { }

    public login(id: string): Promise<string> {
        let promise = new Promise<string>((resolve, rejects) => {
            jwt.sign({ id }, secretKeyAuthToken, (error: any, token: any) => {
                if (!error) resolve(token);
                else console.error(error);
            });
        });

        return promise;
    }

    public verifyToken(token: string, callback: VerifyTokenCallback): void {
        jwt.verify(token, secretKeyAuthToken, (error: any, authData: any) => {
            if (error) {
                callback(false, authData);
            } else {
                callback(true, authData);
            }
        });
    }
}