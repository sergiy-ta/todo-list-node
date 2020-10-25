import { expect } from 'chai';

// model
import { PasswordModel } from '../../../model/user/password.model';

describe('Test model password', () => {
    let password: string = "password";
    let password_hash_true: string;
    let password_hash_false: string = "gfdjkdfbnhjdbfjhfdbdl";

    it('hash password', async () => {
        const passwordModel: PasswordModel = new PasswordModel(password);
        password_hash_true = await passwordModel.hashPassword();
        expect(password_hash_true).to.be.a('string');
        expect(password_hash_true).to.not.eql('');
    });

    it('verificate password true', async () => {
        const passwordModel: PasswordModel = new PasswordModel(password);
        let is_real: boolean = await passwordModel.verificatePassword(password_hash_true);
        expect(is_real).to.eql(true);
    });

    it('verificate password false', async () => {
        const passwordModel: PasswordModel = new PasswordModel(password);
        let is_real: boolean = await passwordModel.verificatePassword(password_hash_false);
        expect(is_real).to.eql(false);
    });
});