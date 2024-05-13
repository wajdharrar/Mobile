import { State } from "../enum/State";
import { Request } from "./Request";

export interface Document{
    idDocument:number;
    nationalId:string;
    birthCertificate:string;
    proofOfIncome:string;
    proofOfEmployement:string;
    taxReturn:string;
    bankStatement:string;
    state:State;
    reason:string;
    request:Request;
}