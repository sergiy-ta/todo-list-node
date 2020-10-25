import { expect } from 'chai';

// database
import { TaskDatabase } from '../../../database/task/task.database';

// interface
import { Task } from '../../../interface/object/task.interface';

describe('Test database task', () => {
    let name: string = "name";
    let description: string = "description";
    let user: { _id: string } = { _id: "string"};

    it('create', async () => {
        const taskDatabase: TaskDatabase = new TaskDatabase("tasks-test");
        const task: Task | null = await taskDatabase.create(name, description, user);
        if (task) {
            expect(task.name).to.eql(name);
            expect(task.description).to.eql(description);
        } else {
            expect(task).to.not.eql(null);
        }
    });
});