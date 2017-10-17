import { Node } from "./node";
export class Cromossomo {
    private _cidades: Node[];
    public get cidades(): Node[] {
        return this._cidades;
    }

    constructor(cidades: Node[]) {
        this._cidades = cidades;
    }

    private _fitness: number;
    public get fitness(): number {
        if (this._fitness != undefined)
            return this._fitness;

        let fit = 0;
        for (var i = 1; i < this._cidades.length; i++) {
            fit += this.distanciaEntreDoisPontos(this._cidades[i - 1], this._cidades[i]);
        }
        this._fitness = fit;
        return fit;
    }

    private distanciaEntreDoisPontos(inicio: Node, fim: Node): number {
        let x = Math.pow(fim.coordenada.x - inicio.coordenada.x, 2);
        let y = Math.pow(fim.coordenada.y - inicio.coordenada.y, 2);

        return Math.sqrt(x + y);
    }

}
