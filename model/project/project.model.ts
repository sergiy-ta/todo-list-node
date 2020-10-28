import { TaskModel } from '../task/task.model';

import { ProjectDatabase } from '../../database/project/project.database';

import { Project } from '../../interface/object/project.interface';
import { User } from '../../interface/object/user.interface';

import { ProjectClass } from '../../interface/class/project_class.interface';
import { ProjectAccessEditClass } from '../../interface/class/project_access_edit_class.interface';

export class ProjectModel implements ProjectClass, ProjectAccessEditClass {
    private collection: string = "projects";
    private projectDatabase: ProjectDatabase;

    constructor(collection: string = "projects") {
        this.collection = collection;
        this.projectDatabase = new ProjectDatabase(this.collection)
    }

    public async create(name: string, user: User | { _id: string }): Promise<Project | null> {
        return await this.projectDatabase.create(name, user);
    }

    public async get(id: string): Promise<Project | null> {
        return await this.projectDatabase.get(id);
    }

    public async getList(user: User): Promise<Project[]> {
        return await this.projectDatabase.getList(user);
    }

    public async edit(user_login_id: string, id: string, name: string): Promise<boolean> {
        let project_user = (await this.get(id))?.user;
        if (user_login_id === project_user?._id.toString()) return await this.projectDatabase.edit(id, name);
        else return false;
    }

    public async delete(user_login_id: string, id: string): Promise<boolean> {
        let project_user = (await this.get(id))?.user;
        if (user_login_id === project_user?._id.toString()) {
            let taskModel: TaskModel = new TaskModel();
            let is_delete: boolean = await taskModel.deleteProject(id.toString());
            if (is_delete) return await this.projectDatabase.delete(id);
            else return false;
        } else return false;
        
    }
}