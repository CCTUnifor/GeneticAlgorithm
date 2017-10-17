import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';
import { Node } from "../entities/node";
import { Edge } from '../entities/edge';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private arquivo: File;
  private cidades: Node[];
  private caminhos: Edge[];
  private start: boolean;

  constructor(private _arquivoEntrada: ArquivoEntradaService) { }

  async onInputChange(event) {
    let target = event.explicitOriginalTarget || event.srcElement;
    this.arquivo = target.files[0];
    
    await this._arquivoEntrada.carregarArquivo(this.arquivo);
    await this.carregarCidades();
    await this.carregarCaminhos();

    this.start = true;
  }
  private carregarCidades() {
    let i = 0;
    this.cidades = this._arquivoEntrada.coordenadas.map((c) => new Node(c, i++));
    this.cidades[0].color = "blue";
    this.cidades[this.cidades.length - 1].color = "blue";
  }
  private carregarCaminhos() {
    var _caminhos: Array<Edge> = new Array<Edge>();
    for (var i = 1; i < this.cidades.length; i++) {
      var element = this.cidades[i];
      _caminhos.push(new Edge(this.cidades[i - 1], this.cidades[i]));
    }
    this.caminhos = _caminhos;
  }
}
