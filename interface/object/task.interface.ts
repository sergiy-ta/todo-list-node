import { ObjectID } from 'mongodb';
import { User } from './user.interface';

export declare interface Task {
    _id: ObjectID,
    name: string;
    description: string;
    user: User | {
        _id: string | ObjectID;
    }
    date_of_creation: Date;
}