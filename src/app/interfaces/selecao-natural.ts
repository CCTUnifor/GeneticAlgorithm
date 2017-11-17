import { Cromossomo } from './../entities/cromossomo';
export interface ISelecaoNatural {
    gerarPais(populacao: Cromossomo[]): ResultadoSelecaoNatural[];
}

export class ResultadoSelecaoNatural {
    constructor(public selecionados: Cromossomo[]) { }
}