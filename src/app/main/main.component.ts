import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';
import { Node } from "../entities/node";
import { Edge } from '../entities/edge';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  private arquivo: File;
  private context: CanvasRenderingContext2D;
  private cidades: Node[];
  private caminhos: Edge[];
  @ViewChild("myCanvas") myCanvas;

  constructor(private _arquivoEntrada: ArquivoEntradaService) { }

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
  }

  async onInputChange(event) {
    let target = event.explicitOriginalTarget || event.srcElement;
    this.arquivo = target.files[0];
    await this._arquivoEntrada.carregarArquivo(this.arquivo);
    await this.carregarCidades();
    await this.carregarCaminhos();

    this.draw();
  }
  private carregarCidades() {
    let i = 0;
    this.cidades = this._arquivoEntrada.coordenadas.map((c) => new Node(this.context, c, i++));
  }
  private carregarCaminhos() {
    var _caminhos: Array<Edge> = new Array<Edge>();
    for (var i = 1; i < this.cidades.length; i++) {
      var element = this.cidades[i];
      _caminhos.push(new Edge(this.context, this.cidades[i - 1], this.cidades[i]));
    }
    this.caminhos = _caminhos;
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });

    this.drawCities();
    this.drawCaminhos();
  }

  drawCities() {
    this.cidades[0].color = "blue";
    this.cidades[this.cidades.length - 1].color = "blue";

    this.cidades.forEach(cidade => {
      cidade.draw();
    });
  }

  drawCaminhos() {
    this.caminhos.forEach(caminho => {
      caminho.draw();
    })
  }
}
