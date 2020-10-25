// model
import { UserModel } from "./user.model";
import { AuthModel } from "../auth.model";
import { PasswordModel } from "./password.model";

// database
import { UserDatabase } from "../../database/user/user.database";

// interface
import { User } from "../../interface/object/user.interface";

export class LoginModel {
    private collection: string;
    private email: string;
    private password: string;

    constructor(email: string, password: string, collection: string = "users") {
        this.email = email;
        this.password = password;
        this.collection = collection;
    }

    public async login(): Promise<string | undefined> {
        let passwordHashModel: PasswordModel = new PasswordModel(this.password);
        let userDatabase: UserDatabase = new UserDatabase(this.collection);
        let authModel: AuthModel = new AuthModel();

        let user: User | null = await userDatabase.getEmail(this.email);

        if (user) {
            if (passwordHashModel.verificatePassword(user.password)) {
                return await authModel.login(user._id.toString());
            }
        }
    }
}