import { expect } from 'chai';

// database
import database from '../../database/database';

describe('Test database', () => {

    it('mongodb url', async () => {
        expect(database.mongodbUrl).to.be.a('string');
        expect(database.mongodbUrl).to.not.eql('');
    });

    it('db user', async () => {
        expect(database.dbUsers).to.be.a('string');
        expect(database.dbUsers).to.eql('users');
    });

    it('db tasks', async () => {
        expect(database.dbTasks).to.be.a('string');
        expect(database.dbTasks).to.eql('tasks');
    });

    it('db projects', async () => {
        expect(database.dbProjects).to.be.a('string');
        expect(database.dbProjects).to.eql('projects');
    });
});