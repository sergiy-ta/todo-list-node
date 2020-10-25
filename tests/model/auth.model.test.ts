import { expect } from 'chai';
import { access } from 'fs';

import { AuthModel } from '../../model/auth.model';

describe('Test model auth', () => {
    let id: string = "sdjkfnkjdf";
    let token: string;
    let token_false: string = "fdhdblhjbg";

    it('login', async () => {
        let authModel: AuthModel = new AuthModel();
        token = await authModel.login(id);
        expect(token).to.be.a('string');
        expect(token).to.not.eql('');
    });

    it('verify true token', async () => {
        let authModel: AuthModel = new AuthModel();
        authModel.verifyToken(token, (access: boolean, authModel: { id: string } | undefined) => {
            expect(access).to.eql(true);
            if (authModel) expect(authModel.id).to.eql(id);
        });
    });

    it('verify false token', async () => {
        let authModel: AuthModel = new AuthModel();
        authModel.verifyToken(token_false, (access: boolean, authModel: { id: string } | undefined) => {
            expect(access).to.eql(false);
            expect(authModel).to.eql(undefined);
        });
    });
});