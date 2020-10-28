import { User } from '../object/user.interface';
import { Project } from '../object/project.interface'

export interface ProjectClass {
    create(name: string, user: User | { _id: string }): Promise<Project | null>;

    get(id: string): Promise<Project | null>;

    getList(user: User): Promise<Project[]>;

    edit(id: string, name: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}