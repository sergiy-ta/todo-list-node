import { MongoClient, ObjectID } from 'mongodb';

import database from '../database';

import { Project } from '../../interface/object/project.interface';
import { User } from '../../interface/object/user.interface';

import { ProjectClass } from '../../interface/class/project_class.interface';

export class ProjectDatabase implements ProjectClass {
    private collection: string;

    constructor(collection: string = "projects") {
        this.collection = collection;
    }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(name: string, user: User | { _id: string }): Promise<Project | null> {
        let promise = new Promise<Project | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).insertOne({
                    name: name,
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

    public get(id: string): Promise<Project | null> {
        let promise = new Promise<Project | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).findOne({
                    _id: new ObjectID(id)
                }, (error: any, data: any) => {
                    if (!error) resolve(data ?? null);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }

    public getList(user: User): Promise<Project[]> {
        let promise = new Promise<Project[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbProjects).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toHexString()) }
                }).toArray((error: any, data: any) => {
                    if (!error) resolve(data ?? []);
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