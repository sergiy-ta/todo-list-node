import * as fs from 'fs';

const mongodbUrl: string = fs.readFileSync('database/mongodb_url.txt', 'utf8');

const dbUsers: string = "users";
const dbTasks: string = "tasks";

const database = {
    mongodbUrl,
    dbUsers,
    dbTasks
}

export default database;