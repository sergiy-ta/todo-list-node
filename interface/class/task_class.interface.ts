import { Task } from "../object/task.interface";
import { User } from "../object/user.interface";

export interface TaskClass {
    create(name: string, description: string, execution_date_time: string, user: User | { _id: string }, tag_list: string[], project: string): Promise<Task | null>;

    get(id: string): Promise<Task | null>;

    getList(user: User): Promise<Task[]>;

    getProjectList(user: User, project: string): Promise<Task[]>;

    getIsCompleteList(user: User): Promise<Task[]>;

    getIsCompleteProjectList(user: User, project: string): Promise<Task[]>;

    getIsNotCompleteList(user: User): Promise<Task[]>;

    getIsNotCompleteProjectList(user: User, project: string): Promise<Task[]>;

    complete(id: string): Promise<boolean>;

    deleteProject(project_id: string): Promise<boolean>;
}