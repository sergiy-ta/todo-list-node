import { expect } from 'chai';

// database
import { TaskModel } from '../../../model/task/task.model';

// interface
import { Task } from '../../../interface/object/task.interface';
import { ObjectID } from 'mongodb';

describe('Test model task', () => {
    let name: string = "name";
    let description: string = "description";
    let user: { _id: string } = { _id: "string" };

    it('create', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task: Task | null = await taskModel.create(name, description, user);
        if (task) {
            expect(task.name).to.eql(name);
            expect(task.description).to.eql(description);
        } else {
            expect(task).to.not.eql(null);
        }
    });
});