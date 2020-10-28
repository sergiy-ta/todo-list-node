import { PasswordModel } from "./password.model";

import { UserDatabase } from '../../database/user/user.database';

import { User } from '../../interface/object/user.interface';

import { UserClass } from '../../interface/class/user_class.interface';

export class UserModel implements UserClass {
    private collection: string = "users";
    private userDatabase: UserDatabase;

    constructor(collection: string = "users") {
        this.collection = collection;
        this.userDatabase = new UserDatabase(this.collection);
    }

    public async create(last_name: string, first_name: string, email: string, password: string): Promise<User | null> {
        if (!(await this.getEmail(email))) {
            let passwordHashModel: PasswordModel = new PasswordModel(password);
            let hashPassword: string = passwordHashModel.hashPassword();

            return await this.userDatabase.create(last_name, first_name, email, hashPassword);
        } else {
            return null;
        }
        
    }

    public async get(id: string): Promise<User | null> {
        return await this.userDatabase.get(id);
    }

    public async getEmail(email: string): Promise<User | null> {
        return await this.userDatabase.getEmail(email);
    }
}