import { ObjectID } from "mongodb";
import { User } from "./user.interface";

export interface Project {
    _id: ObjectID,
    name: string,
    user: User | {
        _id: string | ObjectID;
    }
    date_of_creation: Date;
}