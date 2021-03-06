import { expect } from 'chai';

// database
import { TaskModel } from '../../../model/task/task.model';

// interface
import { Task } from '../../../interface/object/task.interface';

describe('Test model task', () => {
    let id: string;
    let name: string = "name";
    let description: string = "description";
    let execution_date_time: string = (new Date()).toString();
    let project: string = 'inbox';
    let tag_list: string[] = ["tag"];
    let is_complete: boolean = false;
    let user: { _id: string } = { _id: "5f9a81e258e8c4a80ec7d9da" };

    it('create', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task: Task | null = await taskModel.create(name, description, execution_date_time, user, tag_list, project);
        if (task) {
            id = task._id.toString();
            expect(task.name).to.eql(name);
            expect(task.description).to.eql(description);
            expect(task.execution_date_time.getDate()).to.eql((new Date(execution_date_time)).getDate());
            expect(task.execution_date_time.getMonth()).to.eql((new Date(execution_date_time)).getMonth());
            expect(task.execution_date_time.getFullYear()).to.eql((new Date(execution_date_time)).getFullYear());
            expect(task.project._id).to.eql(project);
            expect(task.tag_list.length).to.eql(1);
            expect(task.tag_list[0]).to.eql(tag_list[0]);
            expect(task.is_complete).to.eql(is_complete);
            expect(task.user._id.toString()).to.eql(user._id);
        } else {
            expect(task).to.not.eql(null);
        }
    });

    it('get', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task: Task | null = await taskModel.get(id);
        if (task) {
            expect(task.name).to.eql(name);
            expect(task.description).to.eql(description);
            expect(task.execution_date_time.getDate()).to.eql((new Date(execution_date_time)).getDate());
            expect(task.execution_date_time.getMonth()).to.eql((new Date(execution_date_time)).getMonth());
            expect(task.execution_date_time.getFullYear()).to.eql((new Date(execution_date_time)).getFullYear());
            expect(task.project._id).to.eql(project);
            expect(task.tag_list.length).to.eql(1);
            expect(task.tag_list[0]).to.eql(tag_list[0]);
            expect(task.is_complete).to.eql(is_complete);
            expect(task.user._id.toString()).to.eql(user._id);
        } else {
            expect(task).to.not.eql(null);
        }
    });

    it('get list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getList(user);
        expect(task_list.length).to.eql(1);
        expect(task_list[0]).to.to.be.a('object');
    });

    it('get project list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getProjectList(user);
        expect(task_list.length).to.eql(1);
        expect(task_list[0]).to.to.be.a('object');
    });

    it('get is complete list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getIsCompleteList(user);
        expect(task_list.length).to.eql(0);
    });

    it('get is complete project list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getIsCompleteProjectList(user);
        expect(task_list.length).to.eql(0);
    });

    it('get is not complete list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getIsNotCompleteList(user);
        expect(task_list.length).to.eql(1);
        expect(task_list[0]).to.to.be.a('object');
    });

    it('get is not complete project list', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const task_list: Task[] = await taskModel.getIsNotCompleteList(user);
        expect(task_list.length).to.eql(1);
        expect(task_list[0]).to.to.be.a('object');
    });

    it('complete', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const is_complete: boolean = await taskModel.complete(id);
        expect(is_complete).to.eql(true);
    });

    it('edit', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const is_complete: boolean = await taskModel.edit(user._id.toString(), id, name, description, execution_date_time, tag_list, project);
        expect(is_complete).to.eql(true);
    });

    it('delete', async () => {
        const taskModel: TaskModel = new TaskModel("tasks-test");
        const is_delete: boolean = await taskModel.delete(user._id.toString(), id);
        expect(is_delete).to.eql(true);
    });
});