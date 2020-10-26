import { ObjectID } from 'mongodb';
import { User } from './user.interface';

export declare interface Task {
    _id: ObjectID,
    name: string;
    description: string;
    execution_date_time: Date;
    is_complete: string;
    user: User | {
        _id: string | ObjectID;
    }
    date_of_creation: Date;
}