import { IDrawable } from './../interfaces/drawable';
import { Node } from './node';
import { GlobalVariables } from './global-variables';

export class Edge {
    constructor(public inicio: Node, public fim: Node, public color: string = "green") {
    }
}
