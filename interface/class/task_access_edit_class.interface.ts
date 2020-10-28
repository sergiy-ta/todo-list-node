export interface TaskAccessEditClass {
    edit(user_login_id: string, id: string, name: string, description: string, execution_date_time: string, tag_list: string[], project: string): Promise<boolean>;

    delete(user_login_id: string, id: string): Promise<boolean>;
}