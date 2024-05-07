import { State } from '../enum/State';
import { Brand } from "./Brand";

export interface Model{
    idModel:number;
    nameModel:string;
    imgModel:string;
    descModel:string;
    brand:Brand;
    state:State;
    idPartner:number;
    namePartner:string;
}