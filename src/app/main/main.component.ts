import { element } from 'protractor';
import { SorteadorService } from './../services/sorteador.service';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';
import { Node } from "../entities/node";
import { Edge } from '../entities/edge';
import { Cromossomo } from '../entities/cromossomo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private arquivo: File;
  private tamanhoPopulacao: number = 80;

  private cromossomos: Cromossomo[];
  private melhorCromossomo: Cromossomo;
  private tituloGeracao: string;

  constructor(private _arquivoEntrada: ArquivoEntradaService, private _sorter: SorteadorService) { }

  async onInputChange(event) {
    let target = event.explicitOriginalTarget || event.srcElement;
    this.arquivo = target.files[0];

    await this._arquivoEntrada.carregarArquivo(this.arquivo);
    await this.popularCromossomos();
    await this.escolherMelhorCromossomo();
    this.tituloGeracao = "1ª Geração";
  }

  private popularCromossomos() {
    this.cromossomos = new Array<Cromossomo>()
    for (var i = 0; i < this.tamanhoPopulacao; i++) {
      let cidadesEmbaralhadas = this.embaralharCidades();
      this.cromossomos.push(new Cromossomo(cidadesEmbaralhadas));
    }
    console.log(this.cromossomos)
  }

  private escolherMelhorCromossomo() {
    let menor: Cromossomo = this.cromossomos[0];
    let segundoMenor: Cromossomo = this.cromossomos[1];
    for (var i = 0; i < this.cromossomos.length; i++) {
      var element = this.cromossomos[i];
      if (element.fitness < menor.fitness)
        menor = element;
      if (element.fitness < segundoMenor.fitness)
        segundoMenor = element;
    }
    this.melhorCromossomo = menor;
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
}