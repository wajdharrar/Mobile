import { Device } from "./Phone";

export interface DeviceType {
    idType: number;
    nameType: string;
    devices: Device[];
}