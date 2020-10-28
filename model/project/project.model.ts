import { ProjectDatabase } from '../../database/project/project.database';

import { Project } from '../../interface/object/project.interface';
import { User } from '../../interface/object/user.interface';

import { ProjectClass } from '../../interface/class/project_class.interface';

export class ProjectModel implements ProjectClass {
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
}