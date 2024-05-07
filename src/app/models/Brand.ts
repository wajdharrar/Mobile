import { State } from "../enum/State";
import { Model } from "./Model";

export interface Brand {
    idBrand: number;
    nameBrand: string;
    logoBrand: string;
    descBrand: string;
    state: State;
    reason: string;
    model:Model
    idPartner:number;
    namePartner:string;
}