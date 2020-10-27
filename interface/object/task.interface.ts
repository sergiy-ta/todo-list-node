import { ObjectID } from 'mongodb';
import { Project } from './project.interface';
import { User } from './user.interface';

export declare interface Task {
    _id: ObjectID,
    name: string;
    description: string;
    execution_date_time: Date;
    project: Project | { _id: string },
    is_complete: string;
    user: User | {
        _id: string | ObjectID;
    }
    date_of_creation: Date;
}