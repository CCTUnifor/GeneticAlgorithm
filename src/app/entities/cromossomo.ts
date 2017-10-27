import { Edge } from './edge';
import { Node } from "./node";
export class Cromossomo {
    private _id: number;
    private _cidades: Node[];
    private _edges: Edge[];
    public get individuos(): Node[] {
        return this._cidades;
    }
    public get edges(): Edge[] {
        return this._edges;
    }
    public get id() {
        return this._id;
    }

    constructor(id: number, cidades: Node[]) {
        this._id = id;
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

    public get fitness(): number {
        let fit = 0;
        for (var i = 0; i < this._edges.length; i++) {
            fit += this._edges[i].tamanho;
        }
        return fit;
    }
}
