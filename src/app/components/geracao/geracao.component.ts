import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Edge } from '../../entities/edge';
import { Node } from '../../entities/node';
import { IDrawable } from '../../interfaces/drawable';

@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("myCanvas") myCanvas;
  private context: CanvasRenderingContext2D;
  private drawable: IDrawable;

  @Input()
  private nodes: Node[];
  @Input()
  private edges: Edge[];
  @Input()
  private start: boolean;

  constructor() {
  }

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.drawable = new IDrawable(this.context);

    // this.draw();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.start)
      this.draw();
      
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });

    this.drawCities();
    this.drawCaminhos();
  }

  drawCities() {
    this.nodes.forEach(cidade => {
      this.drawable.drawNode(cidade);
    });
  }

  drawCaminhos() {
    this.edges.forEach(caminho => {
      this.drawable.drawEdge(caminho);
    })
  }
}
