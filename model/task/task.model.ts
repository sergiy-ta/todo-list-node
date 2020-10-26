import { TaskDatabase } from '../../database/task/task.database';

import { Task } from '../../interface/object/task.interface';
import { User } from '../../interface/object/user.interface';

import { TaskClass } from '../../interface/class/task_class.interface';

export class TaskModel implements TaskClass {
    collection: string = "tasks";

    constructor(collection: string = "tasks") {
        this.collection = collection;
    }

    public async create(name: string, description: string, execution_date_time: string, user: User | { _id: string}): Promise<Task | null> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.create(name, description, execution_date_time, user);
    }

    public async getList(user: User): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getList(user);
    }
}