import { State } from "../enum/State";

export interface Gift {
    idGift: number;
    nameGift: string;
    imgGift: string;
    state: State;
    reason: string;
}