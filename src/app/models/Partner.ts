import { Phone } from "./Phone";
import { Shop } from "./Shop";
import { User } from "./User";

export interface Partner {
    idProvider:number;
    idUser:number;
    nameRes:string;
    lastNameRes:string;
    emailRes:string;
    numberRes:string;
    shops:Shop[];
    devices :Phone[];
    user :User;
}