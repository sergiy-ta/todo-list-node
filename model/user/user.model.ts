import { PasswordModel } from "./password.model";

import { UserDatabase } from '../../database/user/user.database';

import { User } from '../../interface/object/user.interface';

import { UserClass } from '../../interface/class/user_class.interface';

export class UserModel implements UserClass {
    collection: string = "users";

    constructor(collection: string = "users") {
        this.collection = collection;
    }

    public async create(last_name: string, first_name: string, email: string, password: string): Promise<User | null> {
        if (!(await this.getEmail(email))) {
            let passwordHashModel: PasswordModel = new PasswordModel(password);
            let hashPassword: string = passwordHashModel.hashPassword();

            let userDatabase: UserDatabase = new UserDatabase(this.collection);
            return await userDatabase.create(last_name, first_name, email, hashPassword);
        } else {
            return null;
        }
        
    }

    public async get(id: string): Promise<User | null> {
        let userDatabase: UserDatabase = new UserDatabase(this.collection);
        return await userDatabase.get(id);
    }

    public async getEmail(email: string): Promise<User | null> {
        let userDatabase: UserDatabase = new UserDatabase(this.collection);
        return await userDatabase.getEmail(email);
    }
}