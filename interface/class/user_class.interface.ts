import { User } from "../object/user.interface";

export interface UserClass {
    create(last_name: string, first_name: string, email: string, password: string): Promise<User | null>;

    get(id: string): Promise<User | null>;

    getEmail(email: string): Promise<User | null>;
}