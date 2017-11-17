import { TimerService } from './../../services/timer.service';
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
  private programaAcabou: boolean;

  private get resultados () {
    return this._resultadoEvent.resultados;
  }

  private get mediaAritimetica() {
    let arr = this.resultados.map(x => x.cromossomo.fitness);
    return arr.reduce((a, b) => a + b) / this.resultados.length;
  }

  public get tempoTotal() {
    return this._timerService.converter(this.resultados.map(x => x.time).reduce((a, b) => a + b));
  }

  constructor(private _resultadoEvent: ResultadoEventService, private _acaoEvent: ControleDeAcaoService, private _timerService: TimerService) {
    this._acaoEvent.handleProgramaAcabou.subscribe((isTerminou) => this.programaAcabou = isTerminou);
  }

  ngOnInit() {
  }
}
