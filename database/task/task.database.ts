import { MongoClient, ObjectID } from 'mongodb';

import database from '../database';

import { Task } from '../../interface/object/task.interface';
import { User } from '../../interface/object/user.interface';

import { TaskClass } from '../../interface/class/task_class.interface';
import { TaskNotAccessEditClass } from '../../interface/class/task_not_access_edit_class.interface';

export class TaskDatabase implements TaskClass, TaskNotAccessEditClass {
    private collection: string;

    constructor(collection: string = "tasks") {
        this.collection = collection;
    }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(name: string, description: string, execution_date_time: string, user: User | { _id: string }, tag_list: string[], project: string = 'inbox'): Promise<Task | null> {
        let promise = new Promise<Task | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).insertOne({
                    name: name,
                    description: description,
                    execution_date_time: new Date(execution_date_time),
                    project: { _id: project },
                    tag_list: tag_list,
                    is_complete: false,
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

    public get(id: string): Promise<Task | null> {
        let promise = new Promise<Task | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).findOne({ 
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

    public getList(user: User | { _id: string }): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) }
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

    public getProjectList(user: User | { _id: string }, project: string = 'inbox'): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) },
                    project: { _id: project }
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

    public getIsCompleteList(user: User | { _id: string }): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) },
                    is_complete: true
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

    public getIsCompleteProjectList(user: User | { _id: string }, project: string = 'inbox'): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) },
                    is_complete: true,
                    project: { _id: project }
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

    public getIsNotCompleteList(user: User | { _id: string }): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) },
                    is_complete: false
                }).toArray((error: any, data: any) => {
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

    public getIsNotCompleteProjectList(user: User | { _id: string }, project: string = 'inbox'): Promise<Task[]> {
        let promise = new Promise<Task[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id.toString()) },
                    is_complete: false,
                    project: { _id: project }
                }).toArray((error: any, data: any) => {
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

    public complete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).updateOne({ _id: new ObjectID(id) }, {
                    '$set': {
                        is_complete: true
                    }
                }, (error: any, data: any) => {
                    if (!error) resolve(data ? true : false);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }

    public edit(id: string, name: string, description: string, execution_date_time: string, tag_list: string[], project: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).updateOne({ _id: new ObjectID(id) }, {
                    '$set': {
                        name: name,
                        description: description,
                        execution_date_time: new Date(execution_date_time),
                        project: { _id: project },
                        tag_list: tag_list
                    }
                }, (error: any, data: any) => {
                    if (!error) resolve(data ? true : false);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }

    public delete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).findOneAndDelete({
                    _id: new ObjectID(id)
                }, (error: any, data: any) => {
                    if (!error) resolve(data ? true : false);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }

    public deleteProject(project_id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTasks).collection(this.collection).deleteMany({
                    project: { _id: project_id }
                }, (error: any, data: any) => {
                    if (!error) resolve(data ? true : false);
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