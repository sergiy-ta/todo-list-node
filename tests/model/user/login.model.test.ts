import { expect } from 'chai';

import { LoginModel } from '../../../model/user/login.model';

describe('Test model login', () => {
    let email: string = "email1@gmail.com";
    let password: string = "password";

    it('login true', async () => {
        let loginModel: LoginModel = new LoginModel(email, password, "users-test");
        let is_login: string | undefined = await loginModel.login();
        expect(is_login).to.be.a('string');
        expect(is_login).to.not.eql('');
    });

    it('login false', async () => {
        let loginModel: LoginModel = new LoginModel("@fe.w", "password", "users-test");
        let is_login: string | undefined = await loginModel.login();
        expect(is_login).to.be.a('undefined');
        expect(is_login).to.eql(undefined);
    });
});