export interface ProjectNotAccessEditClass {
    edit(id: string, name: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}