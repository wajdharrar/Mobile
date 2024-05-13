import { State } from "../enum/State";
import { Version } from "./Version";
import { DeviceType } from "./DeviceType";
import { Sale } from "./Sale";

export interface Device{
    idDevice: number;
    nameDevice: string;
    price: number;
    inventory: number;
    imgDevice: string;
    descDevice: string;
    color: string;
    state: State;
    reason: string;
    number:number;
    sale: Sale;
    version: Version;
    deviceType: DeviceType;
}