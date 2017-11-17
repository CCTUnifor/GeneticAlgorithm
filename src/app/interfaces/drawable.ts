import { Node } from "../entities/node";
import { GlobalVariables } from "../entities/global-variables";
import { Edge } from "../entities/edge";

export class IDrawable {
    constructor(protected ctx: CanvasRenderingContext2D) { }

    public drawNode(node: Node) {
        this.ctx.beginPath();
        this.ctx.arc(node.coordenada.x / GlobalVariables.parametroX + GlobalVariables.parede, node.coordenada.y / GlobalVariables.parametroY + GlobalVariables.parede, GlobalVariables.diametro, 0, Math.PI * 2, true);
        this.ctx.fillStyle = node.color;

        this.ctx.fill();
    }

    public drawEdge(node: Edge) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = node.color;
        this.ctx.moveTo(node.inicio.coordenada.x / GlobalVariables.parametroX + GlobalVariables.raio, node.inicio.coordenada.y / GlobalVariables.parametroY + GlobalVariables.raio);
        this.ctx.lineTo(node.fim.coordenada.x / GlobalVariables.parametroX + GlobalVariables.raio, node.fim.coordenada.y / GlobalVariables.parametroY + GlobalVariables.raio);
        this.ctx.stroke();
    }
}
