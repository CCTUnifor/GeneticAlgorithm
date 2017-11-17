import { element } from 'protractor';
import { SorteadorService } from './../services/sorteador.service';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ArquivoEntradaService } from '../services/arquivo-entrada.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
}