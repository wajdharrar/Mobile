import { State } from "../enum/State";
import { Brand } from "./Brand";
import { DeviceType } from "./DeviceType";
import { Gift } from "./Gift";
import { Sale } from "./Sale";
import { User } from "./User";

export interface Phone{
    idPhone: number;
    namePhone: string;
    prix: number;
    stock: number;
    imgPhone: string;
    descPhone: string;
    color: string;
    warranty: number;
    state: State;
    reason: string;
    sale: Sale;
    brand: Brand;
    users: User[];
    gifts: Gift[];
    requests: Request[];
    deviceType: DeviceType;
}