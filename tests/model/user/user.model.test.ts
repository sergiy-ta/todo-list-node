import { expect } from 'chai';

// model
import { UserModel } from '../../../model/user/user.model';

// interface
import { User } from '../../../interface/object/user.interface';

describe('Test model user', () => {
    let id: string;
    let last_name: string = "last_name";
    let first_name: string = "first_name";
    let email: string = "email1@gmail.com";
    let password: string = "password";

    it('create new', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.create(last_name, first_name, email, password);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.not.eql(password);
            id = user_create._id.toHexString();
        } else {
            expect(user_create).to.not.eql(null);
        } 
    });

    it('create old', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.create(last_name, first_name, email, password);
        expect(user_create).to.eql(null);

    });

    it('get', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.get(id);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.not.eql(password);
        } else {
            expect(user_create).to.not.eql(null);
        }
    });

    it('get not id', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.get(id);
        expect(user_create).to.eql(null);
    });

    it('get email', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.getEmail(email);
        if (user_create) {
            expect(user_create.last_name).to.eql(last_name);
            expect(user_create.first_name).to.eql(first_name);
            expect(user_create.email).to.eql(email);
            expect(user_create.password).to.not.eql(password);
        } else {
            expect(user_create).to.not.eql(null);
        }
    });

    it('get email not email', async () => {
        const userModel: UserModel = new UserModel("users-test");
        const user_create: User | null = await userModel.getEmail("@gmail.com");
        expect(user_create).to.eql(null);
    });
});