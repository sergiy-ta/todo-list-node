export interface ProjectAccessEditClass {
    edit(user_login_id: string, id: string, name: string): Promise<boolean>;

    delete(user_login_id: string, id: string): Promise<boolean>;
}