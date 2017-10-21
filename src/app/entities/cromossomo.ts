import { Edge } from './edge';
import { Node } from "./node";
export class Cromossomo {
    private _cidades: Node[];
    private _edges: Edge[];
    public get individuos(): Node[] {
        return this._cidades;
    }
    public get edges(): Edge[] {
        return this._edges;
    }

    constructor(cidades: Node[]) {
        this._cidades = cidades;
        this._edges = [];
        this.carregarEdges(cidades);
    }

    private carregarEdges(cidades: Node[]) {
        for (var i = 1; i < cidades.length; i++) {
            let cidadeInicio = cidades[i - 1];
            let cidadeFim = cidades[i];
            this._edges.push(new Edge(cidadeInicio, cidadeFim));
        }
    }

    private _fitness: number;
    public get fitness(): number {
        if (this._fitness != undefined)
            return this._fitness;

        let fit = 0;
        for (var i = 0; i < this._edges.length; i++) {
            fit += this._edges[i].tamanho;
        }
        this._fitness = fit;
        return fit;
    }
}
