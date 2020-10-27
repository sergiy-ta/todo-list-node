import { TaskDatabase } from '../../database/task/task.database';

import { Task } from '../../interface/object/task.interface';
import { User } from '../../interface/object/user.interface';

import { TaskClass } from '../../interface/class/task_class.interface';

export class TaskModel implements TaskClass {
    collection: string = "tasks";

    constructor(collection: string = "tasks") {
        this.collection = collection;
    }

    public async create(name: string, description: string, execution_date_time: string, user: User | { _id: string }, tag_list: string[], project: string = 'inbox'): Promise<Task | null> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.create(name, description, execution_date_time, user, tag_list, project);
    }

    public async get(id: string): Promise<Task | null> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.get(id);
    }

    public async getList(user: User): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getList(user);
    }

    public async getProjectList(user: User, project: string = 'inbox'): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getProjectList(user, project);
    }

    public async getListToday(user: User): Promise<Task[]> {
        let task_list: Task[] = []
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        (await taskDatabase.getList(user)).map((task: Task) => {
            let data_now = new Date(Date.now());
            if (task.execution_date_time.getDate() === data_now.getDate() && task.execution_date_time.getMonth() === data_now.getMonth() && task.execution_date_time.getFullYear() === data_now.getFullYear()) task_list.push(task);
        });
        return await task_list;
    }

    public async getIsCompleteList(user: User): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getIsCompleteList(user);
    }

    public async getIsCompleteProjectList(user: User, project: string = 'inbox'): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getIsCompleteProjectList(user, project);
    }

    public async getIsCompleteListToday(user: User): Promise<Task[]> {
        let task_list: Task[] = []
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        (await taskDatabase.getIsCompleteList(user)).map((task: Task) => {
            let data_now = new Date(Date.now());
            if (task.execution_date_time.getDate() === data_now.getDate() && task.execution_date_time.getMonth() === data_now.getMonth() && task.execution_date_time.getFullYear() === data_now.getFullYear()) task_list.push(task);
        });
        return await task_list;
    }

    public async getIsNotCompleteList(user: User): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getIsNotCompleteList(user);
    }

    public async getIsNotCompleteProjectList(user: User, project: string = 'inbox'): Promise<Task[]> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.getIsNotCompleteProjectList(user, project);
    }

    public async getIsNotCompleteListToday(user: User): Promise<Task[]> {
        let task_list: Task[] = []
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        (await taskDatabase.getIsNotCompleteList(user)).map((task: Task) => {
            let data_now = new Date(Date.now());
            if (task.execution_date_time.getDate() === data_now.getDate() && task.execution_date_time.getMonth() === data_now.getMonth() && task.execution_date_time.getFullYear() === data_now.getFullYear()) task_list.push(task);
        });
        return await task_list;
    }

    public async complete(id: string): Promise<boolean> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.complete(id);
    }

    public async edit(id: string, name: string, description: string, execution_date_time: string, tag_list: string[], project: string): Promise<boolean> {
        let taskDatabase: TaskDatabase = new TaskDatabase(this.collection);
        return await taskDatabase.edit(id, name, description, execution_date_time, tag_list, project);
    }
}