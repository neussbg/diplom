export class AuthLoginInfo {
    email: string;
    password: string;

    constructor(username:string, pasword:string){
        this.email = username;
        this.password = pasword
    }
}