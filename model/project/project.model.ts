import { ProjectDatabase } from '../../database/project/project.database';

import { Project } from '../../interface/object/project.interface';
import { User } from '../../interface/object/user.interface';

import { ProjectClass } from '../../interface/class/project_class.interface';

export class ProjectModel implements ProjectClass {
    collection: string = "projects";

    constructor(collection: string = "projects") {
        this.collection = collection;
    }

    public async create(name: string, user: User | { _id: string }): Promise<Project | null> {
        let projectDatabase: ProjectDatabase = new ProjectDatabase(this.collection);
        return await projectDatabase.create(name, user);
    }
}