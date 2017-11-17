import { IDrawable } from './../interfaces/drawable';
import { Coordenada } from './coordenada';
import { GlobalVariables } from './global-variables';
export class Node {
    public coordenada: Coordenada;
    public color: string = "black";
    public ordinalName: number;

    constructor(coordenada: Coordenada, ordinalName: number) {
        this.coordenada = coordenada;
        this.ordinalName = ordinalName;
    }
}
