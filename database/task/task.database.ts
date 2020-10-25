import { MongoClient, ObjectID } from 'mongodb';

import database from '../database';

import { Task } from '../../interface/object/task.interface';
import { User } from '../../interface/object/user.interface';

import { TaskClass } from '../../interface/class/task_class.interface';

export class TaskDatabase implements TaskClass {
    private collection: string;

    constructor(collection: string = "tasks") {
        this.collection = collection;
    }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(name: string, description: string, user: User | { _id: string }): Promise<Task | null> {
        let promise = new Promise<Task | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).insertOne({
                    name: name,
                    description: description,
                    user: { _id: new ObjectID(user._id) },
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