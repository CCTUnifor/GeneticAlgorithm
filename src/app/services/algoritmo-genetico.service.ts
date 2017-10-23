import { Cromossomo } from './../entities/cromossomo';
import { RoletaService } from './roleta.service';
import { Injectable } from '@angular/core';
import { SorteadorService } from './../services/sorteador.service';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';
import { EntradaDados } from '../entities/entrada-dados';
import { Node } from '../entities/node';

@Injectable()
export class AlgoritmoGeneticoService {
    public melhorCromossomo: Cromossomo;
    private dadosEntrada: EntradaDados;
    private populacao: Cromossomo[];

    constructor(private _arquivoEntrada: ArquivoEntradaService,
        private _sorter: SorteadorService,
        private _roleta: RoletaService) { }

    public async prepararEntradaDeDados(dados: EntradaDados) {
        this.dadosEntrada = dados;
        await this._arquivoEntrada.carregarArquivo(dados.arquivo);
        this.populacao = this.popularCromossomos();
    }

    public gerarMelhorSolucaoDaGeracao() {
        let resultadoSelecaoNatural = this.selecaoNatural();
        this.crossover(resultadoSelecaoNatural);

        this.melhorCromossomo = this.pegarMelhorFitnes();
    }

    private popularCromossomos(): Array<Cromossomo> {
        let populacao = new Array<Cromossomo>()
        for (var i = 0; i < this.dadosEntrada.tamanhoPopulacao; i++) {
            let cidadesEmbaralhadas = this.embaralharCidades();
            populacao.push(new Cromossomo(cidadesEmbaralhadas));
        }
        return populacao;
    }

    private embaralharCidades(): Array<Node> {
        let cidadesEmbaralhadas: Array<Node> = new Array<Node>();

        this._sorter.resetArray();
        for (var j = 0; j < this._arquivoEntrada.quantidadeDeCidades; j++) {
            let sorted = this._sorter.sort(this._arquivoEntrada.quantidadeDeCidades);
            cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[sorted]);
        }
        return cidadesEmbaralhadas;
    }

    private setandoCidadeFinal(cidadesEmbaralhadas: Node[]) {
        cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[this._arquivoEntrada.cidades.length - 1]);
    }

    private setandoCidadeInicial(cidadesEmbaralhadas: Node[]) {
        cidadesEmbaralhadas.push(this._arquivoEntrada.cidades[0]);
    }

    private selecaoNatural(): Array<ResultadoSelecaoNatural> {
        let populacaoAux = this.populacao.map(x => new Cromossomo(x.individuos));
        let tuplasDosFilhos: Array<ResultadoSelecaoNatural> = [];

        for (var i = 0; i < this.dadosEntrada.tamanhoPopulacao / 2; i++) {
            let primeiroFilho = this._roleta.melhor(populacaoAux);
            populacaoAux.splice(this.populacao.indexOf(primeiroFilho));

            let segundoFilho = this._roleta.melhor(populacaoAux);
            populacaoAux.splice(this.populacao.indexOf(segundoFilho));

            tuplasDosFilhos.push(new ResultadoSelecaoNatural(primeiroFilho, segundoFilho));
        }
        return tuplasDosFilhos;
    }

    private crossover(tuplas: Array<ResultadoSelecaoNatural>) {
        for (var i = 0; i < tuplas.length; i++) {
            this._sorter.resetArray();
            if (this._sorter.sort(101) > this.dadosEntrada.taxaCrossover)
                continue;

            var tupla = tuplas[i];
            let filhoUm = this.gerarFilho(tuplas, tupla);
            if (filhoUm.fitness < tupla.filhoUm.fitness || tupla.filhoDois.fitness)
                this.subistituir(filhoUm);

            let filhoDois = this.gerarFilho(tuplas, tupla);
            if (filhoDois.fitness < tupla.filhoDois.fitness || tupla.filhoDois.fitness)
                this.subistituir(filhoDois);
        }
    }

    private gerarFilho(tuplas, tupla) {
        let mask = this.gerarMascara();
        let nodes = this.gerarAhPartirDaMascara(tupla, mask);
        this.completar(nodes, tuplas);

        return new Cromossomo(nodes);
    }

    private gerarMascara() {
        let mask = [];
        for (var i = 0; i < this.dadosEntrada.tamanhoPopulacao; i++) {
            this._sorter.resetArray();
            let random = this._sorter.sort(2);
            mask.push(random);
        }
        return mask;
    }

    private gerarAhPartirDaMascara(tupla: ResultadoSelecaoNatural, mask: any[]) {
        let nodes: Node[] = [];
        for (var i = 0; i < this._arquivoEntrada.quantidadeDeCidades; i++) {
            if (mask[i] == 0 && nodes.indexOf(tupla.filhoUm.individuos[i]) >= 0)
                nodes.push(tupla.filhoDois.individuos[i]);
            if (mask[i] == 0 && nodes.indexOf(tupla.filhoUm.individuos[i]) < 0)
                nodes.push(tupla.filhoUm.individuos[i]);

            if (mask[i] == 1 && nodes.indexOf(tupla.filhoDois.individuos[i]) >= 0)
                nodes.push(tupla.filhoUm.individuos[i]);
            if (mask[i] == 1 && nodes.indexOf(tupla.filhoDois.individuos[i]) < 0)
                nodes.push(tupla.filhoDois.individuos[i]);
        }
        return nodes;
    }

    private completar(nodes: Node[], tuplas: ResultadoSelecaoNatural[]) {
        for (var i = 0; i < this._arquivoEntrada.quantidadeDeCidades; i++) {
            if (!nodes[i])
                nodes[i] = this.primeiroQueNaoExiste(tuplas, nodes);
        }
    }

    private primeiroQueNaoExiste(tuplas: Array<ResultadoSelecaoNatural>, nodes: Node[]) {
        let node = tuplas.map(x => x.filhoDois.individuos.concat(x.filhoUm.individuos)).reduce((a, b) => a.concat(b));
        for (var i = 0; i < node.length; i++) {
            if (nodes.indexOf(node[i]) < 0)
                return node[i];
        }
    }

    private subistituir(best: Cromossomo) {
        let bigger = -1;
        let index = 0;
        for (var i = 0; i < this.dadosEntrada.tamanhoPopulacao; i++) {
            if (this.populacao[i].fitness > bigger) {
                index = i;
                bigger = this.populacao[i].fitness;
            }
        }
        if (index != -1)
            this.populacao[index] = best;
    }

    private pegarMelhorFitnes(): Cromossomo {
        let menor = this.populacao[0];
        for (var i = 0; i < this.dadosEntrada.tamanhoPopulacao; i++) {
            if (this.populacao[i].fitness < menor.fitness)
                menor = this.populacao[i];
        }
        return menor;
    }
}

class ResultadoSelecaoNatural {
    constructor(public filhoUm: Cromossomo, public filhoDois: Cromossomo) { }
}
