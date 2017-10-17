import { IDrawable } from './../interfaces/drawable';
import { Coordenada } from './coordenada';
import { GlobalVariables } from './global-variables';
export class Node extends IDrawable {
    public coordenada: Coordenada;
    public color: string = "black";
    public ordinalName: number;



    constructor(ctx: CanvasRenderingContext2D, coordenada: Coordenada, ordinalName: number) {
        super(ctx);
        this.coordenada = coordenada;
        this.ordinalName = ordinalName;
    }

    public draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.coordenada.x / GlobalVariables.parametroX + GlobalVariables.parede, this.coordenada.y / GlobalVariables.parametroY + GlobalVariables.parede, 15, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color;

        this.ctx.fill();
    }
}
