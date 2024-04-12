import { Phone } from "./Phone";

export interface DeviceType {
    idType: number;
    nameType: string;
    devices: Phone[];
}