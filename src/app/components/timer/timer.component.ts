import { TimerService } from './../../services/timer.service';
import { ControleDeAcaoService } from './../../services/controle-de-acao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private acabou: boolean;

  constructor(private _acaoEvent: ControleDeAcaoService, private _timerService : TimerService) {
    this._acaoEvent.handleProgramaAcabou.subscribe(acabou => this.acabou = acabou);
    this._acaoEvent.handleStartarAplicacao.subscribe(() => this.acabou = false);
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.acabou)
        this._timerService.tempo++;
    }, 1000);
  }

}
