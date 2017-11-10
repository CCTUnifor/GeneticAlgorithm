import { Observable } from 'rxjs/Observable';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ResultadoEventService {
  private resultadoEventSource = new ReplaySubject<DadosMelhorCromossomo>();
  public handleAdd: Observable<any> = this.resultadoEventSource.asObservable();
  
  public add(cromossomo: Cromossomo, geracoes: number, tempo: number){
    let dados: DadosMelhorCromossomo = {
      cromossomo,
      geracoes,
      tempo
    };
    this.resultadoEventSource.next(dados);
  }
}

export class DadosMelhorCromossomo {
  public cromossomo: Cromossomo;
  public geracoes: number;
  public tempo: number;
}
