import { Task } from "../object/task.interface";
import { User } from "../object/user.interface";

export interface TaskClass {
    create(name: string, description: string, user: User | { _id: string }): Promise<Task | null>;
}