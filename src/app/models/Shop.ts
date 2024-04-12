import { Partner } from "./Partner";

export interface Shop{
    idShop:number;
    address:string;
    email:string;
    number:string;
    fax:string;
    facebook:string;
    instagram:string;
    provider:Partner;
}