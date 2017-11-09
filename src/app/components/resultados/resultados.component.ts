import { ResultadoEventService } from './../../services/resultado-event.service';
import { Cromossomo } from './../../entities/cromossomo';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  private resultados: Cromossomo[] = [];
  
  constructor(private _resultadoEvent: ResultadoEventService) {
    this._resultadoEvent.handleAdd.subscribe((x) => {
      this.resultados.push(x);
    });
  }

  ngOnInit() {
  }

}
