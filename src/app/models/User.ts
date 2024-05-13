import { StateUser } from "../enum/StateUser";
import { Role } from "./Role";
import { Device } from "./Phone";


export interface User{
    idUtilisateur:number;
    lastName:string;
    name:string;
    number:string;
    password:string;
    email:string;
    adress:string;
    dob:string;
    img:string;
    stateUser:StateUser;
    role:Role;
}