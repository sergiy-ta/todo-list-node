import { expect } from 'chai';

// database
import { ProjectDatabase } from '../../../database/project/project.database';

// interface
import { Project } from '../../../interface/object/project.interface';

describe('Test database project', async () => {
    let id: string;
    let name: string = "name";
    let user: { _id: string } = { _id: "5f9a81e258e8c4a80ec7d9da" };

    it('create', async () => {
        const projectDatabase: ProjectDatabase = new ProjectDatabase("projects-test");
        const project: Project | null = await projectDatabase.create(name, user);
        if (project) {
            id = project._id.toHexString();
            expect(project.name).to.eql(name);
            expect(project.user._id.toString()).to.eql(user._id);
        } else {
            expect(project).to.not.eql(null);
        }
    });

    it('get', async () => {
        const projectDatabase: ProjectDatabase = new ProjectDatabase("projects-test");
        const project: Project | null = await projectDatabase.get(id);
        if (project) {
            expect(project.name).to.eql(name);
        } else {
            expect(project).to.not.eql(null);
        }
    });

    it('get list', async () => {
        const projectDatabase: ProjectDatabase = new ProjectDatabase("projects-test");
        const project: Project[] = await projectDatabase.getList(user);
        expect(project.length).to.eql(1);
        expect(project[0]).to.be.a('object');
    });

    it('edit', async () => {
        const projectDatabase: ProjectDatabase = new ProjectDatabase("projects-test");
        const is_update: boolean = await projectDatabase.edit(id, name);
        expect(is_update).to.eql(true);
    });

    it('delete', async () => {
        const projectDatabase: ProjectDatabase = new ProjectDatabase("projects-test");
        const is_delete: boolean = await projectDatabase.delete(id);
        expect(is_delete).to.eql(true);
    });
});