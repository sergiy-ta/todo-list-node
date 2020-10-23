import { User } from "../object/user.interface";

export interface UserClass {
    create(last_name: string, first_name: string, email: string, password: string): Promise<User>;
}