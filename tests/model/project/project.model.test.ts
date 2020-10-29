import { expect } from 'chai';

// database
import { ProjectModel } from '../../../model/project/project.model';

// interface
import { Project } from '../../../interface/object/project.interface';

describe('Test model project', async () => {
    let id: string;
    let name: string = "name";
    let user: { _id: string } = { _id: "5f9a81e258e8c4a80ec7d9da" };

    it('create', async () => {
        const projectModel: ProjectModel = new ProjectModel("projects-test");
        const project: Project | null = await projectModel.create(name, user);
        if (project) {
            id = project._id.toString();
            expect(project.name).to.eql(name);
            expect(project.user._id.toString()).to.eql(user._id);
        } else {
            expect(project).to.not.eql(null);
        }
    });

    it('get', async () => {
        const projectModel: ProjectModel = new ProjectModel("projects-test");
        const project: Project | null = await projectModel.get(id);
        if (project) {
            expect(project.name).to.eql(name);
        } else {
            expect(project).to.not.eql(null);
        }
    });

    it('get list', async () => {
        const projectModel: ProjectModel = new ProjectModel("projects-test");
        const project: Project[] = await projectModel.getList(user);
        expect(project.length).to.eql(1);
        expect(project[0]).to.be.a('object');
    });

    it('edit', async () => {
        const projectModel: ProjectModel = new ProjectModel("projects-test");
        const is_update: boolean = await projectModel.edit(user._id.toString(), id, name);
        expect(is_update).to.eql(true);
    });

    it('delete', async () => {
        const projectModel: ProjectModel = new ProjectModel("projects-test");
        const is_delete: boolean = await projectModel.delete(user._id.toString(), id);
        expect(is_delete).to.eql(true);
    });
});