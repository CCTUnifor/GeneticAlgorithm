import { Coordenada } from './coordenada';
import { Edge } from './edge';
import { Node } from "./node";
export class Cromossomo {
    private _id: number;
    private _cidades: Node[];
    public get edges() {
        return this.carregarEdges();
    }
    public get individuos(): Node[] {
        return this._cidades;
    }
    public get id() {
        return this._id;
    }

    constructor(id: number, cidades: Node[]) {
        this._id = id;
        this._cidades = cidades;
        this.carregarEdges();
    }

    private carregarEdges() {
        let _edges = [];
        for (var i = 1; i < this._cidades.length; i++) {
            let cidadeInicio = this._cidades[i - 1];
            let cidadeFim = this._cidades[i];
            if (!cidadeInicio || !cidadeFim)
                debugger
            _edges.push(new Edge(cidadeInicio, cidadeFim));
        }
        _edges.push(new Edge(this._cidades[this._cidades.length - 1], this._cidades[0]));
        return _edges;
    }

    public get fitness(): number {
        let ed = this.edges;
        let fit = 0;
        for (var i = 0; i < ed.length; i++) {
            fit += ed[i].tamanho;
        }
        return fit;
    }

    public clone(): Cromossomo {
        return new Cromossomo(this.id, this.individuos.map(x => new Node(new Coordenada(x.coordenada.x, x.coordenada.y), x.ordinalName)));
    }
}
