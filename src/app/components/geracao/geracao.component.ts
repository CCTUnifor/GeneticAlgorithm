import { ResultadoEventService } from './../../services/resultado-event.service';
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
  styleUrls: ['./geracao.component.scss']
})
export class GeracaoComponent implements OnInit {
  @ViewChild("myCanvas") myCanvas;
  private context: CanvasRenderingContext2D;
  private drawable: IDrawable;

  private dados: EntradaDados;
  private geracao: number = 0;
  private countSemMudar: number = 0;
  private quantidadeDeSolucoes: number = 0;
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
    private _aG: AlgoritmoGeneticoService,
    private _entrada: ArquivoEntradaService,
    private _resultadoEvent: ResultadoEventService) {
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
    this._aG.resetar();
    await this._aG.prepararEntradaDeDados(dados);

    this.geracoes();
  }

  private geracoes() {
    this.geracao++;
    this._aG.gerarMelhorSolucaoDaGeracao();
    this.renderizar();

    this.atualizarUltimoMelhorCromossomo();

    if (this.achouMelhorSolucao) {
      this._resultadoEvent.add(this.melhorCromossomoDaGeracao);
      this.quantidadeDeSolucoes++;
      if (this.programaAcabou) {
        this._controleAcaoService.programaAcabou();
        return;
      }

      this.startar(this.dados);
    }

    setTimeout(() => this.geracoes(), 1);
  }

  private atualizarUltimoMelhorCromossomo() {
    if (!this.ultimoMelhorCromossomo)
      this.ultimoMelhorCromossomo = this.melhorCromossomoDaGeracao;

    if (this.melhorCromossomoDaGeracao.fitness < this.ultimoMelhorCromossomo.fitness) {
      this.ultimoMelhorCromossomo = this.melhorCromossomoDaGeracao;
      this.countSemMudar = 0;
    }
    else
      this.countSemMudar++;
  }

  private get achouMelhorSolucao() {
    return this.countSemMudar >= this.dados.criterioParada;
  }

  private get programaAcabou() {
    return this.quantidadeDeSolucoes >= 10;
  }

  renderizar(): void {
    this.drawable = this.drawable || new IDrawable(this.context);
    this.draw();
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

    this._entrada.cidades.forEach(cidade => {
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
