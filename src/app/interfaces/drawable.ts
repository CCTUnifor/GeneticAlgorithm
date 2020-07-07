import { Node } from "../entities/node";
import { GlobalVariables } from "../entities/global-variables";
import { Edge } from "../entities/edge";

export class IDrawable {
    constructor(protected ctx: CanvasRenderingContext2D) {
      ctx.scale(1, 1);
     }

    public drawNode(maxX: number, minX: number, maxY: number, minY: number, node: Node) {
        this.ctx.beginPath();
        var diffx = maxX - minX;
        var diffy = maxY - minY;

        var x = GlobalVariables.canvasWidth * (node.coordenada.x - minX) / diffx;
        var y = GlobalVariables.canvasHeight * (node.coordenada.y - minY) / diffy;

        this.ctx.arc(x, y, GlobalVariables.diametro, 0, Math.PI * 2, true);
        this.ctx.fillStyle = node.color;

        this.ctx.fill();
    }

    public drawEdge(maxX: number, minX: number, maxY: number, minY: number, node: Edge) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = node.color;
        var diffx = maxX - minX;
        var diffy = maxY - minY;

        var inicioX = GlobalVariables.canvasWidth * (node.inicio.coordenada.x - minX) / diffx;
        var inicioY = GlobalVariables.canvasHeight * (node.inicio.coordenada.y - minY) / diffy;

        var fimX = GlobalVariables.canvasWidth * (node.fim.coordenada.x - minX) / diffx;
        var fimY = GlobalVariables.canvasHeight * (node.fim.coordenada.y - minY) / diffy;

        this.ctx.moveTo(inicioX, inicioY);
        this.ctx.lineTo(fimX, fimY);
        this.ctx.stroke();
    }
}
