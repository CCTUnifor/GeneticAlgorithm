import { CommonModule } from '@angular/common';
import { TimerService } from './../../services/timer.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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
    private _resultadoEvent: ResultadoEventService,
    private _timerService: TimerService) {
    this._controleAcaoService.handleStartarAplicacao.subscribe((dados) => this.iniciarSolucao(dados));
    this._controleAcaoService.handleLimparAplicacao.subscribe(() => this.limparCanvas());
    this._controleAcaoService.handleArquivoMudou.subscribe((arquivo) => this.arquivoMudou(arquivo));
  }

  ngOnInit(): void {
    let canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  }

  private async arquivoMudou(arquivo: File) {
    let cidades = await this._aG.carregarArquivo(arquivo);
    this._aG.setarPrimeiraSolucao(new Cromossomo(1, cidades));
    this.renderizar();
  }

  private async iniciarSolucao(dados: EntradaDados) {

    this.dados = dados;
    await this._aG.carregarDados(dados);
    this._aG.popular();

    await this.loop();
  }

  private resetar() {
    this.geracao = 0;
    this.countSemMudar = 0;
    this.ultimoMelhorCromossomo = undefined;
    this._timerService.tempo = 0;
    this._aG.resetar();
  }

  private loop() {
    let interval = setInterval(() => {
      if (this.programaAcabou) {
        clearInterval(interval);
        this._controleAcaoService.programaAcabou();
        let melhor = this._resultadoEvent.melhorResultado;;

        this._aG.setarPrimeiraSolucao(melhor.cromossomo);
        this.geracao = melhor.geracoes;
        this._timerService.tempo = melhor.time;
        this.renderizar();
        return;
      }

      if (this.achouMelhorSolucao) {
        this._resultadoEvent.add(this.melhorCromossomoDaGeracao, this.geracao, this._timerService.time, this._timerService.tempo, this.quantidadeDeSolucoes);
        this.quantidadeDeSolucoes++;
        this.resetar();
        this._aG.popular();
        this._resultadoEvent.melhorResultado;
      }

      this.geracao++;
      this._aG.gerarMelhorSolucaoDaGeracao();

      this.atualizarUltimoMelhorCromossomo();
      this.renderizar();
    }, 1);
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
    return this.quantidadeDeSolucoes >= 1;
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

    var maxX = this._entrada.cidades.map(x => x.coordenada.x).reduce((prev, curr) => {
      return Math.max(prev, curr)
    });
    var minX = this._entrada.cidades.map(x => x.coordenada.x).reduce((prev, curr) => {
      return Math.min(prev, curr)
    });

    var maxY = this._entrada.cidades.map(x => x.coordenada.y).reduce((prev, curr) => {
      return Math.max(prev, curr)
    });
    var minY = this._entrada.cidades.map(x => x.coordenada.y).reduce((prev, curr) => {
      return Math.min(prev, curr)
    });

    this._entrada.cidades.forEach(cidade => {
      this.drawable.drawNode(maxX, minX, maxY, minY, cidade);
    });
  }

  drawCaminhos() {
    if (!this.melhorCromossomoDaGeracao)
      return;

    var maxX = this._entrada.cidades.map(x => x.coordenada.x).reduce((prev, curr) => {
      return Math.max(prev, curr)
    });
    var minX = this._entrada.cidades.map(x => x.coordenada.x).reduce((prev, curr) => {
      return Math.min(prev, curr)
    });

    var maxY = this._entrada.cidades.map(x => x.coordenada.y).reduce((prev, curr) => {
      return Math.max(prev, curr)
    });
    var minY = this._entrada.cidades.map(x => x.coordenada.y).reduce((prev, curr) => {
      return Math.min(prev, curr)
    });

    for (var i = 0; i < this.melhorCromossomoDaGeracao.edges.length; i++) {
      let caminho = this.melhorCromossomoDaGeracao.edges[i];
      this.drawable.drawEdge(maxX, minX, maxY, minY, caminho);
    }
  }
}
