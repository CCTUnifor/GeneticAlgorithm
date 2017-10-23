import { AlgoritmoGeneticoService } from './../../services/algoritmo-genetico.service';
import { EntradaDados } from './../../entities/entrada-dados';
import { ControleDeAcaoService } from './../../services/controle-de-acao.service';
import { GlobalVariables } from './../../entities/global-variables';
import { Cromossomo } from './../../entities/cromossomo';
import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Edge } from '../../entities/edge';
import { Node } from '../../entities/node';
import { IDrawable } from '../../interfaces/drawable';
import { ArquivoEntradaService } from '../../services/arquivo-entrada.service';
import { SorteadorService } from '../../services/sorteador.service';

@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent implements OnInit {
  @ViewChild("myCanvas") myCanvas;
  private context: CanvasRenderingContext2D;
  private drawable: IDrawable;

  private dados: EntradaDados;
  private geracao: number = 0;
  private countSemMudar: number = 0;
  private ultimoMelhorCromossomo: Cromossomo;

  private get titulo(): string {
    return this.geracao && this.geracao + "ª Geração";
  }

  private get melhorCromossomoDaGeracao(): Cromossomo {
    return this._aG && this._aG.melhorCromossomo;
  }
  private get fitnessLabel() {
    return this.melhorCromossomoDaGeracao ? `Fitness: ${this.melhorCromossomoDaGeracao.fitness.toFixed(4)}` : '';
  }
  private get width() {
    return GlobalVariables.canvasWidth;
  }
  private get height() {
    return GlobalVariables.canvasHeight;
  }

  constructor(private _controleAcaoService: ControleDeAcaoService,
    private _sorter: SorteadorService,
    private _aG: AlgoritmoGeneticoService) {
    this._controleAcaoService.handleStartarAplicacao.subscribe((dados) => this.startar(dados));
    this._controleAcaoService.handleLimparAplicacao.subscribe(() => this.limparCanvas());
  }

  ngOnInit(): void {
    let canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  }

  private async startar(dados: EntradaDados) {
    this.dados = dados;
    await this._aG.prepararEntradaDeDados(dados);

    this.x();
  }

  private ehParaParar() {
    if (!this.ultimoMelhorCromossomo)
      this.ultimoMelhorCromossomo = this.melhorCromossomoDaGeracao;
      
    if (this.melhorCromossomoDaGeracao.fitness < this.ultimoMelhorCromossomo.fitness) {
      this.ultimoMelhorCromossomo = this.melhorCromossomoDaGeracao;
      this.countSemMudar = 0;
    }
    else
      this.countSemMudar++;
    
    return this.countSemMudar >= this.dados.criterioParada;
  }

  private async x() {
    this.geracao++;
    await this._aG.gerarMelhorSolucaoDaGeracao();
    await this.renderizar();

    console.log(this.geracao, this._aG.melhorCromossomo.fitness)
    if (this.ehParaParar())
      return;
    setTimeout(() => this.x(), 1000);
  }

  renderizar(): void {
    this.drawable = this.drawable || new IDrawable(this.context);
    this.draw();
    requestAnimationFrame(() => this.renderizar());
  }

  limparCanvas() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  draw() {
    this.limparCanvas();
    this.drawCities();
    this.drawCaminhos();
  }

  drawCities() {
    if (!this.melhorCromossomoDaGeracao)
      return;
    this.melhorCromossomoDaGeracao.individuos.forEach(cidade => {
      this.drawable.drawNode(cidade);
    });
  }

  drawCaminhos() {
    if (!this.melhorCromossomoDaGeracao)
      return;
    for (var i = 0; i < this.melhorCromossomoDaGeracao.edges.length; i++) {
      let caminho = this.melhorCromossomoDaGeracao.edges[i];
      this.drawable.drawEdge(caminho);
    }
  }
}
