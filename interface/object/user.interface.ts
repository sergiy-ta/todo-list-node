import { ObjectID } from 'mongodb';

export interface User {
    _id: ObjectID;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    date_of_creation: Date;
}