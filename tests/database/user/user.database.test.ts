import { expect } from 'chai';

// database
import { UserDatabase } from '../../../database/user/user.database';

// interface
import { User } from '../../../interface/object/user.interface';

describe('Test database user', () => {
    let id: string;
    let last_name: string = "last_name";
    let first_name: string = "first_name";
    let email: string = "email@gmail.com";
    let password: string = "password";

    it('create', async () => {
        const userDatabase: UserDatabase = new UserDatabase("users-test");
        const user_create: User | null = await userDatabase.create(last_name, first_name, email, password);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.eql(password);
            id = user_create._id.toHexString();
        } else {
            expect(user_create).to.not.eql(null);
        }
        
    });

    it('get', async () => {
        const userDatabase: UserDatabase = new UserDatabase("users-test");
        const user_create: User | null = await userDatabase.get(id);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.eql(password);
        } else {
            expect(user_create).to.not.eql(null);
        }
    });

    it('get email', async () => {
        const userDatabase: UserDatabase = new UserDatabase("users-test");
        const user_create: User | null = await userDatabase.getEmail(email);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.eql(password);
        } else {
            expect(user_create).to.not.eql(null);
        }
    });

    it('get email not email', async () => {
        const userDatabase: UserDatabase = new UserDatabase("users-test");
        const user_create: User | null = await userDatabase.getEmail("@gmail.com");
        expect(user_create).to.eql(null);
    });
});