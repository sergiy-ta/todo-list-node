import { expect } from 'chai';

// database
import database from '../../database/database';

describe('Test database user', () => {

    it('mongodb url', async () => {
        expect(database.mongodbUrl).to.be.a('string');
        expect(database.mongodbUrl).to.not.eql('');
    });

    it('db user', async () => {
        expect(database.dbUsers).to.be.a('string');
        expect(database.dbUsers).to.eql('users');
    });
});