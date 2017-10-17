import { IDrawable } from './../interfaces/drawable';
import { Node } from './node';
import { GlobalVariables } from './global-variables';

export class Edge extends IDrawable {
    constructor(ctx: CanvasRenderingContext2D, public inicio: Node, public fim: Node) {
        super(ctx);
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "green";
        this.ctx.moveTo(this.inicio.coordenada.x / GlobalVariables.parametroX + 10, this.inicio.coordenada.y / GlobalVariables.parametroY + 10);
        this.ctx.lineTo(this.fim.coordenada.x / GlobalVariables.parametroX + 10, this.fim.coordenada.y / GlobalVariables.parametroY + 10);
        this.ctx.stroke();
    }
}
