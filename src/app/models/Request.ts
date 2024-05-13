import { User } from "./User";
    export interface Request{
    idRequest:number;
    date:any;
    initialPayment:number;
    warranty:number;
    repayement:number;
    state:string;
    reason:string;
    borrowerType:string;
    user:User;
    }
    
