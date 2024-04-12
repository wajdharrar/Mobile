import { State } from "../enum/State";
import { Phone } from "./Phone";
import { Version } from "./Version";

export interface Brand {
    idBrand: number;
    nameBrand: string;
    logoBrand: string;
    descBrand: string;
    state: State;
    reason: string;
    phones: Phone[];
    versions: Version[];
}