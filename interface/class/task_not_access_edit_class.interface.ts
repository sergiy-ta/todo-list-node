export interface TaskNotAccessEditClass {
    edit(id: string, name: string, description: string, execution_date_time: string, tag_list: string[], project: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}