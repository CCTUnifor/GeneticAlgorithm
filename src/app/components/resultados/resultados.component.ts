import { ControleDeAcaoService } from './../../services/controle-de-acao.service';
import { ResultadoEventService, DadosMelhorCromossomo } from './../../services/resultado-event.service';
import { Cromossomo } from './../../entities/cromossomo';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  private resultados: DadosMelhorCromossomo[] = [];
  private programaAcabou: boolean;

  private get mediaAritimetica() {
    let arr = this.resultados.map(x => x.cromossomo.fitness);
    return arr.reduce((a, b) => a + b) / this.resultados.length;
  }

  constructor(private _resultadoEvent: ResultadoEventService, private _acaoEvent: ControleDeAcaoService) {
    this._resultadoEvent.handleAdd.subscribe((x) => {
      this.resultados.push(x);
    });
    this._acaoEvent.handleProgramaAcabou.subscribe((isTerminou) => this.programaAcabou = isTerminou);
  }

  ngOnInit() {
  }

}
