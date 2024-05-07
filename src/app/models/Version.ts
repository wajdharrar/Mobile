import { State } from "../enum/State";
import { Brand } from "./Brand";

export interface Version {
    idVersion: number;
    nameVersion: string;
    imgVersion: string;
    descVersion: string;
    state: State;
    reason: string;
    brand: Brand;
    idPartner:number;
    namePartner:string;
}
