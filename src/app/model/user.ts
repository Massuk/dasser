import { Role } from "./role";

export class User {
    idUser: number = 0;
    name: string = '';
    lastname: string = '';
    login: string = '';
    password: string = '';
    creationDate: string = '';
    modifiedDate: string = '';
    status: string = '';
    role: Role = new Role();
}