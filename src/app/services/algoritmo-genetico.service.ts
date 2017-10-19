import { Injectable } from '@angular/core';
import { SorteadorService } from './../services/sorteador.service';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';
import { Cromossomo } from '../entities/cromossomo';
import { EntradaDados } from '../entities/entrada-dados';
import { Node } from '../entities/node';

@Injectable()
export class AlgoritmoGeneticoService {
    public melhorCromossomo: Cromossomo;

    constructor(private _arquivoEntrada: ArquivoEntradaService,
        private _sorter: SorteadorService) { }

    public async rodarGeracao(dados: EntradaDados): Promise<any> {
        await this._arquivoEntrada.carregarArquivo(dados.arquivo);
        let cromossomos = await this.popularCromossomos(dados.tamanhoPopulacao);
        let resultadoSelecaoNatural = await this.selecaoNatural(cromossomos);
        await this.crossover(resultadoSelecaoNatural);

        this.melhorCromossomo = resultadoSelecaoNatural.melhorFitness;
    }

    private popularCromossomos(tamanhoPopulacao: number): Array<Cromossomo> {
        let cromossomos = new Array<Cromossomo>()
        for (var i = 0; i < tamanhoPopulacao; i++) {
            let cidadesEmbaralhadas = this.embaralharCidades();
            cromossomos.push(new Cromossomo(cidadesEmbaralhadas));
        }
        console.log(cromossomos);
        return cromossomos;
    }

    private embaralharCidades(): Array<Node> {
        let cidadesEmbaralhadas: Array<Node> = new Array<Node>();
        this.setandoCidadeInicial(cidadesEmbaralhadas);

        this._sorter.resetArray();
        for (var j = 1; j < this._arquivoEntrada.quantidadeDeCidades - 1; j++) {
            let sorted = this._sorter.sort(28);
            if (sorted != 0)
                cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[sorted]);
        }

        this.setandoCidadeFinal(cidadesEmbaralhadas);
        return cidadesEmbaralhadas;
    }

    private setandoCidadeFinal(cidadesEmbaralhadas: Node[]) {
        cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[this._arquivoEntrada.cidades.length - 1]);
    }

    private setandoCidadeInicial(cidadesEmbaralhadas: Node[]) {
        cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[0]);
    }

    private selecaoNatural(cromossomos: Array<Cromossomo>): ResultadoSelecaoNatural {
        let menor: Cromossomo = cromossomos[0];
        let segundoMenor: Cromossomo = cromossomos[1];
        for (var i = 0; i < cromossomos.length; i++) {
            var element = cromossomos[i];
            if (element.fitness < menor.fitness)
                menor = element;
            if (element.fitness < segundoMenor.fitness)
                segundoMenor = element;
        }
        let resultado = new ResultadoSelecaoNatural(menor, segundoMenor);
        console.log(resultado)
        return resultado;
    }

    private crossover(top: ResultadoSelecaoNatural) {
    }

}

class ResultadoSelecaoNatural {
    constructor(public melhorFitness: Cromossomo, public segundoMelhorFitness: Cromossomo) { }
}
