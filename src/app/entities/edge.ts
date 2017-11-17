import { IDrawable } from './../interfaces/drawable';
import { Node } from './node';
import { GlobalVariables } from './global-variables';

export class Edge {
    constructor(public inicio: Node, public fim: Node, public color: string = "green") {
    }

    public get tamanho(): number {
        let x = Math.pow(this.fim.coordenada.x - this.inicio.coordenada.x, 2);
        let y = Math.pow(this.fim.coordenada.y - this.inicio.coordenada.y, 2);

        return Math.sqrt(x + y);
    }
}
