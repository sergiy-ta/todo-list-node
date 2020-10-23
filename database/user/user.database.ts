import { MongoClient, ObjectID } from 'mongodb';

import database from '../database';

import { User } from '../../interface/object/user.interface';

import { UserClass } from '../../interface/class/user_class.interface';

export class UserDatabase implements UserClass {
    private collection: string;

    constructor(collection: string = "users") {
        this.collection = collection;
    }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(last_name: string, first_name: string, email: string, password: string): Promise<User> {
        let promise = new Promise<User>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).insertOne({
                    last_name: last_name,
                    first_name: first_name,
                    email: email,
                    password: password,
                    date_of_creation: new Date(new Date().toISOString())
                }, (error: any, data: any) => {
                    if (!error) resolve(data['ops'][0] ?? null);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }
}