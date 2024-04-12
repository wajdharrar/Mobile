import { State } from "../enum/State";
import { Phone } from "./Phone";

export interface Sale{
    idSale: number;
    value: number;
    startDate: string;
    endDate: string;
    state: State;
    reason: string;
    phones: Phone[];
}