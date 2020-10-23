import { expect } from 'chai';

// database
import { UserDatabase } from '../../../database/user/user.database';

// interface
import { User } from '../../../interface/object/user.interface';

describe('Test database user', () => {
    let last_name: string =  "last_name";
    let first_name: string = "first_name";
    let email: string = "email@gmail.com";
    let password: string = "password";

    it('create', async () => {
        const userDatabase: UserDatabase = new UserDatabase("users-test");
        const user_create: User = await userDatabase.create(last_name, first_name, email, password);
        expect(user_create.last_name).to.eql(last_name);
        expect(user_create.first_name).to.eql(first_name);
        expect(user_create.email).to.eql(email);
        expect(user_create.password).to.eql(password);
    });
});