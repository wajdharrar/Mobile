import { UserPhoneId } from "./UserPhoneId";
import { Request } from "./Request";
import { Device } from "./Phone";

export interface Cart{
    idCart:number;
    total:number;
    itemNumber:number;
    request:Request;
    device:Device;
}