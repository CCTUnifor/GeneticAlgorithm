import { GlobalVariables } from './../../entities/global-variables';
import { Cromossomo } from './../../entities/cromossomo';
import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Edge } from '../../entities/edge';
import { Node } from '../../entities/node';
import { IDrawable } from '../../interfaces/drawable';

@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent {
  @ViewChild("myCanvas") myCanvas;
  private context: CanvasRenderingContext2D;
  private drawable: IDrawable;

  @Input()
  private cromossomo: Cromossomo;
  @Input()
  private titulo: string;

  private get fitnessLabel() {
    return this.cromossomo ? `Fitness: ${this.cromossomo.fitness.toFixed(4)}` : '';
  }
  private get width() {
    return GlobalVariables.canvasWidth;
  }
  private get height() {
    return GlobalVariables.canvasHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes["cromossomo"] && this.cromossomo) {
      let canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
      canvas.width = this.width;
      canvas.height = this.height;

      this.context = canvas.getContext("2d");
      this.drawable = new IDrawable(this.context);

      this.draw();
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.drawCities();
    this.drawCaminhos();
  }

  drawCities() {
    this.cromossomo.cidades.forEach(cidade => {
      this.drawable.drawNode(cidade);
    });
  }

  drawCaminhos() {
    for (var i = 0; i < this.cromossomo.edges.length; i++) {
      let caminho = this.cromossomo.edges[i];
      this.drawable.drawEdge(caminho);
    }
  }
}
