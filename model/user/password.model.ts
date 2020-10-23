// package
import * as passwordHash from 'password-hash';

export class PasswordModel {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    public hashPassword(): string {
        return passwordHash.generate(this.password);
    }

    public verificatePassword(hashedPassword: string): boolean {
        return passwordHash.verify(this.password, hashedPassword);
    }
}