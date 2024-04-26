import { State } from "../enum/State";
import { Model } from "./Model";
import { Device } from "./Phone";
import { Version } from "./Version";

export interface Brand {
    idBrand: number;
    nameBrand: string;
    logoBrand: string;
    descBrand: string;
    state: State;
    reason: string;
    model:Model
}