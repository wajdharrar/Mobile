import { State } from "../enum/State";
import { Version } from "./Version";
import { DeviceType } from "./DeviceType";
import { Gift } from "./Gift";
import { Sale } from "./Sale";
import { User } from "./User";

export interface Device{
    idDevice: number;
    nameDevice: string;
    price: number;
    inventory: number;
    imgDevice: string;
    descDevice: string;
    color: string;
    warranty: number;
    state: State;
    reason: string;
    sale: Sale;
    version: Version;
    users: User[];
    gifts: Gift[];
    requests: Request[];
    deviceType: DeviceType;
}